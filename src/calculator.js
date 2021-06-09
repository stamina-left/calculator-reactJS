import React, { useState } from 'react';

const numberKeys = Array.from(Array(10).keys());
const operationKeys = ["+", "-", "/", "="];
const helperKeys = ["C", "AC"];

export default function Calculator() {

    const [currentInput, setCurrentInput] = useState(0);

    const entryPadsKey = numberKeys
        .concat(operationKeys, helperKeys);
    
    const entryPads = entryPadsKey.map((key) => 
        <EntryPad 
            key={key} 
            entryPadKey={key} 
            onClick={() => handleClick(key)} 
        />
    );
    return (
        <div id="entry-pads">{ entryPads }</div>
    );
}

function EntryPad(props) {
    return (
        <button name={ props.entryPadKey }>
            { props.entryPadKey }
        </button>
    );
}