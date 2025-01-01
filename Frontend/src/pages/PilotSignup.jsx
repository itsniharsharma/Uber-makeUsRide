import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const PilotSignup = () => {

const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName:{
        firstName: firstName,
        lastName: lastName
      },

      email: email,
      password: password
    });

    console.log(userData);
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword
  }



  return (
    <div>
    <div className="p-7 py-5 px-5 flex flex-col justify-between h-screen">
            <div>

        <img
          className="w-16 mb-11 rounded-full"
          src="https://imgs.search.brave.com/cykZ27VRScThHwy8RGxrj9c1g3kAPOiXNfIPS4mdXeU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1FbWJs/ZW0tNzAweDM5NC5w/bmc"
          alt=""
        />
    
              <form
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
    
                <h3 className='text-base font-medium mb-2'> What's our Pilot's name</h3>
                <div className="flex gap-3 mb-5">
    
                <input
                  className="bg-[#eeeeee] w-0.75 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
    
                <input
                  className="bg-[#eeeeee] w-0.75 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
    
                </div>
    
                <h3 className="text-base font-medium mb-2">What's our Pilot's email</h3>
                <input
                  className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <h3 className="text-base font-medium mb-2">Enter Password</h3>
                <input
                  className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                  Sign Up
                </button>
              </form>
    
              <p className="text-center">
                Already have an account?
                <Link to="/pilot-login" className="text-blue-600">
                  {" "}
                  Login here{" "}
                </Link>
              </p>
            </div>
    
            <div>
              <p className="text-[10px] leading-tight">
              By proceeding, you consent to receive calls, WhatsApp messages, SMS notifications, promotional offers, and other communications related to your account, as well as updates regarding our services, policies, and terms.
              </p>
            </div>
          </div>
    </div>
  )
}

export default PilotSignup