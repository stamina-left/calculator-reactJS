import ReactDOM from 'react-dom';
import Calculator from './calculator';

const numberKeys = Array.from(Array(10).keys());

ReactDOM.render(
    <Calculator keys={numberKeys} />,
    document.getElementById('root')
);