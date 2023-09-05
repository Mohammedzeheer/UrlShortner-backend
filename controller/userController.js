const userCollection= require('../models/userModel')
const jwt= require('jsonwebtoken')
require(`dotenv`).config()

const userLogin = async (req, res) => {
    try {
        console.log(`iam login ------`)
        const { email, username } = req.body;   
        let user = await userCollection.findOne({ email: email });
        if(!user){
            user = await userCollection.create({ email:email,username:username }); 
        }         
        const token = jwt.sign({ id: user._id ,name:user.username,email:user.email },process.env.USER_TOKEN_SECRET, { expiresIn: '3d' });
        res.json({token, user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { userLogin,}






