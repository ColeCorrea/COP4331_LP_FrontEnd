import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"

export const Signup = () => {

    // save signup credentials
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    // const [message, setMessage] = useState('');
    

    const navigate = useNavigate();
    const navLogin = () =>{
        navigate('/');
    }

    /*
        // email validification design
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i   // /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[A-Z]{2,8}(.[a-z{2,8}])?/g
        if(regex.test(email)){
            setMessage("Valid email");
        }
        else if(!regex.test(email) && email != ""){
            setMessage("Invalid email. Please include @*****.****");
        }
        else{
            setMessage("");
        }
    */

        /*
            async function doSignup() {
                try {
                    let data = {
                        userID: userid,
                        username: username,
                        password: password,
                        Email: email,
                        firstName: firstname,
                        lastName: lastname
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

    // send data to api and navigate back to login
    const doSignup = async () => { 
        let res = axios.post('http://localhost:3000/users/signup', {
            username: username,
            password: password,
            Email: email,
            firstName: firstname,
            lastName: lastname
        }).then(() => {console.log("successfully added user");
        });


    };

    return(
        <>
           <nav className="nav justify-content-center">
                <h1>Productivity Manager</h1>
            </nav>
            <div className="container">
                <h1>Signup</h1>
                <form id="loginForm">
                    <div className="form-group">
                        <label htmlFor="usernameLabel">Username</label>
                        <input type="username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="passwordLabel">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailLabel">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstnameLabel">Firstname</label>
                        <input type="firstname" className="form-control" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Enter firstname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastnameLabel">Lastname</label>
                        <input type="lastname" className="form-control" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Enter lastname"/>
                    </div>
                    <button className="btn btn-primary" onClick={doSignup}>Submit</button>
                    <button className="btn btn-link" onClick={navLogin}>Cancel</button>
                </form>
            </div>
        </>
    )
}