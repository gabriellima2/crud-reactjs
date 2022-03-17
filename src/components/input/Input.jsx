import { useState, useEffect } from "react";

import "./Input.css";

export default function Input({ attributes, setData }) {
    const [ style, setStyle ] = useState("");

    // Quando renderizar verifica se tem valor no input, se tiver move o label.
    useEffect(() => {
        if ( attributes.value ) handleFocus();
    }, []);

    const handleBlur = () => {
        if ( !attributes.value ) {
            setStyle("");
        };
    };

    const handleFocus = () => setStyle("move");

    const handleChange = ({ target }) => {
        setData(target.value);
    };

    return (
        <>
            <label className={`label ${style}`}>{attributes.label}</label>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                autoFocus={attributes.autoFocus}
                defaultValue={attributes.value}
                required={attributes.required}
                type={attributes.type}
                id={attributes.id}
                autoComplete="off"
                className="input"
                maxLength="50"
            />
        </>
    );
};
