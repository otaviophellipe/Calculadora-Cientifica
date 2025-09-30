class CalculadoraBasica {

    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
        this.memoryRegister = 0;
    }

    printMemoryContents() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    subtractFromMemory() {
        this.memoryRegister -= this.solveOperation();
    }

    addToMemory() {
        this.memoryRegister += this.solveOperation();
    }

    writeToDisplay(data) {
        let legacy = document.getElementById("displayBox").value;
        if (data == ".") {
            legacy += data;
        } else {
            legacy = legacy == "0" ? data : legacy += data;
        }
        document.getElementById("displayBox").value = legacy;
    }

    writeOperatorToDisplay(operator) {
        let legacy = document.getElementById("displayBox").value;
        if (this.basicOperationShape.test(legacy)) {
            this.solveOperation();
        }
        this.writeToDisplay(operator);
    }

    clearDisplay() {
        document.getElementById("displayBox").value = "0";
    }

    solveOperation() {
        let operation = document.getElementById("displayBox").value;
        let result = 0;
        try {
            result = eval(operation == "" ? 0 : operation);
        } catch (err) {
            alert("Erro de sintaxe");
            this.clearDisplay();
        }
        document.getElementById("displayBox").value = result;
        return result;
    }

}

class CalculadoraCientifica extends CalculadoraBasica {

    constructor() {
        super();
        this.inputList = new Array();
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
    writeToDisplay(data) {
        if (document.getElementById("displayBox").value == "Erro de Sintaxe") {
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
    writeOperatorToDisplay(operator) {
        if (document.getElementById("displayBox").value == "Erro de Sintaxe") {
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
    solveOperation() {
        let result = 0;
        try {
            result = eval(this.operationString == "" || this.operationString == "Erro de Sintaxe" ? 0 : this.operationString);
        } catch (err) {
            result = "Erro de Sintaxe";
        }
        document.getElementById("displayBox").value = result;
        this.operationString = "";
        this.operationString += result;
        this.justSolved = true;
        return result;
    }

    /**
     * Limpa a tela de exibição.
     */
    clearDisplay() {
        super.clearDisplay();
        this.operationString = "";
    }

    toggleSign() {
        var displayBox = document.getElementById("displayBox");
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

    clearMemory() {
        super.subtractFromMemory(this.memoryRegister);
    }

    readMemory() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    saveToMemory() {
        this.memoryRegister = this.solveOperation();
    }

    eraseLastInput() {
        this.inputList.pop();
        var recreatedOperation = "";
        for (var each in this.inputList) {
            recreatedOperation += this.inputList[each];
        }
        document.getElementById("displayBox").value = recreatedOperation;
        for (var each in this.operationMap) {
            recreatedOperation = recreatedOperation.replace(each, this.operationMap[each]);
        }
        this.operationString = recreatedOperation;
    }

    writeMathFunction(data) {
        if (document.getElementById("displayBox").value == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += this.operationMap[data];
        this.inputList.push(data);
    }

    calculateFactorial() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        var result = 0;
        try {
            result = this.calculateRecursiveFactorial(number);
        } catch(err) {
            document.getElementById("displayBox").value = "Esse número é muito grande";
        }
        this.clearDisplay();
        document.getElementById("displayBox").value = result;
    }

    calculateRecursiveFactorial(number) {
        if (number == 1 || number == 0) {
            return 1;
        }
        return number * this.calculateRecursiveFactorial(number - 1);
    }

    nthTenPower() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(10, parseInt(number));
    }

    square() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), 2);
    }

    cube() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), 3);
    }

    inverseNumber() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
        this.clearDisplay();
        document.getElementById("displayBox").value = Math.pow(parseInt(number), -1);
    }

}

const calculadora = new CalculadoraCientifica();
