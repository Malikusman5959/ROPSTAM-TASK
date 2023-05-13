import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../store/Context';
// toastify 
import { showToast } from '../../components/Toastify/Trigger'
// formik and yup imports
import { useFormik } from 'formik'
import { loginSchema } from '../../utils/validations/yupSchemas/login';
// Icons
import UserIcon from '../../assets/icons/userIcon'
import { isAuthorized } from '../../utils/validations/validateUser';

const Login = () => {

  const navigate = useNavigate();

  // formik hook 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    // yup schema
    validationSchema: loginSchema,

    // submit handler
    onSubmit: async (values) => {
      try {
        let result = await axios.post(`${process.env.REACT_APP_API}/users/login`, values);
        if (result.status === 200) {
          // Successfull Signin
          showToast('success', "Signed in Successfully!");
          // saving token in localstorage, updating app's global login status and finally navigating user to homepage
          localStorage.setItem('token' , result.data.user.token);
          navigate('/');
        }
        else {
          showToast('error', "Sign in Failed! Please try again.")
        }
      } catch (error) {
        // if some error occures, notify user accordingly
        console.log(error.response.status);
        if (error.response.status === 406 || error.response.status === 405){showToast('error',  error.response.data.message+" Please try again.")}
        else{showToast('error',  error.message+" Please try again.")}
      }
    }
  });

  // if user is logged in already and has a valid token, redirect to home page
  useEffect(() => {
    if (isAuthorized()) {
      // already have a valid session
      navigate('/');
      showToast('success' , "You are already logged in!");
    }
  },[])

  return (
    <>
      <form onSubmit={handleSubmit} className=" flex flex-col justify-center w-[500px] py-8 bg-[#70707038] rounded-3xl">
        {/* user icon */}
        <UserIcon width={150}/>
        {/* sign in header */}
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
          <h1 className="uppercase font-semibold text-3xl text-white m-2 mb-4 tracking-widest">Sign In</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-10 md:mt-4 ">
            {/* email field */}
          <div>
            <input name='email' type="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur}
              className={`bg-gray-100 rounded-lg px-2 py-1 ${errors.email && touched.email ? 'border-red-500' : 'border-white'} border-4 outline-none  text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]`} />
            <p className='my-1 h-6 text-red-500'> {errors.email && touched.email ? errors.email : ''} </p>
          </div>
           {/* password field */}
          <div>
            <input name='password' type="password" placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur}
              className={`bg-gray-100 rounded-lg px-2 py-1 ${errors.password && touched.password ? 'border-red-500' : 'border-white'} border-4 text-black outline-none placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]`} />
            <p className='my-1 h-6 text-red-500'> {errors.password && touched.password ? errors.password : ''} </p>
          </div>
        </div>
        {/* submit button */}
        <div className="text-center">
          <button type='submit' disabled={isSubmitting} className="uppercase px-[147px] py-[7px] rounded-md text-white bg-blue-900 hover:bg-blue-800  font-medium ">login</button>
        </div>
        {/* signup page redirection */}
        <div className='text-white my-2 text-center'>
          Don't have an account? <Link to={'/signup'} className='text-blue-600 hover:text-blue-400 font-semibold mx-1'> Signup </Link> instead.
        </div>
      </form>
    </>
  )
}

export default Login