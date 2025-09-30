import React, { useState, useRef } from 'react';
import CalculadoraCientifica from './Calculator';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const calculatorRef = useRef(new CalculadoraCientifica());

  const calculator = calculatorRef.current;

  const handleButtonClick = (action: string) => {
    switch (action) {
      case 'MC':
        calculator.clearMemory();
        break;
      case 'MR':
        calculator.readMemory(setDisplay);
        break;
      case 'M+':
        calculator.addToMemory(calculator.solveOperation(display, setDisplay));
        break;
      case 'M-':
        calculator.subtractFromMemory(calculator.solveOperation(display, setDisplay));
        break;
      case 'MS':
        calculator.saveToMemory();
        break;
      case 'x^2':
        calculator.square(display, setDisplay);
        break;
      case '10^x':
        calculator.nthTenPower(display, setDisplay);
        break;
      case 'sin':
        calculator.writeMathFunction('sin(', display, setDisplay);
        break;
      case 'cos':
        calculator.writeMathFunction('cos(', display, setDisplay);
        break;
      case 'tan':
        calculator.writeMathFunction('tan(', display, setDisplay);
        break;
      case 'x^3':
        calculator.cube(display, setDisplay);
        break;
      case 'x^-1':
        calculator.inverseNumber(display, setDisplay);
        break;
      case 'sqrt':
        calculator.writeMathFunction('sqrt(', display, setDisplay);
        break;
      case 'log':
        calculator.writeMathFunction('log(', display, setDisplay);
        break;
      case 'ln':
        calculator.writeMathFunction('ln(', display, setDisplay);
        break;
      case 'e':
        calculator.writeMathFunction('e', display, setDisplay);
        break;
      case 'CE':
        calculator.clearDisplay(setDisplay);
        break;
      case 'C':
        calculator.clearDisplay(setDisplay);
        break;
      case 'Del':
        calculator.eraseLastInput(display, setDisplay);
        break;
      case '/':
        calculator.writeOperatorToDisplay('/', display, setDisplay);
        break;
      case 'π':
        calculator.writeMathFunction('PI', display, setDisplay);
        break;
      case '7':
      case '8':
      case '9':
      case '4':
      case '5':
      case '6':
      case '1':
      case '2':
      case '3':
      case '0':
      case '.':
        calculator.writeToDisplay(action, display, setDisplay);
        break;
      case '*':
        calculator.writeOperatorToDisplay('*', display, setDisplay);
        break;
      case 'n!':
        calculator.calculateFactorial(display, setDisplay);
        break;
      case '-':
        calculator.writeOperatorToDisplay('-', display, setDisplay);
        break;
      case '(-)':
        calculator.toggleSign(display, setDisplay);
        break;
      case '+':
        calculator.writeOperatorToDisplay('+', display, setDisplay);
        break;
      case '(':
        calculator.writeOperatorToDisplay('(', display, setDisplay);
        break;
      case ')':
        calculator.writeOperatorToDisplay(')', display, setDisplay);
        break;
      case '=':
        calculator.solveOperation(display, setDisplay);
        break;
      default:
        break;
    }
  };

  return (
    <table className="calculator">
      <tbody>
        <tr>
          <th colSpan={5} className="display-row">
            <input className="display" type="text" value={display} readOnly />
          </th>
        </tr>
        <tr className="button-row">
          <td><button className="button grey" onClick={() => handleButtonClick('MC')}>MC</button></td>
          <td><button className="button grey" onClick={() => handleButtonClick('MR')}>MR</button></td>
          <td><button className="button grey" onClick={() => handleButtonClick('M+')}>M+</button></td>
          <td><button className="button grey" onClick={() => handleButtonClick('M-')}>M-</button></td>
          <td><button className="button grey" onClick={() => handleButtonClick('MS')}>MS</button></td>
        </tr>
        <tr className="button-row">
          <td><button className="button black" onClick={() => handleButtonClick('x^2')}>x^2</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('10^x')}>10^x</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('sin')}>sin</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('cos')}>cos</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('tan')}>tan</button></td>
        </tr>
        <tr className="button-row">
          <td><button className="button black" onClick={() => handleButtonClick('x^3')}>x^3</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('x^-1')}>x^-1</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('sqrt')}>sqrt</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('log')}>log</button></td>
          <td><button className="button black" onClick={() => handleButtonClick('ln')}>ln</button></td>
        </tr>
        <tr className="button-row">
          <td><button className="button green" onClick={() => handleButtonClick('e')}>e</button></td>
          <td><button className="button red" onClick={() => handleButtonClick('CE')}>CE</button></td>
          <td><button className="button red" onClick={() => handleButtonClick('C')}>C</button></td>
          <td><button className="button red" onClick={() => handleButtonClick('Del')}>Del</button></td>
          <td><button className="button green" onClick={() => handleButtonClick('/')}>/</button></td>
        </tr>
        <tr className="button-row">
          <td><button className="button green" onClick={() => handleButtonClick('π')}>π</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('7')}>7</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('8')}>8</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('9')}>9</button></td>
          <td><button className="button green" onClick={() => handleButtonClick('*')}>x</button></td>
        </tr>
        <tr className="button-row">
          <td><button className="button green" onClick={() => handleButtonClick('n!')}>n!</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('4')}>4</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('5')}>5</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('6')}>6</button></td>
          <td><button className="button green" onClick={() => handleButtonClick('-')}>-</button></td>
        </tr>
        <tr className="button-row">
          <td><button className="button green" onClick={() => handleButtonClick('(-)')}>±</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('1')}>1</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('2')}>2</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('3')}>3</button></td>
          <td><button className="button green" onClick={() => handleButtonClick('+')}>+</button></td>
        </tr>
        <tr className="button-row">
          <td><button className="button green" onClick={() => handleButtonClick('(')}>(</button></td>
          <td><button className="button green" onClick={() => handleButtonClick(')')}>)</button></td>
          <td><button className="button blue" onClick={() => handleButtonClick('0')}>0</button></td>
          <td><button className="button green" onClick={() => handleButtonClick('.')}>.</button></td>
          <td><button className="button green" onClick={() => handleButtonClick('=')}>=</button></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Calculator;
