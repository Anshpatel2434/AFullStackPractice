import  { useState } from 'react'
import { SingupInput } from '../zod-types'
import axios from 'axios'
// import {BACKEND_URL} from "../config"
import { useNavigate } from 'react-router-dom'
import React from 'react'


const Signup = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [postInputs, setpostInputs] = useState<SingupInput>({
    name: "",
    email: "",
    password: ""
    }
  );
  async function sendRequest(){
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, postInputs);
        const jwt = response.data;
        navigate(`/fetch/${postInputs.name}`)
        localStorage.setItem("token", jwt);
      } catch (error) {
        alert("Error while signing up");
      }
  }

  return (
    <div className=' w-screen h-screen flex flex-col justify-start items-center gap-10 bg-yellow-600'>
        <div>
        Enter Your Name: <input type="text" onChange={ (e) => {
          setpostInputs({
            ...postInputs,
            name: e.target.value
          })
        } }/>
        </div>
        <div>
        Enter Your Email: <input type="email"  onChange={ (e) => {
          setpostInputs({
            ...postInputs,
            email: e.target.value
          })
        } }/>
        </div>
        <div>
        Enter Your Password : <input type='password' onChange={ (e) => {
          setpostInputs({
            ...postInputs,
            password: e.target.value
          })
        } }/>
        </div>
        <button className=' animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white' onClick={sendRequest}>Submit</button>
    </div>
  )
}

export default Signup