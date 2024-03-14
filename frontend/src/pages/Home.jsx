import React, { useEffect, useState } from 'react';
import { IoAddSharp } from "react-icons/io5";
import {Link} from 'react-router-dom';
import { FaSort } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const [users,setUsers] = useState([]);
  const [sort,setSort] = useState(false);
  const [search,setSearch] = useState('');
  const [gender,setGender] = useState('all');
  const [status,setStatus] = useState('allactive');
  const [sorting,setSorting] = useState('new');
  const [page,setPage] = useState(1);
  const [pagecount,setPageCount] = useState(0);

  const sortList = () => {
    if(sort){
      setSort(false);
    }else{
      setSort(true);
    }
  }


  //CODE TO SHOW ALL DATA TO HOME PAGE..
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001?search=${search}&gender=${gender}&status=${status}&sorting=${sorting}&page=${page}`);
            
            setUsers(response.data.users);
            setPageCount(response.data.Pagination.pageCount)
        } catch (err) {
            console.log(err);
        }
    };
    fetchData();
}, [search,gender,status,sorting,page]);

  
  

  // CODE TO DELETE DATA..
  const handleDelete = async (id, fname, lname) => {
    if (window.confirm(`Are you sure you want to delete ${fname} ${lname}?`)) {
      try {
        const res = await axios.delete(`http://localhost:3001/deleteUser/${id}`);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
  

   // CODE TO DOWNLOAD DATA IN THE FORM OF CSV  ......
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + users.map(user => `${user.fname},${user.lname},${user.email},${user.number},${user.location},${user.gender},${user.status},${user.createdAt},${user.updatedAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
  }

  
  // PAGINATION LOGIC FOR PREVIOUS PAGE
  const handlePrevious = () => {
    setPage(() => {
      if(page === 1) return page;
      return page - 1
    })
  }


  // PAGINATION LOGIC FOR NEXT PAGE
   const handleNext = () => {
    setPage(() => {
      if(page === pagecount) return page;
      return page + 1
    })
   }
 



  return (
    <>
    
    <div className='w-[98%] md:w-[85%] m-auto p-1'>
      

    {/* THIS IS SEARCH BAR AND ADDUSER BUTTON */}
    <div className='flex justify-between py-4'>
     <div className='flex gap-2'>
      <input className='md:w-[300px] rounded-lg border p-1' type='text' 
       onChange={(e) => setSearch(e.target.value)}
      placeholder='search...' />
      <button className='bg-green-700 hover:bg-green-500 text-white px-2 py-1 rounded-lg'>search</button>
     </div> 
      <Link to='/register' className='flex gap-1 text-center items-center bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg'>
        <span><IoAddSharp/></span>
        <span>Add User</span>
      </Link>
    </div>   
    {/* SEARCH BAR AND ADDUSER BUTTON ENDS */}



    {/* FILTER SECTION STARTS HERE */}
    <div className='flex flex-wrap justify-between py-3'>
     <div>
    <button className='bg-green-700 hover:bg-green-600 rounded-lg text-white px-3 py-1' onClick={exportToCSV}>Export to cv</button>
    </div>
    <div className='text-center'>
      <span className='text-2xl font-semibold'>Filter By Gender</span>
      <span className='flex gap-2 mt-1'>
       <span className='flex gap-1'>
       <input type="radio" id="all" name="gender" value="all"
        onChange={(e) => setGender(e.target.value)}
       />
       <label htmlFor="all">All</label>
       </span>
       <span className='flex gap-1'>
       <input type="radio" id="male" name="gender" value="male"
        onChange={(e) => setGender(e.target.value)}
       />
       <label htmlFor="male">Male</label>
       </span>
       <span className='flex gap-1'>
       <input type="radio" id="female" name="gender" value="female"
        onChange={(e) => setGender(e.target.value)}
       />
       <label htmlFor="female">Female</label>
       </span>
      </span>
    </div>
    <div>
      <span className='text-2xl font-semibold'>Sort By Value</span>
      <span className='flex justify-center mt-2' onClick={sortList}><FaSort/></span>
      {
        sort && 
        <span className='grid bg-gray-100 p-2 rounded-lg fixed ml-10 w-24'>
        <span className='hover:bg-gray-200 p-1 rounded-lg' onClick={()=>{setSorting('new');sortList()}}>new</span>
        <span className='hover:bg-gray-200 p-1 rounded-lg' onClick={()=>{setSorting('old');sortList()}} >old</span>
        </span>
      }
    </div>
    <div className='text-center'>
      <span className='text-2xl font-semibold'>Filter By Status</span>
      <span className='flex gap-2 mt-1'>
       <span className='flex gap-1'>
       <input type="radio" id="allactive" name="status" value="allactive"
        onChange={(e) => setStatus(e.target.value)}
       />
       <label htmlFor="allactive">All</label>
       </span>
       <span className='flex gap-1'>
       <input type="radio" id="active" name="status" value="active" 
        onChange={(e) => setStatus(e.target.value)}
       />
       <label htmlFor="active">Active</label>
       </span>
       <span className='flex gap-1'>
       <input type="radio" id="inactive" name="status" value="inactive"
        onChange={(e) => setStatus(e.target.value)}
       />
       <label htmlFor="inactive">InActive</label>
       </span>
      </span>
    </div>
    </div>
    {/* FILTER SECTION ENDS HERE */}



    {/* TABLE STARTS FROM HERE  */}
     <div>
    {/* THIS IS TABLE HEADING STARTS  */}
    <div className='flex font-bold bg-black text-white p-1 rounded-lg'>
      <span className=' w-[50px] p-1 text-center'>S.No</span>
      <span className=' w-[300px] p-1 text-center'>FullName</span>
      <span className=' w-[400px] p-1 text-center'>Email</span>
      <span className=' w-[100px] p-1 text-center'>Gender</span>
      <span className=' w-[130px] p-1 text-center'>Status</span>
      <span className=' w-[130px] p-1 text-center'>Action</span>
    </div>
    {/* THIS IS TABLE HEADING ENDS  */}
    
    {/* THIS IS USERS DATA STARTS */}
    {users && users.length > 0 ? (
    users.map((user, index) => (
    <>
    <Link to={`/userprofile/${user._id}`} key={user._id}>
    <div className='flex p-1 rounded-lg border-b hover:bg-gray-100'>
      <span className='w-[50px] p-1 text-center'>{index + 1 + (page - 1) * 5}</span>
      <span className='w-[300px] p-1 md:text-center'>
        <span>{user.fname}</span>
        <span className='ml-1'>{user.lname}</span>
      </span>
      <span className='w-[400px] p-1 overflow-auto md:text-center'>{user.email}</span>
      <span className='w-[100px] p-1 text-center'>{user.gender}</span>
      <Link to={`/edit/${user._id}`} className={` ${user.status === 'active' ? 'bg-blue-600 rounded-lg text-white p-2 text-center' : 'bg-red-600 rounded-lg text-white p-2 text-center'}`}>
      <span className='flex items-center gap-1'>
      <span>
      {user.status}
      </span>
      </span>
      </Link>

      <span className='w-[130px] p-2 flex justify-center md:ml-8'>
        <span className='flex items-center gap-2 text-xl'>
          <Link to={`/edit/${user._id}`} className='text-blue-600'>
            <RiEdit2Fill/>
          </Link>
          <span onClick={(e) => handleDelete(user._id, user.fname,user.lname)} className='text-red-600 cursor-pointer'>
           <MdDelete />
          </span>
        </span>
      </span>
    </div>
    </Link>
    </>
  ))
) : (
  <p className='text-gray-500 text-4xl text-center my-5'>No user found - <span className='ml-1'>{search}</span></p>
)}

  
    {/* THIS IS USERS DATA ENDS */}

     {/* PAGINATION STARTS HERE */}
     {
      pagecount > 0 ? 
      <span className='flex float-right items-center my-2'>
      <span className='border p-2 cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 text-black' onClick={handlePrevious}><FaAngleLeft/></span>
      {
        Array(pagecount).fill(null).map((element, index) => {
          return(
            <>
                  <span className={`${page === index + 1 ? 'border px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-400  text-white cursor-pointer' : 'border px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200  text-black cursor-pointer' }`} onClick={()=>setPage(index+1)}>{index+1}</span>
            </>
          )
        })
      }
      <span className='border p-2 cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 text-black' onClick={handleNext}><FaAngleRight/></span>
      </span>
      :
      ''
     }
   
      {/* PAGINATION ENDS  */}

     </div>
    {/* TABLE STARTS FROM ENDS  */}


    </div>
  
    </>
  )
}

export default Home
















