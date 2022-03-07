import { useState, forwardRef, useEffect } from 'react';

import './Input.css';

function Input(props, ref) {
    const [ style, setStyle ] = useState('');

    // Quando renderizar verifica se tem valor no input, se tiver move o label.
    useEffect(() => {
        if ( ref.current.value ) handleFocus();
    }, []);

    const handleBlur = () => {
        if ( props.value === '' ) {
            setStyle('');
        };
    };

    const handleFocus = () => setStyle('move');

    return (
        <>
            <label className={`label ${style}`}>{ props.label }</label>
            <input
                onBlur={ handleBlur }
                onFocus={ handleFocus }
                autoFocus={ props.autoFocus }
                defaultValue={ props.value }
                required={ props.required }
                type={ props.type }
                id={ props.id }
                ref={ ref }
                autoComplete='off'
                className='input'
                maxLength='50'
            />
        </>
    );
};

export default forwardRef(Input);