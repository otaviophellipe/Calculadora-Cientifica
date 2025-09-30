class CalculadoraBasica {
    basicOperationShape: RegExp;
    memoryRegister: number;

    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
        this.memoryRegister = 0;
    }

    printMemoryContents(display: string, setDisplay: (value: string) => void): void {
        setDisplay(this.memoryRegister.toString());
    }

    subtractFromMemory(result: number): void {
        this.memoryRegister -= result;
    }

    addToMemory(result: number): void {
        this.memoryRegister += result;
    }

    writeToDisplay(data: string, display: string, setDisplay: (value: string) => void): void {
        let legacy = display;
        if (data === ".") {
            legacy += data;
        } else {
            legacy = legacy === "0" ? data : legacy += data;
        }
        setDisplay(legacy);
    }

    writeOperatorToDisplay(operator: string, display: string, setDisplay: (value: string) => void, solveOperation: () => number): void {
        let legacy = display;
        if (this.basicOperationShape.test(legacy)) {
            solveOperation();
        }
        this.writeToDisplay(operator, display, setDisplay);
    }

    clearDisplay(setDisplay: (value: string) => void): void {
        setDisplay("0");
    }

    solveOperation(display: string, setDisplay: (value: string) => void): number {
        let operation = display;
        let result = 0;
        try {
            result = eval(operation === "" ? "0" : operation);
        } catch (err) {
            alert("Erro de sintaxe");
            setDisplay("0");
        }
        setDisplay(result.toString());
        return result;
    }
}

class CalculadoraCientifica extends CalculadoraBasica {
    inputList: string[];
    operationString: string;
    justSolved: boolean;
    operationMap: { [key: string]: string };

    constructor() {
        super();
        this.inputList = [];
        this.operationString = "";
        this.justSolved = false;
        this.operationMap = {
            "sin(": "Math.sin(",
            "cos(": "Math.cos(",
            "tan(": "Math.tan(",
            "log(": "Math.log10(",
            "ln(": "Math.log(",
            "sqrt(": "Math.sqrt(",
            "PI": "Math.PI",
            "e": "Math.E"
        };
    }

    writeToDisplay(data: string, display: string, setDisplay: (value: string) => void): void {
        if (display === "Erro de Sintaxe") {
            super.clearDisplay(setDisplay);
        }
        super.writeToDisplay(data, display, setDisplay);
        this.operationString += data;
        this.inputList.push(data);
    }

    writeOperatorToDisplay(operator: string, display: string, setDisplay: (value: string) => void): void {
        if (display === "Erro de Sintaxe") {
            super.clearDisplay(setDisplay);
        }
        this.operationString += operator;
        super.writeToDisplay(operator, display, setDisplay);
        this.inputList.push(operator);
    }

    solveOperation(display: string, setDisplay: (value: string) => void): number {
        let result: number | string = 0;
        try {
            result = eval(this.operationString === "" || this.operationString === "Erro de Sintaxe" ? "0" : this.operationString);
        } catch (err) {
            result = "Erro de Sintaxe";
        }
        setDisplay(result.toString());
        this.operationString = "";
        this.operationString += result;
        this.justSolved = true;
        return typeof result === 'number' ? result : 0;
    }

    clearDisplay(setDisplay: (value: string) => void): void {
        super.clearDisplay(setDisplay);
        this.operationString = "";
    }

    toggleSign(display: string, setDisplay: (value: string) => void): void {
        if (display === "Erro de Sintaxe") {
            super.clearDisplay(setDisplay);
        }
        if (display === "0") {
            setDisplay("-");
            this.operationString += "-";
        } else {
            setDisplay("-" + display);
            this.operationString = "-" + this.operationString;
        }
    }

    clearMemory(): void {
        this.subtractFromMemory(this.memoryRegister);
    }

    readMemory(setDisplay: (value: string) => void): void {
        this.clearDisplay(setDisplay);
        this.writeToDisplay(this.memoryRegister.toString(), "0", setDisplay);
    }

    saveToMemory(): number {
        return this.memoryRegister = this.solveOperation("", () => {});
    }

    eraseLastInput(display: string, setDisplay: (value: string) => void): void {
        this.inputList.pop();
        let recreatedOperation = "";
        for (let each of this.inputList) {
            recreatedOperation += each;
        }
        setDisplay(recreatedOperation);
        for (let key in this.operationMap) {
            recreatedOperation = recreatedOperation.replace(key, this.operationMap[key]);
        }
        this.operationString = recreatedOperation;
    }

    writeMathFunction(data: string, display: string, setDisplay: (value: string) => void): void {
        if (display === "Erro de Sintaxe") {
            super.clearDisplay(setDisplay);
        }
        super.writeToDisplay(data, display, setDisplay);
        this.operationString += this.operationMap[data];
        this.inputList.push(data);
    }

    calculateFactorial(display: string, setDisplay: (value: string) => void): void {
        const number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        let result = 0;
        try {
            result = this.calculateRecursiveFactorial(number);
        } catch(err) {
            setDisplay("Número muito grande");
            return;
        }
        this.clearDisplay(setDisplay);
        setDisplay(result.toString());
    }

    calculateRecursiveFactorial(number: number): number {
        if (number === 1 || number === 0) {
            return 1;
        }
        return number * this.calculateRecursiveFactorial(number - 1);
    }

    nthTenPower(display: string, setDisplay: (value: string) => void): void {
        const number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay(setDisplay);
        setDisplay(Math.pow(10, number).toString());
    }

    square(display: string, setDisplay: (value: string) => void): void {
        const number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay(setDisplay);
        setDisplay(Math.pow(number, 2).toString());
    }

    cube(display: string, setDisplay: (value: string) => void): void {
        const number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay(setDisplay);
        setDisplay(Math.pow(number, 3).toString());
    }

    inverseNumber(display: string, setDisplay: (value: string) => void): void {
        const number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay(setDisplay);
        setDisplay(Math.pow(number, -1).toString());
    }
}

export default CalculadoraCientifica;
