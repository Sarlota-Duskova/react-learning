import React from 'react'

export default function TeamPlayerInput(props) {

    const handleClick = () => {
        props.onAdd();
    };

    return (
        <div>
            <h1 className="column-title">{props.columnTitle}</h1>
            <div className="input-container">
            <input
                type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            <button id="btn" onClick={handleClick}>{props.buttonText}</button>
            </div>
        </div>
    )
}