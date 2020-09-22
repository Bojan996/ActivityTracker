import React, { useState } from 'react';
import './NewToDo.css';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";


const NewToDo = ({ fetch, close }) => {

    const [what, setWhat] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());


    const handleChange = date => {
        setSelectedDate(date);
    }

    const addHandler = async () => {
        await axios.post('/api/todo', {
            what,
            dateEnd: selectedDate.getTime()
        });
        try{
            close();
            fetch();
        }catch(err) {
            alert(err);
        }
    }

    return (
        <div className='NewToDoContainer'>
            <h1>Add new To Do</h1>
            <div className='NewToDoInfoDiv'>
                <TextField style={{marginBottom: '20px'}} id="outlined-basic" label="What to do?" variant="outlined" onChange={(event) => setWhat(event.target.value)}/>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                />
                <button style={{marginTop: '20px'}} onClick={addHandler} className='AddButton'>Add</button>
            </div>
        </div>
    );
};

export default NewToDo;