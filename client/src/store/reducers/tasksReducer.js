import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: null,
    toDo: [],
    toBuy: null,
    toWatch: null,
    toTravel: null,
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
                loading: false,
                toDo: actions.toDo
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