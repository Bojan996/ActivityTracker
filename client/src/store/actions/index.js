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

//FETCHING ALL TASKS
const fetchTasksStart = () => ({
    type: actionTypes.FETCH_TASKS_START
});

const fetchedTasks = (toDo, toBuy, toWatch, toTravel) => ({
    type: actionTypes.FETCHED_TASKS,
    toDo,
    toBuy,
    toWatch,
    toTravel
});

const fetchTasksError = (error) => ({
    type: actionTypes.FETCH_TASKS_ERROR,
    error
});

export const fetchingTasks = () => async dispatch => {
    dispatch(fetchTasksStart());
    const todo = await axios.get('/api/todo');
    const towatch = await axios.get('/api/towatch');
    const tobuy = await axios.get('/api/tobuy');
    const totravel = await axios.get('/api/totravel');
    try {
        dispatch(fetchedTasks(todo.data, tobuy.data, towatch.data, totravel.data));
    } catch(err){
        dispatch(fetchTasksError(err));
    }
}

//INDIVIDUAL TASKS

const fetchToDo = (toDo) => ({
    type: actionTypes.FETCHED_TODO,
    toDo
});

const fetchToBuy = (toBuy) => ({
    type: actionTypes.FETCHED_BUY,
    toBuy
});

const fetchToTravel = (toTravel) => ({
    type: actionTypes.FETCHED_TRAVEL,
    toTravel
});

const fetchToWatch = (toWatch) => ({
    type: actionTypes.FETCHED_WATCH,
    toWatch
});


export const fetchIndividualTask = (task) => async dispatch => {
    dispatch(fetchTasksStart());
    const res = await axios.get(`/api/${task}`);
    try {
        switch(task){
            case 'todo':
                dispatch(fetchToDo(res.data));
                break;
            case 'tobuy':
                dispatch(fetchToBuy(res.data));
                break;
            case 'totravel':
                dispatch(fetchToTravel(res.data));
                break;
            case 'towatch':
                dispatch(fetchToWatch(res.data));
                break;
            default:
                break;
        }
    } catch (err) {
        dispatch(fetchTasksError(err));
    }
}




