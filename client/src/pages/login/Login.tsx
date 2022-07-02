import axios from "axios";
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {

  const userRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const { dispatch, isFetching } = useContext(Context)
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  
  const handleSubmit = async (e: any)=>{
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try{
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      window.location.replace("/gallery")
    }catch(err){
      dispatch({type: "LOGIN_FAIL" })
    }
  }

  return (
    <div className="login">
        <h1 className="loginTitle">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="">Имя</label>
            <input 
              className="loginInput" 
              type="text" 
              placeholder="Введите Имя"
              ref={userRef} 
            />
            <label htmlFor="">Пароль</label>
            <input 
              className="loginInput"  
              type="password" 
              placeholder="Введите Пароль"
              ref={passwordRef}    
            />
            <button className="loginButton" type="submit" disabled={isFetching}>Войти</button>
        </form>
    </div>
  )
}
