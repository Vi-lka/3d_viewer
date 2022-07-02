import React, { Component, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Topbar from './components/topbar/Topbar';
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Gallery from "./pages/gallery/Gallery";
import Model from "./pages/model/Model";
import Single from "./pages/single/Single";
import Edit from "./pages/edit/Edit";
import Login from "./pages/login/Login";
import { Context } from "./context/Context";


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery/*" element={<Gallery />} />
        <Route path="login/*" element={<Login />} />
        <Route path="post/:postId/*" element={<Single />} />
        <Route path="edit/*" element={user ? <Edit /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App;
