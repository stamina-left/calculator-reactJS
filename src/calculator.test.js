import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './calculator';

const numberKeys = Array.from(Array(10).keys());
const operationKeys = ["+", "-", "/", "="];

describe("Renders a calculator with entry pads", () => {
    const operationKeys = ["+", "-", "/", "="];
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

    expect(calculatorDisplay.textContent).toBe('12345678');
});

function clickButton(value) {
    const targetButton = screen.getByRole('button', {name: value});
    fireEvent.click(targetButton);
}