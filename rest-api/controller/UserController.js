const User = require("../model/User");
const Category = require("../model/Category");
const Vehicle = require("../model/Vehicle");
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');

// generate jwt token
const generateToken = (userid) => {
  // create jwt token
  let token = jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token
}

// get all users
exports.getAllUsers = async function (req, res) {

  User.find().then((values) => {
    // successful
    return res.status(200).json({
      status: "Success",
      message: "Users fetched successfully",
      Users: values
    });
  }).catch((err) => {
    return res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  });
};

exports.registerUser = async function (req, res) {

  try {
    // both fields are already validated through a middleware in the router
    const { username, email } = req.body

    // check if the user already exists
    let userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(406).json({
        status: "Failed",
        message: "User already exists"
      });
    }

    // create a new random 8-digit password
    let randomPassword = Math.random().toString().slice(2, 10);

    // generate a new user record
    var user = new User(
      {
        username: username,
        email: email,
        password: randomPassword
      }
    );
    user.save(function (err, newUser) {
      if (err) {
        return res.status(400).json({
          status: "failed",
          err: err
        });
      }
      else {
        // send the newly registered user a welcome email along with the login credentials.
        let emailStatus = sendEmail(newUser.email, newUser.password);
        // return success message
        return res.status(200).json({
          status: 'success',
          message: "User Registered successfully",
          data: {
            user: {
              _id: newUser._id,
              username: newUser.username,
              email: newUser.email,
            },
            emailSent: emailStatus
          },
        });
      }
    });

  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: e,
    });
  }
};


exports.login = async function (req, res) {

  try {
    // both fields are already validated through a middleware in the router
    const { email, password } = req.body

    // check if user exists in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(405).json({
        status: "Failed",
        message: "User isn't registered",
      });
    }

    else {
      // check if password is correct
      if (password === user.password) {

        // successful login
        return res.status(200).json({
          status: "Success",
          message: "Logged in successfully",
          user: {
            ...user._doc,
            token: generateToken(user._id)
          }
        });
      }
      else {
        return res.status(406).json({
          status: "Failed",
          message: "Incorrect Password!",
        });
      }
    }
  } catch (e) {
    return res.status(400).json({
      status: "Failed",
      message: e,
    });
  }
};


// get stats
exports.getStats = async function (req, res) {

    // get categories promise
    const categoriesP = Category.find();
    // get vehicles promise
    const vehiclesP = Vehicle.find();
    // get users promise
    const usersP = User.find();

    Promise.all([categoriesP, vehiclesP, usersP]).then((values) => {
      // successful
      return res.status(200).json({
        status: "Success",
        message: "Stats fetched successfully",
        stats: {
          categories : values[0].length,
          vehicles : values[1].length,
          users : values[2].length,
        }
      });
    }).catch((err) => {
      return res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    });
};


const sendEmail = async (email, data) => {

  console.log(data)
  //transporter construction
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID, // ethereal user
      pass: process.env.EMAIL_PASS, // ethereal password
    },
    tls: {rejectUnauthorized: false}
  });

  const msg = {
    from: 'davidpete1870@gmail.com', // sender address
    to: `${email}`, //receiver
    subject: "ROPSTAM: Welcome to your New Account", // Subject line
    text: `Hello, 
    
    Welcome to the app. Here's your password: 
    
    ${data}
    
    Regards,
    David`, // plain text body
  }

  // send mail with defined transport object
  const info = await transporter.sendMail(msg,
    (error, info) => {
      if (error) {
        // email failed to send
        return false
      }
    });
  // email sent
  return true;
}



