import express from 'express';
import url from 'url';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';
const app = express();

app.use(express.json());

const onlyNumbers = (array: Array<number>) => {
  return array.every((element) => {
    return typeof element === 'number';
  });
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  if (
    !queryObject.height ||
    !queryObject.weight ||
    isNaN(Number(queryObject.height)) ||
    isNaN(Number(queryObject.weight))
  ) {
    return res.json({ error: 'malformatted parameters' });
  }

  const bmi: string = calculateBmi(
    Number(queryObject.height),
    Number(queryObject.weight)
  );

  return res.json({
    height: Number(queryObject.height),
    weight: Number(queryObject.weight),
    bmi: bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({ error: 'parameters missing' });
  }

  if (typeof target !== 'number') {
    return res.json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!onlyNumbers(daily_exercises)) {
    console.log('jee');
    return res.json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const answer: Result = calculateExercises(daily_exercises, target);

  return res.json(answer);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
