import React, { useEffect, useContext } from 'react'
import { AppContext } from '../../../store/Context';
import { useNavigate } from 'react-router-dom'
// toastify 
import { showToast } from '../../../components/Toastify/Trigger'
// formik and yup imports
import { useFormik } from 'formik'
import { CategorySchema } from '../../../utils/validations/yupSchemas/category';
import { registerCategory } from '../fetchApi';

const AddCategory = () => {

    const [appData, dispatch] = useContext(AppContext);
    let navigate = useNavigate();

    // formik hook 
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, resetForm } = useFormik({
        initialValues: {
            categoryName: ''
        },

        // yup schema
        validationSchema: CategorySchema,

        // submit handler
        onSubmit: async (values) => {
            try {
                // start loading
                dispatch({ type: 'loading', payload: true });

                let result = await registerCategory(values);

                if (result.status === 200) {
                    // Successfull operation, stop loading, show success toast and reset form
                    dispatch({ type: 'loading', payload: false });
                    showToast('success', result.data.message);
                    resetForm();
                }
                else {
                    dispatch({ type: 'loading', payload: false });
                    showToast('error', "Failed! Please try again.");
                }
            } catch (error) {
                // if some error occures,stop loading and notify user accordingly
                dispatch({ type: 'loading', payload: false });
                if (error.response.status === 405 || error.response.status === 406) { showToast('error', error.response.data.message) }
                else { showToast('error', error.message + " Please try again.") }
            }
        }
    });

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center w-[500px] py-8 bg-[#70707038] rounded-3xl">

                {/* header */}
                <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
                    <h1 className="uppercase font-semibold text-3xl text-white m-2 mb-4 tracking-widest">Add Category</h1>
                </div>
                <div className="flex flex-col justify-center items-center mt-10 md:mt-4 ">
                    {/* category name field */}
                    <div>
                        <input name='categoryName' type="text" placeholder="Category Name" value={values.categoryName} onChange={handleChange} onBlur={handleBlur}
                            className={`bg-gray-100 w-[350px] rounded-lg px-2 py-1 ${errors.categoryName && touched.categoryName ? 'border-red-500' : 'border-white'} border-4 outline-none  text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold`} />
                        <p className='my-1 h-6 text-red-500'> {errors.categoryName && touched.categoryName ? errors.categoryName : ''} </p>
                    </div>
                </div>
                {/* submit button */}
                <div className="text-center">
                    <button type='submit' disabled={isSubmitting} className="uppercase w-[350px] px-[50px] py-[7px] rounded-md text-white bg-blue-900 hover:bg-blue-800  font-medium ">Add</button>
                </div>
                {/* home page redirection */}
                <div className='text-white my-2 text-center'>
                    <button onClick={()=>{navigate('/categories')}} disabled={isSubmitting} className="uppercase w-[350px] px-[50px] py-[7px] rounded-md text-white bg-blue-900 hover:bg-blue-800  font-medium ">Back to Home</button>
                </div>
            </form>
        </>
    )
}

export default AddCategory