import React from 'react';
import './Confirm.css';

const Confirm = (props) => {
    return (
        <div className='ConfirmContainer'>
            <h2>Are you sure to delete the {props.type}?</h2>
            <div className='ConfirmButtonsDiv'>
                <button className='ConfirmYesButton' onClick={props.confirm}>Yes</button>
                <button className='ConfirmNoButton' onClick={props.closeConfirm}>No</button>
            </div>
        </div>
    );
};

export default Confirm;