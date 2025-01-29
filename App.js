import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const userId = 'testUser';
    const [counter, setCounter] = useState(0);
    const [prizes, setPrizes] = useState(0);
    const [reward, setReward] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/stats?userId=${userId}`).then(res => {
            setCounter(res.data.counter);
            setPrizes(res.data.prizes);
        });
    }, []);

    const handleClick = async () => {
        const res = await axios.post('http://localhost:5000/click', { userId });
        setCounter(res.data.counter);
        setPrizes(res.data.prizes);
        setReward(res.data.reward);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Cookie Clicker Clone</h1>
            <button onClick={handleClick} style={{ fontSize: '20px', padding: '10px' }}>Click Me</button>
            <h2>Counter: {counter}</h2>
            <h2>Prizes: {prizes}</h2>
            {reward > 1 && <h3>You got a bonus of {reward - 1} points!</h3>}
        </div>
    );
};

export default App;
