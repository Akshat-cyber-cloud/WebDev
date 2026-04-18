import mongoose, { Schema, Document } from 'mongoose';

export interface IBattle extends Document {
    userId: mongoose.Types.ObjectId;
    query: string;
    solution_1: {
        name: string;
        content: string;
        score: number;
        reasoning: string;
        metrics: {
            latency_ms: number;
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
        };
    };
    solution_2: {
        name: string;
        content: string;
        score: number;
        reasoning: string;
        metrics: {
            latency_ms: number;
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
        };
    };
    judgeWinner: 'solution_1' | 'solution_2';
    userWinner?: 'solution_1' | 'solution_2';
    isFinalized: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BattleSchema = new Schema<IBattle>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        query: {
            type: String,
            required: true,
        },
        solution_1: {
            name: { type: String, default: 'MISTRAL' },
            content: { type: String, required: true },
            score: { type: Number, default: 0 },
            reasoning: { type: String, default: '' },
            metrics: {
                latency_ms: { type: Number, default: 0 },
                prompt_tokens: { type: Number, default: 0 },
                completion_tokens: { type: Number, default: 0 },
                total_tokens: { type: Number, default: 0 },
            },
        },
        solution_2: {
            name: { type: String, default: 'GEMINI' },
            content: { type: String, required: true },
            score: { type: Number, default: 0 },
            reasoning: { type: String, default: '' },
            metrics: {
                latency_ms: { type: Number, default: 0 },
                prompt_tokens: { type: Number, default: 0 },
                completion_tokens: { type: Number, default: 0 },
                total_tokens: { type: Number, default: 0 },
            },
        },
        judgeWinner: {
            type: String,
            enum: ['solution_1', 'solution_2'],
            required: true,
        },
        userWinner: {
            type: String,
            enum: ['solution_1', 'solution_2'],
        },
        isFinalized: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBattle>('Battle', BattleSchema);
