const yup = require("yup");

exports.NewUserSchema = yup.object({
  username: yup.string('username must be a string').min(4 , 'Username must be atleast 4 characters long').max(32 , "Username cannot be more than 32 characters").required("Username is required"),
  email: yup.string('email must be a string').email('Not a valid email').required('Email is required'),
});

exports.ExistingUserSchema = yup.object({
  email: yup.string('email must be a string').email('Not a valid email').required('Email is required'),
  password: yup.string('email must be a string').min(8 , 'Password must be atleast 8 characters long').max(32 , "Password cannot be more than 32 characters").required('Password is required'),
});
