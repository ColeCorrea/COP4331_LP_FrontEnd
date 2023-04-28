import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"
import Cookies from 'js-cookie';

export const AddTask = () => {
    // useState hooks to get value of inputs 
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    // get cookie
    const userid = Cookies.get('userid');
 

    // navigate to signup page, route path is in App.js
    let navigate = useNavigate();
    const navList = () =>{
        navigate('/List');
    }
    // add the task, send to api
    const doAdd = () => { 
        axios.post('http://localhost:3000/tasks/create', {
            userID: userid,
            name: name,
            points: points,
            date: date,
            time: time
        }).then(() => {console.log("successfully added task");
        });
        navigate('/List')
    };

    return(
        <>
            <nav>
                <h1>Productivity Manager</h1>
            </nav>
            <div className="container">
                <h1>New Task</h1>
                <form id="addForm">
                    <div className="form-group">
                        <label htmlFor="nameLabel">Task Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter task name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pointsLabel">Points</label>
                        <input type="number" className="form-control" id="points" value={points} onChange={(e) => setPoints(e.target.value)} placeholder="Enter number of points" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateLabel">Date</label>
                        <input type="text" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Enter date that the task will take place"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="timeLabel">Time</label>
                        <input type="text" className="form-control" id="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Enter time of the task"/>
                    </div>
                    <button className="btn btn-primary" onClick={doAdd}>Create</button>
                    <button className="btn btn-link" onClick={navList}>Cancel</button>
                </form>
            </div>
        </>
    )
}