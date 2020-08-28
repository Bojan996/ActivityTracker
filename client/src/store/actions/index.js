import axios from 'axios';
import * as actionTypes from './actionTypes';

//AUTH
const setUser = (user) => ({
    type: actionTypes.FETCH_USER,
    user
});


export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    if(res.data){
        dispatch(setUser(res.data));
    }
}

//TASKS
const fetchTasksStart = () => ({
    type: actionTypes.FETCH_TASKS_START
});

const fetchedTasks = (toDo) => ({
    type: actionTypes.FETCHED_TASKS,
    toDo
});

const fetchTasksError = (error) => ({
    type: actionTypes.FETCH_TASKS_ERROR,
    error
});

export const fetchingTasks = () => async dispatch => {
    dispatch(fetchTasksStart());
    const res = await axios.get('/api/todo');
    try {
        dispatch(fetchedTasks(res.data))
    } catch(error){
        dispatch(fetchTasksError(error));
    }
}




