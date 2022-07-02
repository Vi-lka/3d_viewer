import React from 'react'
import Post from '../post/Post';
import "./posts.css";

export default function Posts({posts}: {posts:any}, {key}: {key:any}) {
  return (
    <div className='posts'>
      {posts.map((p:any, key:string) => (
        <Post key={key} post={p} />
      ))}
    </div>
  )
}
