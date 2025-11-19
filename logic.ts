interface Config {
    calculator: {
        title: string;
        display: {
            placeholder: string;
            maxLength: number;
        };
        buttons: {
            memory: {
                clear: string;
                read: string;
                add: string;
                subtract: string;
                save: string;
            };
            scientific: {
                square: string;
                tenPower: string;
                sine: string;
                cosine: string;
                tangent: string;
                cube: string;
                inverse: string;
                sqrt: string;
                log: string;
                naturalLog: string;
                percentage: string;
                pi: string;
                factorial: string;
                toggleSign: string;
                openParen: string;
                closeParen: string;
                dot: string;
                equals: string;
            };
            numbers: string[];
            operators: string[];
        };
        themes: {
            default: {
                background: string;
                table: string;
                display: string;
                text: string;
                buttons: {
                    grey: string;
                    black: string;
                    blue: string;
                    green: string;
                    red: string;
                };
            };
        };
    };
}

class CalculadoraBasica {
    basicOperationShape: RegExp;
    memoryRegister: number;

    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
        this.memoryRegister = 0;
    }

    printMemoryContents(): void {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister.toString());
    }

    subtractFromMemory(): void {
        this.memoryRegister -= this.solveOperation();
    }

    addToMemory(): void {
        this.memoryRegister += this.solveOperation();
    }

    writeToDisplay(data: string): void {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        let legacy = displayBox.value;
        if (data == ".") {
            legacy += data;
        } else {
            legacy = legacy == "0" ? data : legacy += data;
        }
        displayBox.value = legacy;
    }

    writeOperatorToDisplay(operator: string): void {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        if (this.basicOperationShape.test(displayBox.value)) {
            this.solveOperation();
        }
        this.writeToDisplay(operator);
    }

    clearDisplay(): void {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = "0";
    }

    solveOperation(): number {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        let operation = displayBox.value;
        let result = 0;
        try {
            result = eval(operation == "" ? "0" : operation);
        } catch (err) {
            alert("Erro de sintaxe");
            this.clearDisplay();
        }
        displayBox.value = result.toString();
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

    /**
     * Escreve nova entrada do usuário dos botões da calculadora na
     * tela.
     *
     * @param {String} data Os dados a serem exibidos na tela.
     * Dado por um clique de botão do usuário.
     */
    override writeToDisplay(data: string): void {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        if (displayBox.value == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += data;
        this.inputList.push(data);
    }

    /**
     * Escreve o operador clicado pelo usuário na tela.
     *
     * @param {String} operator Uma string representando o operador
     * que foi clicado pelo usuário.
     */
    override writeOperatorToDisplay(operator: string): void {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        if (displayBox.value == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        this.operationString += operator;
        super.writeToDisplay(operator);
        this.inputList.push(operator);
    }

    /**
     * Resolve a operação atualmente exibida pela calculadora.
     * Se a sintaxe não estiver correta para uma expressão aritmética
     * bem formada, o usuário terá um erro solicitado e a tela
     * será definida como zero. Devido à complexidade da verificação
     * de expressão regular. Esta tarefa de corresponder ao conjunto
     * inteiro de operações possíveis precisaria de uma gramática
     * livre de contexto ou alguma outra técnica.
     *
     * ~Tirado do StackOverflow~
     * Você não pode encontrar parênteses correspondentes com expressões
     * regulares. Esta é uma consequência do lema de bombeamento para
     * linguagens regulares.
     * ~Tirado do StackOverflow~
     */
    override solveOperation(): number {
        let result: number | string = 0;
        try {
            result = eval(this.operationString == "" || this.operationString == "Erro de Sintaxe" ? "0" : this.operationString);
        } catch (err) {
            result = "Erro de Sintaxe";
        }
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = result.toString();
        this.operationString = "";
        this.operationString += result;
        this.justSolved = true;
        return typeof result === 'number' ? result : 0;
    }

    /**
     * Limpa a tela de exibição.
     */
    override clearDisplay(): void {
        super.clearDisplay();
        this.operationString = "";
    }

    toggleSign(): void {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        var displayContents = displayBox.value;
        if (displayContents == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        if (displayContents == "0") {
            displayBox.value = "-";
            this.operationString += "-";
        } else {
            displayBox.value = "-" + displayBox.value;
            this.operationString = "-" + this.operationString;
        }
    }

    clearMemory(): void {
        this.memoryRegister = 0;
    }

    readMemory(): void {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister.toString());
    }

    saveToMemory(): void {
        this.memoryRegister = this.solveOperation();
    }

    eraseLastInput(): void {
        this.inputList.pop();
        var recreatedOperation = "";
        for (var each in this.inputList) {
            recreatedOperation += this.inputList[each];
        }
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = recreatedOperation;
        for (var each in this.operationMap) {
            recreatedOperation = recreatedOperation.replace(each, this.operationMap[each]);
        }
        this.operationString = recreatedOperation;
    }

    writeMathFunction(data: string): void {
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        if (displayBox.value == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += this.operationMap[data];
        this.inputList.push(data);
    }

    calculateFactorial(): void {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        var result = 0;
        try {
            result = this.calculateRecursiveFactorial(number);
        } catch(err) {
            const displayBox = document.getElementById("displayBox") as HTMLInputElement;
            displayBox.value = "Esse número é muito grande";
        }
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = result.toString();
    }

    calculateRecursiveFactorial(num: number): number {
        if (num == 1 || num == 0) {
            return 1;
        }
        return num * this.calculateRecursiveFactorial(num - 1);
    }

    nthTenPower(): void {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = Math.pow(10, number).toString();
    }

    square(): void {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = Math.pow(number, 2).toString();
    }

    cube(): void {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = Math.pow(number, 3).toString();
    }

    inverseNumber(): void {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox") as HTMLInputElement;
        displayBox.value = Math.pow(number, -1).toString();
    }
}

const calculadora = new CalculadoraCientifica();

// Load config if available
fetch('config.json')
    .then(response => response.json())
    .then((config: Config) => {
        console.log('Config loaded:', config);
        // Could use config to customize calculator behavior
    })
    .catch(error => console.log('Config not loaded:', error));
