import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Cookies from 'js-cookie';

export const Login = () => {
    // useState hooks to get value of inputs 
    // email and password will be updated "onChange"
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 

    // navigate to signup page, route path is in App.js
    let navigate = useNavigate();
    const navSignup = () =>{
        navigate('/Signup');
    }
    // const json = JSON,stringify();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const json = {username: username, password: password}
        try{
            const res = axios.post('http://localhost:3001/users/login', json);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    };
    
   /*
    async function doLogin() {
        try {
            let data = {
                username: username,
                password: password,
            }
            const response = await fetch("", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);

        } catch (error) {
            console.error("Error:", error);
        }
    }

*/



    return(
        <>
            <nav className="nav justify-content-center">
                <h1>Productivity Manager</h1>
            </nav>
            <div className="container">
                <h1>Login</h1>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="usernameLabel">Username</label>
                        <input type="username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="passwordLabel">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    </div>
                    <button className="btn btn-primary" >Submit</button>
                    <button className="btn btn-link" onClick={navSignup}>Don't have an account? Signup here</button>
                </form>
            </div>
        </>
    )
}