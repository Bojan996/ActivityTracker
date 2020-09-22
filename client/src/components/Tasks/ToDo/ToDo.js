import React from 'react';
import './ToDo.css';

const ToDo = (props) => {

    const deleteHandler = () => {
        props.takeId(props.data._id);
        props.showDeleteConfirm();
    }

    const finishHandler = () => {
        props.takeId(props.data._id);
        props.showFinishConfirm();
    }

    let expiredQuestion = (
        <div className='ToDoExpired'>
            <h2>Did you finish your task?</h2>
            <div className='ToDoExpiredButtonDiv'>
                <button className='ToDoConfirmYesButton' onClick={() => props.updateTask(props.data._id, 'true')}>Yes</button>
                <button className='ToDoConfirmNoButton' onClick={() => props.updateTask(props.data._id, 'false')}>No</button>
            </div>
        </div>
    )

    let containerClass = ['ToDoContainer'];
    if(props.data.done === 'true') containerClass.push('Done');
    if(props.data.done === 'false') containerClass.push('NotDone');

    return (
        <div className={containerClass.join(' ')}>
            {
                props.expired && props.data.done === 'pending' ? expiredQuestion : null
            }
            <div className='ToDoContent'>
                <h2>{props.data.what}</h2>
                <h3>Until: {new Date(props.data.dateEnd).toLocaleString()}</h3>
            </div>
            <div className='ToDoIcons'>
                <button className='ToDoDeleteButton' onClick={deleteHandler}><i className="far fa-trash-alt"></i></button>
                <button className='ToDoDoneButton' disabled={props.expired || props.data.done !== 'pending'} onClick={finishHandler}><i className='far fa-check-circle'></i></button>
            </div>
        </div>
    );
};

export default ToDo;