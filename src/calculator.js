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

    const merged = operations
        .concat(helpers);

    const numberKeys = numbers.map((key) => 
        <CalculatorKey 
            key={key}
            entryPadKey={key}
            onClick={() => inputDigit(key)}
        />
    );
    
    const otherKeys = merged.map(key => 
        <CalculatorKey 
            key={key} 
            entryPadKey={key} 
            onClick={() => performOperation(key)} 
        />
    );
    return (
        <div>
            <CalculatorDisplay currentInput={displayValue} />
            <div id="entry-pads">
                { numberKeys }
                { otherKeys }
            </div>
        </div>
    );

    function inputDigit(digit) {
        if (waitingForOperand){
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
            
            setDisplayValue(String(newValue));
            setValue(newValue);
        }
        setWaitingForOperand(true);
        setOperator(nextOperator);
    }

    function inputClear() {
        if (operator) {
            setWaitingForOperand(false);
            setOperator(null);
        } else if (displayValue !== 0) {
            setDisplayValue('0');
        }
    }
}

function CalculatorKey(props) {
    return (
        <button 
            name={ props.entryPadKey } 
            onClick={() => props.onClick() }
        >
            { props.entryPadKey }
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