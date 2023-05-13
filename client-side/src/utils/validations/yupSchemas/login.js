import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string('email must be a string').email('Not a valid email').required('Email is required'),
    password: yup.string().min(8 , "Password must be atleast 8 characters long").required("Password is required!")
})