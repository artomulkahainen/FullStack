import { exerciseResult } from "./exerciseResult";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/*const parseExerciseArguments = (args: Array<string>): Array<any> => {
    if (args.length < 3) throw new Error('Not enough arguments');
    
    const exerciseList = args.map((el, index) => {
        if (!isNaN(Number(el))) { 
            return Number(el);
        } else if (index < 2) {
            return;
        } else { 
            throw new Error('All arguments are not valid!');
        }
    });
    
    if (exerciseList.length > 2) {
        return exerciseList.slice(2, exerciseList.length);
    } else {
        throw new Error('Not enough arguments!');
    }
    
};*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseWebExerciseArguments = (list: Array<string>): Array<any> => {
    if (list.length < 1) throw new Error('Not enough arguments');
    
    const exerciseList = list.map((el) => !isNaN(Number(el)) ? Number(el) : () => { throw new Error('Arguments are invalid!'); });
    
    return exerciseList;
};


export const exerciseCalculator = (resultsArr:Array<number>): exerciseResult => {
    const hoursUsed = Number((resultsArr.reduce((acc, el) => acc + el) / resultsArr.length).toFixed(2));
    const ratingCalc = (): number => {
        if (hoursUsed > 7) {
            return 3;
        } else if (hoursUsed > 4) {
            return 2;
        } else {
            return 1;
        }
    };

    const ratingDescriptions = [
        'You passed the course, but you could have done better.', 
        'You did good on this course!',
        'You were excellent!'
    ];

    return {
        periodLength: resultsArr.length,
        trainingDays: resultsArr.filter(el => el > 0).length,
        success: ratingCalc() >= 2,
        rating: ratingCalc(),
        ratingDescription: ratingDescriptions[ratingCalc() - 1],
        target: 2,
        average: hoursUsed,
    };
};

/*try {
    const lista = parseExerciseArguments(process.argv);
    console.log(lista);
    console.log(exerciseCalculator(lista));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}*/