import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import './ToDo.css';

import NewToDo from './NewToDo/NewToDo';
import Backdrop from '../Backdrop/Backdrop';
import List from '../List/List';
import Confirm from '../Confirm/Confirm';


const ToDo = (props) => {

    const [showToDo, setShowToDo] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [listId, setListId] = useState('');

    const closeHandler = () => {
        setShowConfirm(false);
        setShowToDo(false);
    }
    const showToDoHandler = () => {
        setShowToDo(true);
    }

    const showConfirmHandler = () => {
        setShowConfirm(true);
    }

    const takeListId = (id) => {
        setListId(id);
    }

    const deleteTaskHandler = async () => {
        closeHandler();
        await axios({
            method: 'DELETE',
            url: '/api/todo',
            data: {
              id: listId
            }
        });
        try {
            props.fetchingTasks();
        }catch(err) {
            alert(err);
        }
    }

    const updateTaskHandler = async (id, value) => {
        await axios({
            method: 'PUT',
            url: '/api/todo',
            data: {
                id,
                value
            }
        });
        try {
            props.fetchingTasks();
        } catch(err) {
            alert(err);
        }
    }

    console.log(props.toDo);

    return (
        <div className='ToDoContainer'>
            <div className='ToDoHeadingSection'>
                <h1 className='ToDoHeader'>To do Dashboard</h1>
                <Backdrop show={showToDo || showConfirm === true} close={closeHandler}/>
                {
                    showToDo ? <NewToDo close={closeHandler} fetch={props.fetchingTasks}/> : 
                    showConfirm ? <Confirm type='to do' confirm={deleteTaskHandler} closeConfirm={closeHandler}/> :
                    null
                }
                <button onClick={showToDoHandler} className='NewButton'>New</button>
            </div>
            <div className='ToDoListSection'>
                {
                    props.toDo.map((e, index) => (
                        <List expired={e.dateEnd <= Date.now()} 
                            info={e} key={index} 
                            id={e._id} 
                            showConfirm={showConfirmHandler} 
                            takeId={takeListId} 
                            close={closeHandler} 
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
    loadingTask: state.tasks.loading
});

export default connect(mapStateToProps, actions)(ToDo);