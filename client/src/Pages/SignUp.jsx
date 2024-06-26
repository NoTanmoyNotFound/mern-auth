import { useState } from 'react';
import {Link} from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }
  // console.log(formData);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json(); 
    console.log(data);
  };
   
  
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1  className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit ={handleSubmit} className='flex flex-col gap-4' >
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange}/>
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg 'onChange={handleChange} />
        <button className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 '>Sign Up</button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500 font-semibold cursor-pointer'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
