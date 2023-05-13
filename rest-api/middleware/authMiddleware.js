//Auth Boilerplate by https://www.youtube.com/watch?v=enopDSs3DRw 

const jwt = require('jsonwebtoken');
const User = require("../model/User")

const authorize = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            //   get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next();
        }
        catch (error) {
            return res.status(401).json({
                status: "Failed",
                message: "Not Authorized",
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            status: "Failed",
            message: "Not Authorized , No token",
        });
    }


}

module.exports = { authorize }