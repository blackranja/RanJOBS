const Users = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');



const register = async (req, res) => {
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
    const user = await Users.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ user })
}
const login = async (req, res) => {
    res.send('login user');
}



module.exports = {
    register,
    login
} 