interface BMIValues {
  value1: number;
  value2: number;
}

const parseBMIArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters: number = height / 100;
  const BMI: number = weight / heightInMeters ** 2;
  const RoundedBMI: number = Math.round((BMI + Number.EPSILON) * 100) / 100;
  if (RoundedBMI < 16) {
    return 'Underweight (Severe thinness)';
  } else if (RoundedBMI > 16 && RoundedBMI < 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (RoundedBMI > 17 && RoundedBMI < 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (RoundedBMI > 18.5 && RoundedBMI < 24.9) {
    return 'Normal (healthy weight)';
  } else if (RoundedBMI > 25 && RoundedBMI < 29.9) {
    return 'Overweight';
  } else if (RoundedBMI > 30 && RoundedBMI < 34.9) {
    return 'Obese (Class I)';
  } else if (RoundedBMI > 35 && RoundedBMI < 39.9) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const { value1, value2 } = parseBMIArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
