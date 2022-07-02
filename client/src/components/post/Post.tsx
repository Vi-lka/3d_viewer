import "./post.css";
import Postimg from "./Post-img.jpg"
import { Link } from "react-router-dom";

export default function Post({post}: {post:any}, {key}: {key:any}) {
  const publicFoulder = "http://localhost:5000/uploads/"
  return (
    <div className="post">
      {post.model && (
        <Link className="link" to={`/post/${post._id}`}>
          <img className="postImg" src={publicFoulder + post.screenshot} alt="" />
        </Link>
      )}


      <div className="postInfo">
          <h2 className="postTitle">
            <Link className="link" to={`/post/${post._id}`}>
              {post.title}
            </Link>
          </h2>
          {/* <div className="postCats">
            {post.categories.map((catname:string, key:string) => (
              <Link key={key} className="link postCat" to={`/gallery/?cat=${catname}`}>
                <span>{catname}</span>
              </Link>
            ))}
          </div> */}
      </div>
    </div>
  )
}
