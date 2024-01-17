import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";
import 'tailwindcss/tailwind.css';

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className=" text-white py-12">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-teal-500">MyBlog</Link>
        <nav>
          {username && (
            <div className="flex items-center space-x-4">
              <Link to="/create" className="text-gray-300 hover:text-white">Create new post</Link>
              <button onClick={logout} className="text-gray-300 hover:text-white cursor-pointer">Logout ({username})</button>
            </div>
          )}
          {!username && (
            <div className="flex items-center space-x-4">
              <Link to="/login" className=" hover:text-white text-1xl font-bold text-teal-500">Login</Link>
              <Link to="/register" className="hover:text-white text-1xl font-bold text-teal-500">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
  }
