import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import './ToDo.css';

import NewToDo from './NewToDo/NewToDo';
import Backdrop from '../UI/Backdrop/Backdrop';
import List from '../List/List';
import Confirm from '../Confirm/Confirm';


const ToDo = (props) => {

    const [listId, setListId] = useState('');
    const [showToDo, setShowToDo] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showFinishConfirm, setShowFinishConfirm] = useState(false);

    const closeHandler = () => {
        setShowDeleteConfirm(false);
        setShowToDo(false);
        setShowFinishConfirm(false);
    }

    const showToDoHandler = () => {
        setShowToDo(true);
    }

    const showDeleteConfirmHandler = () => {
        setShowDeleteConfirm(true);
    }

    const showFinishConfirmHandler = () => {
        setShowFinishConfirm(true);
    }

    const takeListId = (id) => {
        setListId(id);
    }

    const deleteTaskHandler = async () => {
        await axios({
            method: 'DELETE',
            url: '/api/todo',
            data: {
              id: listId
            }
        });
        try {
            closeHandler();
            props.fetchingTasks();
        }catch(err) {
            alert(err);
        }
    }

    const updateTaskHandler = async (id, value) => {
        let updatedId = id === null ? listId : id
        await axios({
            method: 'PUT',
            url: '/api/todo',
            data: {
                id: updatedId,
                value
            }
        });
        try {
            if(id === null) closeHandler();
            props.fetchingTasks();
        } catch(err) {
            alert(err);
        }
    }

    let confirmComponent = 
        showDeleteConfirm ? 
        <Confirm question='Are you sure to delete the to do?' confirm={deleteTaskHandler} closeConfirm={closeHandler}/> :
        showFinishConfirm ?
        <Confirm question='Are you sure to finish the to do?' confirm={() => updateTaskHandler(null, 'true')} closeConfirm={closeHandler}/> :
        null
    

    return ( 
        <div className='ToDoContainer'>
            <Backdrop show={showToDo || showDeleteConfirm || showFinishConfirm === true} close={closeHandler}/>
                {
                    showToDo ? <NewToDo close={closeHandler} fetch={props.fetchingTasks}/> : null
                }
                {confirmComponent}
            <div className='ToDoHeadingSection'>
                <h1 className='ToDoHeader'>To do Dashboard</h1>
                <button onClick={showToDoHandler} className='NewButton'>New</button>
            </div>
            <div className='ToDoListSection'>
                {
                    props.toDo.map((e, index) => (
                        <List expired={e.dateEnd <= Date.now()} 
                            key={index} 
                            info={e}
                            id={e._id} 
                            showDeleteConfirm={showDeleteConfirmHandler} 
                            showFinishConfirm={showFinishConfirmHandler}
                            takeId={takeListId} 
                            updateTask={updateTaskHandler} 
                            done={e.done}
                        />
                    ))
                }
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    toDo: state.tasks.toDo,
});

export default connect(mapStateToProps, actions)(ToDo);