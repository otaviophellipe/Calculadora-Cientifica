class CalculadoraBasica {
    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
        this.memoryRegister = 0;
    }
    printMemoryContents() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister.toString());
    }
    subtractFromMemory() {
        this.memoryRegister -= this.solveOperation();
    }
    addToMemory() {
        this.memoryRegister += this.solveOperation();
    }
    writeToDisplay(data) {
        const displayBox = document.getElementById("displayBox");
        let legacy = displayBox.value;
        if (data == ".") {
            legacy += data;
        }
        else {
            legacy = legacy == "0" ? data : legacy += data;
        }
        displayBox.value = legacy;
    }
    writeOperatorToDisplay(operator) {
        const displayBox = document.getElementById("displayBox");
        if (this.basicOperationShape.test(displayBox.value)) {
            this.solveOperation();
        }
        this.writeToDisplay(operator);
    }
    clearDisplay() {
        const displayBox = document.getElementById("displayBox");
        displayBox.value = "0";
    }
    solveOperation() {
        const displayBox = document.getElementById("displayBox");
        let operation = displayBox.value;
        let result = 0;
        try {
            result = eval(operation == "" ? "0" : operation);
        }
        catch (err) {
            alert("Erro de sintaxe");
            this.clearDisplay();
        }
        displayBox.value = result.toString();
        return result;
    }
}
class CalculadoraCientifica extends CalculadoraBasica {
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

    writeToDisplay(data) {
        const displayBox = document.getElementById("displayBox");
        if (displayBox.value == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += data;
        this.inputList.push(data);
    }

    writeOperatorToDisplay(operator) {
        const displayBox = document.getElementById("displayBox");
        if (displayBox.value == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        this.operationString += operator;
        super.writeToDisplay(operator);
        this.inputList.push(operator);
    }

    solveOperation() {
        let result = 0;
        try {
            result = eval(this.operationString == "" || this.operationString == "Erro de Sintaxe" ? "0" : this.operationString);
        }
        catch (err) {
            result = "Erro de Sintaxe";
        }
        const displayBox = document.getElementById("displayBox");
        displayBox.value = result.toString();
        this.operationString = "";
        this.operationString += result;
        this.justSolved = true;
        return typeof result === 'number' ? result : 0;
    }
    /**
     * Limpa a tela de exibição.
     */
    clearDisplay() {
        super.clearDisplay();
        this.operationString = "";
    }
    toggleSign() {
        const displayBox = document.getElementById("displayBox");
        var displayContents = displayBox.value;
        if (displayContents == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        if (displayContents == "0") {
            displayBox.value = "-";
            this.operationString += "-";
        }
        else {
            displayBox.value = "-" + displayBox.value;
            this.operationString = "-" + this.operationString;
        }
    }
    clearMemory() {
        this.memoryRegister = 0;
    }
    readMemory() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister.toString());
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
        const displayBox = document.getElementById("displayBox");
        displayBox.value = recreatedOperation;
        for (var each in this.operationMap) {
            recreatedOperation = recreatedOperation.replace(each, this.operationMap[each]);
        }
        this.operationString = recreatedOperation;
    }
    writeMathFunction(data) {
        const displayBox = document.getElementById("displayBox");
        if (displayBox.value == "Erro de Sintaxe") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += this.operationMap[data];
        this.inputList.push(data);
    }
    calculateFactorial() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        var result = 0;
        try {
            result = this.calculateRecursiveFactorial(number);
        }
        catch (err) {
            const displayBox = document.getElementById("displayBox");
            displayBox.value = "Esse número é muito grande";
        }
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox");
        displayBox.value = result.toString();
    }
    calculateRecursiveFactorial(num) {
        if (num == 1 || num == 0) {
            return 1;
        }
        return num * this.calculateRecursiveFactorial(num - 1);
    }
    nthTenPower() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox");
        displayBox.value = Math.pow(10, number).toString();
    }
    square() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox");
        displayBox.value = Math.pow(number, 2).toString();
    }
    cube() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox");
        displayBox.value = Math.pow(number, 3).toString();
    }
    inverseNumber() {
        var number = parseInt(this.operationString.split(new RegExp("[^0-9]"))[0]);
        this.clearDisplay();
        const displayBox = document.getElementById("displayBox");
        displayBox.value = Math.pow(number, -1).toString();
    }
}
const calculadora = new CalculadoraCientifica();
// da load nas config
fetch('config.json')
    .then(response => response.json())
    .then((config) => {
    console.log('Config loaded:', config);
    // custumiza calculos 
})
    .catch(error => console.log('Config not loaded:', error));
