import * as yup from 'yup'

export const signupSchema = yup.object().shape({
    username : yup.string().min(4 , "Atleast 4 characters required!").required("Username is Required!"),
    email : yup.string().email("Not a valid Email!").required("Email is Required!"),
})