interface MultiplyValues {
    value1: number;
    value2: number;
}
  
const parseArguments = (args: Array<string>): MultiplyValues => {
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
}

const multiplicator = (x:number, y:number, printText:string): string => {
    return `${printText} ${x * y}`;
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}