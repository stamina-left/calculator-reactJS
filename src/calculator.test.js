import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Calculator from './calculator';
test("User can enter numbers up to 8 digits", () => {
    
    render(<Calculator />);
    const calculatorDisplay = screen
        .getByTestId('calculator-display');
    expect(calculatorDisplay.textContent).toBe('0');
    
    numberKeys.forEach((number) => {
        const numberButton = screen.getByRole('button', {name: number});
        fireEvent.click(numberButton);
    });

    expect(calculatorDisplay.textContent).toBe('12345678');
});

describe("Renders a calculator with entry pads", () => {

    const numberKeys = Array.from(Array(10).keys());
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