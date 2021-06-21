import React, { useEffect, useState } from 'react';

const numbers = Array.from(Array(10).keys()).map(String);
const operations = ["+", "-", "*", "/", "="];
const helpers = ["C", "AC"];

const CalculatorOperations = {
    '+': (previousValue, nextValue) => previousValue + nextValue,
    '-': (previousValue, nextValue) => previousValue - nextValue,
    '*': (previousValue, nextValue) => previousValue * nextValue,
    '/': (previousValue, nextValue) => previousValue / nextValue,
    '=': (previousValue, nextValue) => nextValue,
};

export default function Calculator() {

    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [value, setValue] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const numberKeys = numbers.map((key) => 
        <CalculatorKey 
            key={key}
            keyValue={key}
            onClick={() => inputDigit(key)}
        />
    );
    
    const operationKeys = operations.map(key => 
        <CalculatorKey 
            key={key} 
            keyValue={key} 
            onClick={() => performOperation(key)} 
        />
    );

    const helperKeys = helpers.map(key => 
        <CalculatorKey 
            key={key} 
            keyValue={key} 
            onClick={() => key === 'C' ? inputClear() : inputAllClear()} 
        />
    );

    return (
        <div>
            <CalculatorDisplay currentInput={displayValue} />
            <div id="entry-pads">
                { numberKeys }
                { operationKeys }
                { helperKeys }
                <CalculatorKey key='+/-' keyValue='+/-' onClick={() => toggleSign()}/>
            </div>
        </div>
    );

    function inputDigit(digit) {
        if (displayValue === 'ERR') {
            setDisplayValue(digit);
            setOperator(null);
            setValue(null);
            setWaitingForOperand(false);
        } else if (waitingForOperand){
            setDisplayValue(digit);
            setWaitingForOperand(false);
        } else {
            const stringResult = (displayValue + digit).slice(0, 8);
            setDisplayValue(displayValue === '0' ? digit : stringResult);
        }
    }

    function performOperation(nextOperator) {
        const inputValue = parseInt(displayValue);

        if (value === null) {
            setValue(inputValue);
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](currentValue, inputValue);
            
            setDisplayValue(String(newValue).length > 8 ? 'ERR' : String(newValue));
            setValue(newValue);
        }
        setWaitingForOperand(true);
        setOperator(nextOperator);
    }

    function toggleSign() {
        const newValue = parseInt(displayValue) * -1;
        setDisplayValue(newValue);
    }

    function inputClear() {
        if (operator) {
            setWaitingForOperand(false);
            setOperator(null);
        } else if (displayValue !== 0) {
            setDisplayValue('0');
        }
    }

    function inputAllClear() {
        setDisplayValue('0');
        setOperator(null);
        setValue(null);
        setWaitingForOperand(false);
    }
}

function CalculatorKey(props) {
    return (
        <button 
            name={ props.keyValue } 
            onClick={() => props.onClick() }
        >
            { props.keyValue }
        </button>
    );
}

function CalculatorDisplay(props) {
    return (
        <h1 data-testid="calculator-display">
            { props.currentInput }
        </h1>
    );
}