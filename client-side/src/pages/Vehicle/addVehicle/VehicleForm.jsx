import React, { useState, useContext, useLayoutEffect, useEffect } from 'react'
import { AppContext } from '../../../store/Context';
import { useNavigate } from 'react-router-dom'
// toastify 
import { showToast } from '../../../components/Toastify/Trigger'
// formik and yup imports
import { useFormik } from 'formik'
import { VehicleSchema } from '../../../utils/validations/yupSchemas/vehicle';
import { registerVehicle } from '../fetchApi';
import { fetchAllCategories } from '../../Category/fetchApi';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';

const AddVehicle = () => {

    const [appData, dispatch] = useContext(AppContext);
    let navigate = useNavigate();

    // category options
    const [catOptions, setCatOptions] = useState([]);
    const [selectedCat, setSelectedCat] = useState({ value: '', label: 'Select Category' });

    // get categories
    const getCategories = async () => {
        let categories = await fetchAllCategories();
        // re-format 
        let options = categories.map((category) => {
            return { value: category._id, label: category.name }
        })
        setCatOptions(options);
        setSelectedCat(options[0]);
    }

    useLayoutEffect(() => {
        getCategories();
    }, []);

    // formik hook 
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting, resetForm } = useFormik({
        initialValues: {
            name: '',
            model: '',
            color: '',
            regNo: '',
        },

        // yup schema
        validationSchema: VehicleSchema,

        // submit handler
        onSubmit: async (values) => {

                try {
                    // start loading
                    dispatch({ type: 'loading', payload: true });

                    let result = await registerVehicle({ ...values, type: selectedCat.value });

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
            <form onSubmit={handleSubmit} className="flex flex-col justify-center w-[800px] py-8 bg-[#70707038] rounded-3xl">
                {/* header */}
                <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
                    <h1 className="uppercase font-semibold text-3xl text-white m-2 mb-4 tracking-widest">Add Vehicle</h1>
                </div>
                <div className="flex flex-col justify-center items-center mt-10 md:mt-4">
                    <div className='flex flex-row justify-between w-[90%]'>
                        {/* vehicle name field */}
                        <div>
                            <input name='name' type="text" placeholder="Vehicle Name" value={values.name} onChange={handleChange} onBlur={handleBlur}
                                className={`bg-gray-100 w-[350px] rounded-lg px-2 py-1 ${errors.name && touched.name ? 'border-red-500' : 'border-white'} border-4 outline-none  text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold`} />
                            <p className='my-1 h-6 text-red-500'> {errors.name && touched.name ? errors.name : ''} </p>
                        </div>
                        {/* vehicle type field */}
                        <div>
                            <Dropdown className='font-semibold w-[350px] rounded-2xl' name='type' options={catOptions} onChange={(e) => { setSelectedCat(e) }} value={selectedCat} placeholder="Select type" />
                            <p className='my-1 h-6 text-red-500'>  </p>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between w-[90%]'>
                        {/* vehicle color field */}
                        <div>
                            <input name='color' type="text" placeholder="Color" value={values.color} onChange={handleChange} onBlur={handleBlur}
                                className={`bg-gray-100 w-[350px] rounded-lg px-2 py-1 ${errors.color && touched.color ? 'border-red-500' : 'border-white'} border-4 outline-none  text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold`} />
                            <p className='my-1 h-6 text-red-500'> {errors.color && touched.color ? errors.color : ''} </p>
                        </div>
                        {/* vehicle Model field */}
                        <div>
                            <input name='model' type="text" placeholder="Model" value={values.model} onChange={handleChange} onBlur={handleBlur}
                                className={`bg-gray-100 w-[350px] rounded-lg px-2 py-1 ${errors.model && touched.model ? 'border-red-500' : 'border-white'} border-4 outline-none  text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold`} />
                            <p className='my-1 h-6 text-red-500'> {errors.model && touched.model ? errors.model : ''} </p>
                        </div>

                    </div>
                    <div className='flex flex-row justify-between w-[90%]'>
                        {/* vehicle regno field */}
                        <div>
                            <input name='regNo' type="text" placeholder="Reistration No" value={values.regNo} onChange={handleChange} onBlur={handleBlur}
                                className={`bg-gray-100 w-[350px] rounded-lg px-2 py-1 ${errors.regNo && touched.regNo ? 'border-red-500' : 'border-white'} border-4 outline-none  text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold`} />
                            <p className='my-1 h-6 text-red-500'> {errors.regNo && touched.regNo ? errors.regNo : ''} </p>
                        </div>
                    </div>

                </div>
                {/* submit button */}
                <div className="text-center">
                    <button type='submit' disabled={isSubmitting} className="uppercase w-[350px] px-[50px] py-[7px] rounded-md text-white bg-blue-900 hover:bg-blue-800  font-medium ">Add</button>
                </div>
                {/* home page redirection */}
                <div className='text-white my-2 text-center'>
                    <button onClick={() => { navigate('/vehicles') }} disabled={isSubmitting} className="uppercase w-[350px] px-[50px] py-[7px] rounded-md text-white bg-blue-900 hover:bg-blue-800  font-medium "> {'<'} Back</button>
                </div>
            </form>
        </>
    )
}

export default AddVehicle