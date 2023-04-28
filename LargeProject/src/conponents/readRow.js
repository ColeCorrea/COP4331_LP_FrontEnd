import React from 'react'


const ReadRow = ({task , doEdit, doDelete, handleCheck}) => {
    return(
        <tr>
            <td>{task.name}</td>
            <td>{task.points}</td>
            <td>{task.time}</td>
            <td><input className="form-check-input" type="checkbox" value="" id="checkbox" onChange={(e) =>handleCheck(e, task)}/></td>
            <td>
                <button className="btn btn-primary" onClick={(e)=> doEdit(e, task)}>Edit</button>
                <button className="btn btn-danger" type="button" onClick={() => doDelete(task.taskID, task.date)}>Delete</button>
            </td>
        </tr>
    );
};

export default ReadRow;
