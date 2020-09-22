import React from 'react';

import ToDo from './ToDo/ToDo';
import ToWatch from './ToWatch/ToWatch';
import ToTravel from './ToTravel/ToTravel';
import ToBuy from './ToBuy/ToBuy';

const TaskPicker = (props) => {

    switch(props.type){
        case 'todo':
            return <ToDo {...props} expired={props.data.dateEnd <= Date.now()}/>
        case 'tobuy':
            return <ToBuy {...props}/>
        case 'totravel':
            return <ToTravel/>
        case 'towatch':
            return <ToWatch/>
        default: 
            return <ToDo/>
    }

};

export default TaskPicker;