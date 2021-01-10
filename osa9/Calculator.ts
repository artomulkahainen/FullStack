type Operation = 'add' | 'multiply' | 'divide';
type CalcResult = number;

const calculator = (a:number, b:number, op : Operation): CalcResult => {
    switch(op) {
        case 'multiply':
            return a * b;
        case 'add':
            return a + b;
        case 'divide':
            if (b === 0) throw new Error("Can't divide by 0!");
            return a / b;
        default:
            throw new Error('Operation is not divide, multiply or add');
    }
}

console.log(process.argv);