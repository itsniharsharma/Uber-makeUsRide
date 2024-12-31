import React, { useState } from "react";
import {Link} from 'react-router-dom'

const PilotLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pilotData, setPilotData] = useState({})

  const submitHandler=(e)=>{
    e.preventDefault();
    setPilotData({
      email: email,
      password: password
    })
    console.log(pilotData)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-11 rounded-full"
          src="https://imgs.search.brave.com/cykZ27VRScThHwy8RGxrj9c1g3kAPOiXNfIPS4mdXeU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1FbWJs/ZW0tNzAweDM5NC5w/bmc"
          alt=""
        />

        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e)=>{
               setEmail(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e)=>{
               setPassword(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>

        <p className='text-center'>New Here?<Link to='/pilot-signup' className='text-blue-600'> Register as Pilot </Link></p>

      </div>

      <div>
        <Link to='/login' className='bg-[#f3c164] flex flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  );
};

export default PilotLogin;

