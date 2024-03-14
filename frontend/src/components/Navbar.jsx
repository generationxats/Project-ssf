import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    
    <div className='bg-black text-white flex items-center p-3 sticky top-0'>
      <Link to='/' className='m-auto text-2xl font-bold'>Ragnarok</Link>
      <Link to='/'>Home</Link>
    </div>
    
    
    </>
  )
}

export default Navbar