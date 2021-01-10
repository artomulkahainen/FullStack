/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { parseWebBmiArguments, bmiCalculator } from './bmiCalculator';
import bodyParser from 'body-parser';
import { parseWebExerciseArguments, exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

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

app.post('/exercise', (req, res) => {
    const body = req.body;
    console.log(req.body);
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const lista = parseWebExerciseArguments(body.daily_exercises.map((el: string) => el));
        const exCalc = exerciseCalculator(lista);
        exCalc.target = body.target;
        res.send(exCalc);
        //res.json(req.body);
    } catch (e) {
        console.log('Error, something bad happened, message: ', e.message);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});