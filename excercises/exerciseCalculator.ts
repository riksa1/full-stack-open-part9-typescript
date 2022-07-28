export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  value1: Array<number>;
  value2: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const days: Array<number> = [];

  let target = 0;

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error('Provided values were not numbers!');
  }

  for (let i = 0; i < args.length - 3; i++) {
    if (!isNaN(Number(args[i + 3]))) {
      const newday = Number(args[i + 3]);
      days.push(newday);
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return {
    value1: days,
    value2: target,
  };
};

export const calculateExercises = (
  days: Array<number>,
  targetDaily: number
): Result => {
  const trainingDays: Array<number> = [];
  const targetReachedDays: Array<number> = [];
  let hours = 0;
  for (let i = 0; i < days.length; i++) {
    if (days[i] > 0) {
      trainingDays.push(days[i]);
    }
    hours += days[i];
  }
  for (let j = 0; j < days.length; j++) {
    if (days[j] >= targetDaily) {
      targetReachedDays.push(days[j]);
    }
  }
  let rating: number = Math.round(
    (targetReachedDays.length / days.length) * 100
  );
  let ratingDescription = '';
  if (rating < 33) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (rating > 33 && rating < 66) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good job keep it up!';
  }
  return {
    periodLength: days.length,
    trainingDays: trainingDays.length,
    success: days.length === targetReachedDays.length ? true : false,
    rating: rating === 1 ? 1 : rating === 2 ? 2 : 3,
    ratingDescription: ratingDescription,
    target: targetDaily,
    average: hours / days.length,
  };
};

try {
  const { value1, value2 } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
