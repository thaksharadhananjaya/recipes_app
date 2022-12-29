const AuthModel = require('../models/auth_model');
const jwt = require('jsonwebtoken');



exports.signup = (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;

    const userModel = new AuthModel({
        firstName,
        lastName,
        email,
        password,
    });
    // Create user
    userModel.save((error, user) => {
        if (error) {
            if (error.code == 11000)
                return res.status(400).json({ message: 'Email already used!' })
            return res.status(400).json(error);
        }
        if (user) {
            const { firstName, lastName, email,  _id } = user;
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            return res.status(200).json({
                message: 'User create successful!',
                token,
                user: {
                    _id,
                    email,
                    firstName,
                    lastName
                }
            });
        }
    });
}


exports.signin = (req, res) => {

    AuthModel.findOne({ email: req.body.email }).exec((error, user) => {
        if (error) {
            return res.status(400).json(error);
        }
        if (user && user.authenticate(req.body.password)) {
            const { firstName, lastName, email,  _id } = user;
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            return res.status(200).json({
                success: true,
                token,
                user: {
                    _id,
                    email,
                    firstName,
                    lastName
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Authenticate failed !"
            });
        }
    });
}



