import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './calculator';

const numbers = Array.from(Array(10).keys());
const operations = ["+", "-", "/", "="];

describe("Renders a calculator with entry pads", () => {
    const helpers = ["C", "AC"];

    const merged = numbers
        .concat(operations, helpers);

    test.each(merged)(`Check if it renders a %s entry pad.`, 
    (value) => {
        render(<Calculator />);
        const calculatorKey = screen.getByRole('button', 
        {name: value});
        expect(calculatorKey).toBeInTheDocument();
    });
});

test("User can enter numbers up to 8 digits", () => {
    
    render(<Calculator />);
    const calculatorDisplay = screen
        .getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');
    
    numbers.map(clickButton);

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

test("User clicks AC to clear all inputs both numbers nor operations", () => {

    render(<Calculator />);
    const calculatorDisplay = screen.getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');

    [4, 4].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('44');

    clickButton('/');

    [2, 2].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('22');

    clickButton('AC');
    expect(calculatorDisplay.textContent).toBe('0');
});

test("User can see 'ERR' displayed if the result is more than 8 digits", () => {

    render(<Calculator />);
    const calculatorDisplay = screen.getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');

    [1, 0, 0, 0, 0, 0, 0, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('10000000');

    clickButton('*');

    [1, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('10');

    clickButton('*');
    expect(calculatorDisplay.textContent).toBe('ERR');

    [1, 0, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('100');

    clickButton('*');
    expect(calculatorDisplay.textContent).toBe('100');

    [2, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('20');

    clickButton('=');
    expect(calculatorDisplay.textContent).toBe('2000');
});

test("User clicks '+/-' button to change the sign of the current displayed number", () => {

    render(<Calculator />);
    const calculatorDisplay = screen.getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');

    [5, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('50');

    clickButton('+/-');
    expect(calculatorDisplay.textContent).toBe('-50');

    clickButton('*');

    [5, 0, 0].map(clickButton);
    expect(calculatorDisplay.textContent).toBe('500');

    clickButton('=');
    expect(calculatorDisplay.textContent).toBe('-25000');
});

test("User can enter a floating numbers by clicking '.' button", () => {
});

function clickButton(value) {
    const targetButton = screen.getByRole('button', {name: value});
    fireEvent.click(targetButton);
}