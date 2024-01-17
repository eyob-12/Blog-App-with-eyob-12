import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";
import loginImage from '../login.jpg';
export default function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
  <div className="hidden sm:block">
    <img className="w-full h-full object-cover" src={loginImage} alt="" />
  </div>
  
  <div className="bg-gray-800 flex flex-col justify-center">
    <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
      onSubmit={login}
    >
      <h1 className="text-4xl dark:text-white font-bold text-center mb-6">SIGN IN</h1>

      <div className="flex flex-col text-gray-400 mb-4">
        <label>User Name</label>
        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text"
           value={username}
           onChange={ev => setUsername(ev.target.value)}
        />
      </div>

      <div className="flex flex-col text-gray-400 mb-4">
        <label>Password</label>
        <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password"
           value={password}
           onChange={ev => setPassword(ev.target.value)}
        />
      </div>

      <div className="flex justify-between items-center text-gray-400 mb-4">
        <label className="flex items-center">
          <input className="mr-1" type="checkbox" /> Remember Me
        </label>
        <p className="text-blue-500 cursor-pointer">Forgot Password</p>
      </div>

      <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg">
        Sign In
      </button>
    </form>
  </div>
</div>

      
    
      </>
  );
}