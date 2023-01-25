const Users = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');



//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');



const register = async (req, res) => {
    const user = await Users.create({ ...req.body });
    const token = user.createJWT();

    //=============================================================================================
    /*
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = { name, email, password: hashedPassword }
    */
    //=================================================================================================
    //---------------------------------------------------------------------------
    /*const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('Please Provide name, email and password');
    }
    */
    //---------------------------------------------------------------------------



    //=====================================================================================================
    /*
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d', })
*/
    //==================================================================================================


    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please Provide email and password');

    }

    const user = await Users.findOne({ email });
    //compare password
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials101');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials202');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}



module.exports = {
    register,
    login
} 