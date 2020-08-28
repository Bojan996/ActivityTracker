import React from 'react';
import './List.css';

const List = (props) => {

    const deleteHandler = () => {
        props.takeId(props.id);
        props.showConfirm();
    }

    let expiredQuestion = (
        <div className='ListExpired'>
            <h2>Did you finish your task?</h2>
            <div className='ListExpiredButtonDiv'>
                <button className='ConfirmYesButton' onClick={() => props.updateTask(props.id, 'true')}>Yes</button>
                <button className='ConfirmNoButton' onClick={() => props.updateTask(props.id, 'false')}>No</button>
            </div>
        </div>
    )

    let containerClass = ['ListContainer'];
    if(props.done === 'true') containerClass.push('Done');
    if(props.done === 'false') containerClass.push('NotDone');

    return (
        <div className={containerClass.join(' ')}>
            {
                props.expired && props.done === 'pending' ? expiredQuestion : null
            }
            <div className='ListContent'>
                <h2>{props.info.what}</h2>
                <h3>Until: {new Date(props.info.dateEnd).toLocaleString()}</h3>
            </div>
            <div className='ListIcons'>
                <button className='ListDeleteButton' onClick={deleteHandler}><i className="far fa-trash-alt"></i></button>
                <button className='ListDoneButton' disabled={props.expired}><i className='far fa-check-circle'></i></button>
            </div>
        </div>
    );

};

export default List;