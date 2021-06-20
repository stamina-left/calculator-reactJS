import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './calculator';

const numberKeys = Array.from(Array(10).keys());
const operationKeys = ["+", "-", "/", "="];

describe("Renders a calculator with entry pads", () => {
    const helperKeys = ["C", "AC"];

    const entryPadsKey = numberKeys
        .concat(operationKeys, helperKeys);

    test.each(entryPadsKey)(`Check if it renders a %s entry pad.`, 
    (entryPad) => {
        render(<Calculator />);
        const entryPadElement = screen.getByRole('button', 
        {name: entryPad});
        expect(entryPadElement).toBeInTheDocument();
    });
});

test("User can enter numbers up to 8 digits", () => {
    
    render(<Calculator />);
    const calculatorDisplay = screen
        .getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');
    
    numberKeys.map(clickButton);

    expect(calculatorDisplay.textContent).toBe('12345678');
});

test("User can click on operations and show results", () => {

    render(<Calculator />);
    const calculatorDisplay = screen
        .getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');

    [2, 3].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('23');

    clickButton('+');

    [1, 2].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('12');

    clickButton('-');
    expect(calculatorDisplay.textContent).toBe('35');

    [3, 4].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('34');

    clickButton('*');
    expect(calculatorDisplay.textContent).toBe('1');

    [1, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('10');

    clickButton('/');
    expect(calculatorDisplay.textContent).toBe('10');

    clickButton(5);
    expect(calculatorDisplay.textContent).toBe('5');

    clickButton('=');
    expect(calculatorDisplay.textContent).toBe('2');
});

test("User clicks C and clear the latest input or operation", () => {

    render(<Calculator />);
    const calculatorDisplay = screen.getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');

    [5, 9, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('590');

    clickButton('C');
    expect(calculatorDisplay.textContent).toBe('0');

    [5, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('50');

    clickButton('*');
    clickButton('C');
    clickButton('/');

    [2, 5].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('25');

    clickButton('=');
    expect(calculatorDisplay.textContent).toBe('2');
});

function clickButton(value) {
    const targetButton = screen.getByRole('button', {name: value});
    fireEvent.click(targetButton);
}