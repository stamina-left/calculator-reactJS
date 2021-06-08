import React from 'react';

export default function Calculator(props) {
    const keys = props.keys;
    const entryPads = keys.map((key) => 
        <EntryPad key={key} entryPadKey={key} />
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