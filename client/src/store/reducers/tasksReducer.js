import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: null,
    toDo: [],
    toBuy: [],
    toWatch: [],
    toTravel: [],
    error: null
}

export default (state = initialState, actions) => {
    switch(actions.type){
        case actionTypes.FETCH_TASKS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCHED_TASKS:
            return {
                ...state,
                toDo: actions.toDo,
                toWatch: actions.toWatch,
                toBuy: actions.toBuy,
                toTravel: actions.toTravel,
                loading: false
            }
        case actionTypes.FETCHED_TODO:
            return {
                ...state,
                toDo: actions.toDo,
                loading: false
            }
        case actionTypes.FETCHED_WATCH:
            return {
                ...state,
                toWatch: actions.toWatch,
                loading: false
            }
        case actionTypes.FETCHED_BUY:
            return {
                ...state,
                toBuy: actions.toBuy,
                loading: false
            }
        case actionTypes.FETCHED_TRAVEL:
            return {
                ...state,
                toTravel: actions.toTravel,
                loading: false
            }
        case actionTypes.FETCH_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                error: actions.error
            }
        default: 
            return initialState;
    }
}