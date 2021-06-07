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
