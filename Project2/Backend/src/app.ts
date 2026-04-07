import express from 'express'
import runGraph from './services/graph.service.js';

const app = express();

app.get('/health', (req,res) => {
    res.status(200).json({status: 'ok'})
})

app.post('/use-graph', async (req, res) => {
    try {
        const result = await runGraph("What is the capital of India?");
        res.json({
            solution_1: result.solution_1,
            solution_2: result.solution_2,
            judge: result.judge,
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default app