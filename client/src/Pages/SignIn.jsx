import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading , error} = useSelector((state) => state.user);

  const navigate = useNavigate();

const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }
  // console.log(formData);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); 
      // console.log(data);
      dispatch(signInSuccess(data.data));
      if(data.success === false){
        dispatch(signInFailure(error));
        return;
      };
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  };
   
  
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1  className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit ={handleSubmit} className='flex flex-col gap-4' >
        
        <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg 'onChange={handleChange} />
        <button disabled={loading} className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 '>{loading ? "Loading..." : "Sign In"}</button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500 font-semibold cursor-pointer'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong"}</p>
    </div>
  )
}

export default SignIn
