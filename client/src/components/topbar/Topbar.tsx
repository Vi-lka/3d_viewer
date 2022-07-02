import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"})
    window.location.replace("/login")
  }
  return (
    <nav className='top'>
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to={"/"}>Главная</Link>
          </li>
          <li className="topListItem">
            <Link className="link" to={"/gallery"}>Галерея</Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "Выход"}
          </li>
        </ul>
    </nav>
  )
}
