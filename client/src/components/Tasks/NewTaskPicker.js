import React from 'react';

import NewToDo from './ToDo/NewToDo/NewToDo';
import NewToWatch from './ToWatch/NewToWatch/NewToWatch';
import NewToTravel from './ToTravel/NewToTravel/NewToTravel';
import NewToBuy from './ToBuy/NewToBuy/NewToBuy';

const NewTaskPicker = (props) => {

    switch(props.type){
        case 'todo':
            return <NewToDo {...props}/>
        case 'tobuy':
            return <NewToBuy {...props}/>
        case 'totravel':
            return <NewToTravel/>
        case 'towatch':
            return <NewToWatch/>
        default:
            return <NewToDo/>
    }

};

export default NewTaskPicker;