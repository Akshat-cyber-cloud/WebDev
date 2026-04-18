import type { Request, Response } from 'express';
import Battle from '../models/battle.model.js';
import mongoose from 'mongoose';

export const finalizeBattle = async (req: Request, res: Response) => {
    try {
        const {
            battleId,
            userWinner
        } = req.body;

        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const updatedBattle = await Battle.findByIdAndUpdate(
            battleId,
            {
                userWinner,
                isFinalized: true,
            },
            { new: true }
        );

        if (!updatedBattle) {
            return res.status(404).json({ error: 'Battle record not found' });
        }

        res.json(updatedBattle);
    } catch (error) {
        console.error('Finalize Battle Error:', error);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getBattleHistory = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const battles = await Battle.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(battles);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const stats = await Battle.aggregate([
            {
                $facet: {
                    mistral: [
                        { $match: { judgeWinner: 'solution_1' } },
                        { $count: 'wins' }
                    ],
                    gemini: [
                        { $match: { judgeWinner: 'solution_2' } },
                        { $count: 'wins' }
                    ],
                    userMistral: [
                        { $match: { userWinner: 'solution_1' } },
                        { $count: 'wins' }
                    ],
                    userGemini: [
                        { $match: { userWinner: 'solution_2' } },
                        { $count: 'wins' }
                    ],
                    total: [
                        { $count: 'count' }
                    ],
                    averages: [
                       {
                           $group: {
                               _id: null,
                               avg_m1_score: { $avg: '$solution_1.score' },
                               avg_m2_score: { $avg: '$solution_2.score' },
                               avg_m1_latency: { $avg: '$solution_1.metrics.latency_ms' },
                               avg_m2_latency: { $avg: '$solution_2.metrics.latency_ms' }
                           }
                       }
                    ]
                }
            }
        ]);

        const totalBattles = stats[0].total[0]?.count || 0;
        
        const leaderboardData = {
            totalBattles,
            mistral: {
                wins: stats[0].mistral[0]?.wins || 0,
                userWins: stats[0].userMistral[0]?.wins || 0,
                avgScore: stats[0].averages[0]?.avg_m1_score || 0,
                avgLatency: stats[0].averages[0]?.avg_m1_latency || 0,
            },
            gemini: {
                wins: stats[0].gemini[0]?.wins || 0,
                userWins: stats[0].userGemini[0]?.wins || 0,
                avgScore: stats[0].averages[0]?.avg_m2_score || 0,
                avgLatency: stats[0].averages[0]?.avg_m2_latency || 0,
            }
        };

        res.json(leaderboardData);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
