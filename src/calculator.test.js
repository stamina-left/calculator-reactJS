import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Calculator from './calculator';

describe("Renders a calculator with entry pads", () => {

    const numberKeys = Array.from(Array(10).keys());
    const operationKeys = ["+", "-", "/", "="];
    const helperKeys = ["C", "AC"];

    const entryPadsKey = numberKeys
        .concat(operationKeys, helperKeys);

    it.each(entryPadsKey)(`Check if it renders a %s entry pad.`, 
    (entryPad) => {
        render(<Calculator />);
        const entryPadElement = screen.getByRole('button', 
        {name: entryPad});
        expect(entryPadElement).toBeInTheDocument();
    });
});