import { BmiResults } from './bmiResults';

/*const parseBmiArguments = (args: Array<string>): BmiResults => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}*/

export const parseWebBmiArguments = (list: Array<string>): BmiResults => {
    //if (args.length < 4) throw new Error('Not enough arguments');
    if (list.length > 2) throw new Error('Too many arguments');
  
    if (!isNaN(Number(list[0])) && !isNaN(Number(list[1]))) {
      return {
        value1: Number(list[0]),
        value2: Number(list[1])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const bmiCalculator = (kg:number, m:number): string => {
    const amount = kg / ((m / 100) * (m / 100));

    switch(true) {
        case amount >= 40:
            return 'Obese Class III (Very severely obese)';
        case amount >= 35:
            return 'Obese Class II (Severely obese)';
        case amount >= 30:
            return 'Obese Class I (Moderately obese)';
        case amount >= 25:
            return 'Overweight';
        case amount >= 18.5:
            return 'Normal (healthy weight)';
        case amount >= 16:
            return 'Underweight';
        case amount >= 15:
            return 'Severely underweight';
        case amount < 15:
            return 'Very severely underweight';
        default:
            throw new Error('Given params were not correct');
    }
};

/*try {
    const { value1, value2 } = parseBmiArguments(process.argv);
    console.log(bmiCalculator(value1, value2));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}*/