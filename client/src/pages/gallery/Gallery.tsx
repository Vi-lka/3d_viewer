import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import { Context } from "../../context/Context";
import "./gallery.css";

export default function Gallery() {
  const [posts, setPosts] = useState([])
  const { search } = useLocation()
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axiosInstance.get("/posts" + search)
     setPosts(res.data)
    };
    fetchPosts()
  },[search])

  const { user } = useContext(Context)
  return (
    <>
      {
        user ? (
          <div className="addPost">
            <Link className="link" to={user ? "/edit" : "/login"}>
              <label className="addPostLabel">
                <img className="addPostIcon" src="/img/add.png" alt="" />
                Добавить 3D модель
              </label>
            </Link>
          </div>
        ) : (
          null
        )
      }


    <div className="gallery">
      <Posts posts={posts} />
    </div>
    </>
  )
}
