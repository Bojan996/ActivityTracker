import React from 'react';
import './Confirm.css';

const Confirm = ({question, confirm, closeConfirm}) => {
    return (
        <div className='ConfirmContainer'>
            <h2>{question}</h2>
            <div className='ConfirmButtonsDiv'>
                <button className='ConfirmYesButton' onClick={confirm}>Yes</button>
                <button className='ConfirmNoButton' onClick={closeConfirm}>No</button>
            </div>
        </div>
    );
};

export default Confirm;