import React, { useEffect, useState } from 'react';

const numberKeys = Array.from(Array(10).keys()).map(String);
const operationKeys = ["+", "-", "*", "/", "="];
const helperKeys = ["C", "AC"];

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

    const entryPadsKey = operationKeys
        .concat(helperKeys);
    
    const numberEntryPads = numberKeys.map((key) => 
        <CalculatorKey 
            key={key} 
            entryPadKey={key} 
            onClick={() => inputDigit(key)}
        />
    );
        />
    );
    return (
        <div>
            <Display currentInput={currentInput} />
            <div id="entry-pads">{ entryPads }</div>
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