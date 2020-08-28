import React from 'react';
import ToDo from '../components/ToDo/ToDo';
import ToWatch from '../components/ToWatch/ToWatch';
import ToBuy from '../components/ToBuy/ToBuy';
import ToTravel from '../components/ToTravel/ToTravel';
import MoneyGraph from '../components/MoneyGraph/MoneyGraph';

export const dashboard = (type) => {
    switch(type){
        case 'To do':
            return <ToDo/>
        case 'To watch':
            return <ToWatch/>
        case 'To buy':
            return <ToBuy/>
        case 'To travel':
            return <ToTravel/>
        case 'Money Graph':
            return <MoneyGraph/>
        default: 
            return <ToDo/>
    }
}