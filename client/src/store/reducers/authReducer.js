import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    user: null
}


export default (state = initialState, actions) => {
    switch(actions.type){
        case actionTypes.FETCH_USER:
            return {
                isAuth: true,
                user: actions.user
            };
        default: 
            return state;
    }
}