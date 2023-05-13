import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../store/Context';
// toastify 
import { showToast } from '../../components/Toastify/Trigger'
// formik and yup imports
import { useFormik } from 'formik'
import { signupSchema } from '../../utils/validations/yupSchemas/signup';
// Icons
import UserIcon from './../../assets/icons/userIcon/'

const SignUp = () => {

  const navigate = useNavigate(); 
  const [appData] = useContext(AppContext);

  // formik hook 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      username: '',
      email: ''
    },

    // yup schema
    validationSchema: signupSchema,

    // submit handler
    onSubmit: async (values) => {
      try {
        let result = await axios.post(`${process.env.REACT_APP_API}/users/register-user`, values);
        if (result.status === 200) {
          // Successfull Signup
          showToast('success', "Signed Up Successfully!");
          // navigating user to login page
          navigate('/login');
        }
        else {
          showToast('error', "Signup Failed! Please try again.")
        }
      } catch (error) {
        // if some error occures, notify user accordingly
        if (error.response.status === 406 || error.response.status === 405){showToast('error',  error.response.data.message+" Please try again.")}
        else{showToast('error',  error.message+" Please try again.")}
      }
    }
  });

  // if user is logged in already and has a valid token, redirect to home page
  useEffect(() => {
    if (appData.loggedIn) {
      navigate('/');
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center w-[500px] py-8 bg-[#70707038] rounded-3xl">
        {/* user icon */}
        <UserIcon width={150}/>
        {/* sign up header */}
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
          <h1 className="uppercase font-semibold text-3xl text-white m-2 mb-4 tracking-widest">Sign Up</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-10 md:mt-4 ">
            {/* username field */}
          <div>
            <input name='username' type="text" placeholder="Username" value={values.username} onChange={handleChange} onBlur={handleBlur}
              className={`bg-gray-100 rounded-lg px-2 py-1 ${errors.username && touched.username ? 'border-red-500' : 'border-white'} border-4 outline-none  text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]`} />
            <p className='my-1 h-6 text-red-500'> {errors.username && touched.username ? errors.username : ''} </p>
          </div>
           {/* email field */}
          <div>
            <input name='email' type="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur}
              className={`bg-gray-100 rounded-lg px-2 py-1 ${errors.email && touched.email ? 'border-red-500' : 'border-white'} border-4 text-black outline-none placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]`} />
            <p className='my-1 h-6 text-red-500'> {errors.email && touched.email ? errors.email : ''} </p>
          </div>
        </div>
        {/* submit button */}
        <div className="text-center">
          <button type='submit' disabled={isSubmitting} className="uppercase px-[140px] py-[7px] rounded-md text-white bg-blue-900 hover:bg-blue-800  font-medium ">SignUp</button>
        </div>
        {/* signup page redirection */}
        <div className='text-white my-2 text-center'>
          Already have an account? <Link to={'/login'} className='text-blue-600 hover:text-blue-400 font-semibold mx-1'> Login </Link> instead.
        </div>
      </form>
    </>
  )
}

export default SignUp