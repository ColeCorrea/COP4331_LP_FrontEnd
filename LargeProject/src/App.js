import React, { useState } from "react";
import './App.css';
import { Login } from "./login";
import { Signup } from "./signup";
import { List } from "./list";
import { AddTask } from "./addTask";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/List" element={<List/>}/>
          <Route exact path="/AddTask" element={<AddTask/>}/>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
