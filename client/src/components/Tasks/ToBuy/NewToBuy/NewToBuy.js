import React, { useState } from 'react';
import './NewToBuy.css';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';

const NewToBuy = ({ close, fetch }) => {

    const [what, setWhat] = useState('');
    const [cost, setCost] = useState('');

    const addHandler = async () => {
        const updatedCost = Number(cost);
        await axios.post('/api/tobuy', {
            what,
            cost: updatedCost
        });
        try{
            close();
            fetch();
        }catch(err) {
            alert(err);
        }
    }

    return (
        <div className='NewToBuyContainer'>
            <h1>Add new To Buy</h1>
            <div className='NewToBuyInfoDiv'>
                <TextField style={{marginBottom: '20px'}} id="outlined-basic" label="What to buy?" variant="outlined" onChange={(event) => setWhat(event.target.value)}/>
                <TextField style={{marginBottom: '20px'}} id="outlined-basic" label="Approximate cost?" variant="outlined" onChange={(event) => setCost(event.target.value)}/>
                <button onClick={addHandler} className='AddButton'>Add</button>
            </div>
        </div>
    );
};

export default NewToBuy;