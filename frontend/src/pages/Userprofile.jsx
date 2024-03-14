import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { HiStatusOnline } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Userprofile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/singleUserDetail/' + id);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);


    // Function to format date
    const formatDate = (dateString) => {
      if (!dateString) return ''; // Handle case where dateString is empty or null
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return ''; // Handle invalid date
      
      return date.toISOString().split('T')[0]; // Extracts only the date part
    };
    


  return (
    <div className='shadow-xl shadow-gray-500 w-[98%] md:w-[60%] m-auto rounded-lg mt-4 p-4'>
      
        <>
          <span className='flex justify-center p-1'>
            <Avatar src='https://cdn-icons-png.flaticon.com/512/219/219970.png' sx={{ width: 50, height: 50 }} />
          </span>
          <p className='flex items-center gap-2 p-1'>
            <span className='font-bold'>Name:</span>
            <span className='flex items-center gap-1'>
              <span>{user.fname}</span>
              <span>{user.lname}</span>
            </span>
          </p>
          <p className='flex items-center gap-2 p-1'>
            <span className='flex items-center gap-1'>
              <span className='text-orange-500'><MdEmail /></span>
              <span className='font-bold'>Email:</span>
            </span>
            <span>{user.email ? user.email : 'N/A'}</span>
          </p>
          <p className='flex items-center gap-2 p-1'>
            <span className='flex items-center gap-1'>
              <span className='text-green-500'><FaPhoneSquareAlt /></span>
              <span className='font-bold'>Contact:</span>
            </span>
            <span>{user.number ? user.number : 'N/A'}</span>
          </p>
          <p className='flex items-center gap-2 p-1'>
            <span className='flex items-center gap-1'>
              <span className='text-black'><FaPersonCircleQuestion /></span>
              <span className='font-bold'>Gender:</span>
            </span>
            <span>{user.gender}</span>
          </p>
          <p className='flex items-center gap-2 p-1'>
            <span className='flex items-center gap-1'>
              <span className='text-red-500'><IoLocationSharp /></span>
              <span className='font-bold'>Location:</span>
            </span>
            <span>{user.location ? user.location : 'N/A'}</span>
          </p>
          <p className='flex items-center gap-2 p-1'>
            <span className='flex items-center gap-1'>
              <span className='text-blue-500'><HiStatusOnline /></span>
              <span className='font-bold'>Status:</span>
            </span>
            <span>{user.status}</span>
          </p>
          <p className='flex items-center gap-2 p-1'>
            <span className='flex items-center gap-1'>
              <span className='text-green-500'><MdOutlineDateRange /></span>
              <span className='font-bold'>Date created:</span>
            </span>
            <span>{formatDate(user.createdAt)}</span>
          </p>
          <p className='flex items-center gap-2 p-1'>
            <span className='flex items-center gap-1'>
              <span className='text-yellow-500'><MdOutlineDateRange /></span>
              <span className='font-bold'>Date updated:</span>
            </span>
            <span>{formatDate(user.updatedAt)}</span>
          </p>
        </>
   
    </div>
  );
}

export default Userprofile;
