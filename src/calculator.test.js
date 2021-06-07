import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Calculator from './calculator';

let container = null;
beforeEach(() => {
    // Atur elemen DOM sebagai tujuan render
    container = document.createElement("div");
    // container *harus* melekat pada document agar events bekerja dengan benar
    document.body.appendChild(container);
});

it("renders an entry pads", () => {
    const numberEntryPads = Array.from(Array(10).keys());
    const operationEntryPads = ["+", "-", "/", "="];
    const helperEntryPads = ["C", "AC"];
    
    const entryPads = numberEntryPads
        .concat(operationEntryPads, helperEntryPads);
    
});
