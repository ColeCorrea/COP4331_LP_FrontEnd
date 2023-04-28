import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Modal from "./conponents/dateModal";
import ReadRow from "./conponents/readRow";
import EditRow from "./conponents/editRow";
import Cookies from 'js-cookie';

export const List = () => {
    const url = 'http://localhost:3000';
    // useState hooks to get value of inputs 
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [month, setMonth] = useState('04');
    const [day, setDay] = useState('28');
    const [year, setYear] = useState('2023');
    // const [task, setTask] = useState('');
    const [_id, setTaskid] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    // stats varibles
    const [avgAtt, setAvgAtt] = useState('');
    const [avgComp, setAvgComp] = useState('');
    const [rate, setRate] = useState('');
 
    // _id to _id
    // api end-points 
    // replace axios occurrences with api, example: api.post('/endpoint', {data})
    const api = axios.create({
        baseURL: 'http://localhost:3000'
    })

    // get cookie
    const userid = Cookies.get('userid');

    // navigate to signup page, route path is in App.js
    let navigate = useNavigate();
    // check if checkbox is checked
    const [check, setCheck] = useState(false);
    const handleCheckbox = (e ,task) => {
        setCheck(e.target.checked);
        axios.post('http://localhost:3000/tasks/update', {
            userID: userid,
            taskID: task._id,
            name: task.name,
            points: task.points,
            time: task.time,
            date: task.date,
            isChecked: true
        })
    };

    
    const tempData = [
        {'name': 'Large Project', 'points': '10', 'time': '11:59PM', '_id': '1', 'date': '04/28/2023'}
    ]
    const [task, setTask] = useState(tempData);
    
    // delete task
    const doDelete = async (id, date) => {
        const taskDelete = [...task];
        const deleteIndex = task.findIndex((task)=> task._id === id);

        taskDelete.splice(deleteIndex, 1);
        setTask(taskDelete);
        // send to api
        axios.post('http://localhost:3000/task/delete', {
                userID: userid,
                date: date,
                taskID: editTaskId
            }).then(() => {console.log("successfully deleted task");
            });
    };
    // edit row click
    const doEdit = (e, task) =>{
        e.preventDefault();

        // set edit id to task id, to fulfill fragment if
        setEditTaskId(task._id);
        //console.log("edit id after set task:" + editTaskId);
        const formValues = {
            taskID: task._id,
            name: task.name,
            points: task.points,
            time: task.time
        }

        setEditFormData(formValues);
    };
    const[editFormData, setEditFormData] = useState({
        taskID: "",
        name: "",
        points: "",
        time: ""
    });
    // save the nwe edit fields
    const saveEdit = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue; 
        
        setEditFormData(newFormData);
    };
    // save click
    const handleSave = (e, taskData) =>{ 
        e.preventDefault();

        const editedTask = {
            taskID: editFormData.taskID,
            name: editFormData.name,
            points: editFormData.points,
            time: editFormData.time
        }

        const newTask = [...task];
        const index = task.findIndex((task) => task._id === editTaskId);
        newTask[index] = editedTask;
        // check if edit changed
        if(taskData.name !== editedTask.name | taskData.time !== editedTask.time){
            axios.post('http://localhost:3000/tasks/update', {
                userID: userid,
                taskID: editedTask.taskID,
                name: editedTask.name,
                points: taskData.points,
                time: editedTask.time
            }).then(() => {console.log("successfully edited task");
            });
        }
        else{
            console.log("No changes in task");
        }
        setTask(newTask);
        setEditTaskId(null);
    };
    // cancel click
    const handleEditCancel = () =>{   
        // set edit task id to null to get rid of the fragment if
        setEditTaskId(null);
    };
    
    // fetch data from api
    const fetchData = async () =>{

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = '4/28/2023'

        let res = axios.post('http://localhost:3001/task/task-list', {
            userid: userid,
            currentDate: currentDate
        }).then(() => {console.log("Updated table");
        });

        setTask(res.data)
        buildTable(task)
    };
    useEffect(() =>{
        fetchData();
    }, []);
    
    // modal open and close functions
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // modal 2
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => {
        setOpen2(true);
        let res = axios.get('http://localhost:3000/statistics/results', {
            userID: userid});
        setAvgAtt(res.averagePointsAttemptedPerDay);
        setAvgComp(res.averagePointsCompletedPerDay);
        setRate(res.successRate);
    }
    const handleClose2 = () => setOpen2(false);
    // submit current date to api
    const submitDate = async () =>{
        let date = month + '/' + day + '/' + year;
        let res = axios.post('http://localhost:3000/task/task-list', {
            userID: userid,
            currentDate: date});
        setOpen(false)
    };
    // remove cookie on signout
    const signout = () =>{
        Cookies.remove('userid');
    }


    function buildTable(data){
        var table = document.getElementById('myTable')
    
        for(var i = 0; i<data.length; i++){
            var row = `{task.map((col) =>(
                <Fragment>
                {editTaskId === col._id ? (<EditRow task={col} editFormData={editFormData} saveEdit={saveEdit} handleEditCancel={handleEditCancel} handleSave={handleSave}/>
                ) : (
                <ReadRow task={col} doEdit={doEdit} doDelete={doDelete} handleCheck={handleCheckbox}/>)}
            </Fragment> `
            table.innerHTML += row
        }
    }
    

    return(
        <>
            <div className="heading">
                <nav className="navbar">
                    <Link className="btn3 btn-link" to="/" onClick={signout}>Logoff</Link>
                    <h1 className="listheading">Productivity Manager</h1>
                    <Link className="btn4 btn-primary" to="/addTask">New Task</Link>
                </nav>
            </div>
            <form className="form-inline">
                <input className="search" type="search" id="searchbar" placeholder="Search"/>
                <button className="btn2 btn-outline-primary">Search</button>
            </form>
            <button className="btn btn-secondary" onClick={handleOpen}>{month + '/' + day + '/' + year}</button>
                <Modal open={open} onClose={handleClose}>
                    <div className="container2">
                        <h1>Date</h1>
                        <div class="form-group">
                            <label htmlFor="monthLabel">Month</label>
                            <input type="number" className="form-control" id="month" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="dayLabel">Day</label>
                            <input type="number" className="form-control" id="day" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="yearLabel">Year</label>
                            <input type="number" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
                        </div>
                        <div class="buttons">
                            <button type="button" class="btn btn-primary" id="submitDate" onClick={submitDate}>Submit</button>
                            <button type="button" class="btn btn-danger" id="Cancel" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            <div className="container3">
                <form>
                <table className="Table table table-striped bg-light" id="Table">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Points</th>
                            <th>Time</th>
                            <th>Checkbox</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {task.map((col) =>(
                                <Fragment>
                                {editTaskId === col._id ? (<EditRow task={col} editFormData={editFormData} saveEdit={saveEdit} handleEditCancel={handleEditCancel} handleSave={handleSave}/>
                                ) : (
                                <ReadRow task={col} doEdit={doEdit} doDelete={doDelete} handleCheck={handleCheckbox}/>)}
                            </Fragment>   
                        ))}

                    </tbody>
                </table>
                </form>
            </div>
            <button className="btn btn-primary" onClick={handleOpen2}>Stats</button>
            <Modal open={open2} onClose={handleClose2}>
                    <div className="container2">
                        <div class="form-group">
                            <label htmlFor="monthLabel">Average Points Attemted:</label>
                            <div>{avgAtt}</div>
                        </div>
                        <div class="form-group">
                            <label htmlFor="dayLabel">Average Points Completed:</label>
                            <div>{avgComp}</div>
                        </div>
                        <div class="form-group">
                            <label htmlFor="yearLabel">Success Rate:</label>
                            <div>{rate}</div>
                        </div>
                        <div class="buttons">
                            <button type="button" class="btn btn-danger" id="Cancel" onClick={handleClose2}>Cancel</button>
                        </div>
                    </div>
                </Modal>
        </>
    );
}