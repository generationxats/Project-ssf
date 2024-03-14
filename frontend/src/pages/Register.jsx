import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [email,setEmail] = useState('');
  const [number,setNumber] = useState('');
  const [gender,setGender] = useState('');
  const [status,setStatus] = useState('active');
  const [location,setLocation] = useState('');



  //CODE TO REGISTER NEW USER...................
  const registerUser = async() =>  {
  try{
    const result = await axios.post('http://localhost:3001/register',{
      fname,
      lname,
      email,
      number,
      gender,
      status,
      location
    });
    navigate('/')
  }catch(err){
    console.log(err);
  }
  };



  return (
    <>
    
    <h1 className='text-center text-4xl font-semibold p-2'>Register New User</h1>
    
    <div className='shadow-xl shadow-gray-500 w-[98%] md:w-[85%] m-auto p-1'>

    <span className='flex justify-center p-2'><Avatar src='https://cdn-icons-png.flaticon.com/512/219/219970.png' sx={{width:60,height:60}} /></span>
    

    <div className='md:flex justify-between md:px-4 md:py-2'>
    <div className='grid'>
      <label className='p-[2px]'>First Name</label>
      <input className='p-[6px] border rounded-lg w-full md:w-[510px]' type='text' 
      value={fname} onChange={(e) => setFname(e.target.value)}
      placeholder='firstname...' />
    </div>
    <div className='grid'>
      <label className='p-[2px]'>Last Name</label>
      <input className='p-[6px] border rounded-lg w-full md:w-[510px]' type='text' 
      value={lname} onChange={(e) => setLname(e.target.value)}
      placeholder='lastname...' />
    </div>
    </div>


    <div className='md:flex justify-between md:px-4 md:py-2'>
    <div className='grid'>
      <label className='p-[2px]'>Email</label>
      <input className='p-[6px] border rounded-lg w-full md:w-[510px]' type='text' 
      value={email} onChange={(e) => setEmail(e.target.value)}
      placeholder='email...' />
    </div>
    <div className='grid'>
      <label className='p-[2px]'>Mobile number</label>
      <input className='p-[6px] border rounded-lg w-full md:w-[510px]' type='number' 
      value={number} onChange={(e) => setNumber(e.target.value)}
      placeholder='91+' />
    </div>
    </div>
   

    
    <div className='md:flex justify-between md:px-4 md:py-2'>
    <div className='grid'>
      <label className='p-[2px]'>Select gender</label>
      <span className='flex gap-2'>
      <input value="male"
      onChange={(e) => setGender(e.target.value)}
      type="radio" id="male" name="gender" />
       <label htmlFor="male">male</label>
      </span>
      <span className='flex gap-2'>
      <input  value="female"
       onChange={(e) => setGender(e.target.value)}
      type="radio" id="female" name="gender" />
      <label htmlFor="female">female</label>
      </span>
    </div>
    <div className='grid'>
      <label className='p-[2px]'>Select status</label>
      <select  className='border rounded-lg w-full md:w-[510px] p-1'
       value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>active</option>
        <option>inactive</option>
      </select>
    </div>
    </div>

    <div className='grid md:px-4 md:py-2'>
      <label className='p-[2px]'>Location</label>
      <input 
      value={location} onChange={(e) => setLocation(e.target.value)}
      className='p-[6px] border rounded-lg w-full md:w-[510px]' type='text' placeholder='location...' />
    </div>

    
    <button className='flex m-auto my-3 px-4 py-2 rounded-lg bg-green-700 hover:bg-green-600 text-white' onClick={registerUser}>Submit</button>


    </div>
    
    
    </>
  )
}

export default Register