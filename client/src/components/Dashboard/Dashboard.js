import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import './Dashboard.css';

import NewTaskPicker from '../Tasks/NewTaskPicker';
import Backdrop from '../UI/Backdrop/Backdrop';
import TaskPicker from '../Tasks/TaskPicker';
import Confirm from '../Confirm/Confirm';


const Dashboard = (props) => {

    const [taskId, setTaskId] = useState('');
    const [showNewTask, setShowNewTask] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showFinishConfirm, setShowFinishConfirm] = useState(false);

    const closeHandler = () => {
        setShowDeleteConfirm(false);
        setShowNewTask(false);
        setShowFinishConfirm(false);
    }

    const showNewTaskHandler = () => {
        setShowNewTask(true);
    }

    const showDeleteConfirmHandler = () => {
        setShowDeleteConfirm(true);
    }

    const showFinishConfirmHandler = () => {
        setShowFinishConfirm(true);
    }

    const takeTaskId = (id) => {
        setTaskId(id);
    }

    const deleteTaskHandler = async () => {
        const url = `/api/${props.type}`;
        await axios({
            method: 'DELETE',
            url,
            data: {
              id: taskId
            }
        });
        try {
            closeHandler();
            props.fetchIndividualTask(props.type);
        }catch(err) {
            alert(err);
        }
    }

    const updateTaskHandler = async (id, value) => {
        let updatedId = id === null ? taskId : id;
        const url = `/api/${props.type}`;
        await axios({
            method: 'PUT',
            url,
            data: {
                id: updatedId,
                value
            }
        });
        try {
            if(id === null) closeHandler();
            props.fetchIndividualTask(props.type);
        } catch(err) {
            alert(err);
        }
    }

    let confirmComponent = 
        showDeleteConfirm ? 
        <Confirm question='Are you sure to delete this task?' confirm={deleteTaskHandler} closeConfirm={closeHandler}/> :
        showFinishConfirm ?
        <Confirm question='Are you sure to finish this task?' confirm={() => updateTaskHandler(null, 'true')} closeConfirm={closeHandler}/> :
        null
    
    const buttonDisabled = props.type === 'towatch' || props.type === 'totravel' ? true : false;

    return ( 
        <div className='DashboardContainer'>
            <Backdrop show={showNewTask || showDeleteConfirm || showFinishConfirm === true} close={closeHandler}/>
                {
                    showNewTask ? <NewTaskPicker type={props.type} close={closeHandler} fetch={() => props.fetchIndividualTask(props.type)}/> : null
                }
                {confirmComponent}
            <div className='DashboardHeadingSection'>
                <h1 className='DashboardHeader'>To do Dashboard</h1>
                <button disabled={buttonDisabled} onClick={showNewTaskHandler} className='NewButton'>New</button>
            </div>
            <div className='DashboardListSection'>
                {
                    props[props.type].map((e, index) => (
                        <TaskPicker
                            type={props.type}
                            data={e}
                            key={index}
                            showDeleteConfirm={showDeleteConfirmHandler} 
                            showFinishConfirm={showFinishConfirmHandler}
                            takeId={takeTaskId} 
                            updateTask={updateTaskHandler} 
                        />
                    ))
                }
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    todo: state.tasks.toDo,
    towatch: state.tasks.toWatch,
    tobuy: state.tasks.toBuy,
    totravel: state.tasks.toTravel,
});

export default connect(mapStateToProps, actions)(Dashboard);