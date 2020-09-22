import React from 'react';
import './ToBuy.css';

const ToBuy = (props) => {

    const deleteHandler = () => {
        props.takeId(props.data._id);
        props.showDeleteConfirm();
    }

    const finishHandler = () => {
        props.takeId(props.data._id);
        props.showFinishConfirm();
    }

    const containerClass = ['ToBuyContainer'];
    if(props.data.done === 'true') containerClass.push('Done');

    return (
        <div className={containerClass.join(' ')}>
            <div className='ToBuyContent'>
                <h2>{props.data.what}</h2>
                <h3>Approximate cost: {props.data.cost}$</h3>
            </div>
            <div className='ToBuyIcons'>
                <button className='ToBuyDeleteButton' onClick={deleteHandler}><i className="far fa-trash-alt"></i></button>
                <button className='ToBuyDoneButton' disabled={props.data.done !== 'pending'} onClick={finishHandler}><i className='far fa-check-circle'></i></button>
            </div>
        </div>
    );
};

export default ToBuy;