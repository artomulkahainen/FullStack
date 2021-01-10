/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { parseWebBmiArguments, bmiCalculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Fullstack!');
});

app.get('/bmi', (req, res) => {
    const query = req.query;
    try {
        const { value1, value2 } = parseWebBmiArguments([String(query.weight), String(query.height)]);
        res.send({height: String(query.height), weight: String(query.weight), bmi: bmiCalculator(value1, value2)});
    } catch (e) {
        res.send({error: e});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});