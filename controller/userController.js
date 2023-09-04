const shortUrlCollection= require('../models/shortUrlModel')
const userCollection= require('../models/userModel')
const jwt= require('jsonwebtoken')
require(`dotenv`).config()

const homePage = (req,res)=>{
    res.send('Hello, World!');
}

// const SaveUrl=async (req,res)=>{
//         console.log('hello iam save ---- backend');
//         console.log('req.body ----', req.body);
//         try {
//           const fullUrl = req.body.fullUrl;
//           const ShortUrl = req.body.shortenedURL;
//           await shortUrlCollection.create({full:fullUrl,short:ShortUrl});
      
//           res.status(201).json({ message: 'Data saved successfully' });
//         } catch (error) {
//           console.error('Error saving data:', error);
//           res.status(500).json({ error: 'Internal server error' });
//         }
// }

const SaveUrl = async (req, res) => {
  console.log('hello iam save ---- backend');
  console.log('req.body ----', req.body);

  try {
    const userId = req.UserId;
    const full = req.body.fullUrl;
    const short = req.body.shortenedURL;
    let user = await shortUrlCollection.findOne({ userId });

    if (!user) {
      user = new shortUrlCollection({ userId });
    }
    user.Url.push({ full, short });
    await user.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const userLogin = async (req, res) => {
    try {
        console.log(req.body)
        const { email, username } = req.body;   
        let user = await userCollection.findOne({ email: email });
        if(!user){
            user = await userCollection.create({ email:email,username:username }); 
        }         
        // const token = jwt.sign({ id: user._id ,name:user.username,email:user.email },process.env.USER_TOKEN_SECRET, { expiresIn: '3d' });
        const token = jwt.sign({ id: user._id ,name:user.username,email:user.email },'key', { expiresIn: '3d' });
        res.json({token, user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const userSignup = async (req, res) => {
  try {
  let {email,username} = req.body;
  userdata = {
    username: username,
    email: email,
  }
  const checkusername = await userCollection.find({ email: email });
  
  if (checkusername.length > 0) {
    const errors = { email: 'email already exists' };
    return res.json({ errors, created: false });
  }
   
  } catch (error) {
    return res.status(500).json({error, message: "Internal server error" });
  }
};


const getUrl = async (req, res) => {
  try {
      const userId = req.params.id
      const response = await shortUrlCollection.findById({ _id: userId })
      console(response)
      res.status(200).json({ Url:response.Url.reverse()})
  } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
    homePage,
    SaveUrl,
    userSignup,
    userLogin,
    getUrl
}