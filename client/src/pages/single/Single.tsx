import "./single.css";
import SinglePost from '../../components/singlePost/SinglePost';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Single() {
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  const [post, setPost] = useState({})
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  useEffect(()=>{
    const getPost = async ()=>{
      const res = await axiosInstance.get("/posts/" + path)
      setPost(res.data)
    }
    getPost()
  },[path])

  return (
<<<<<<< HEAD
    <>
    <div className="single">
      <SinglePost post={post}/>
    </div>
    <div></div>
    </>
=======
    <div className="single">
      <SinglePost post={post}/>
    </div>
>>>>>>> fa2a6aaac0807b00030f88d6dd9c704c92ab7530
  )
}
