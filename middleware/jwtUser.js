const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtUser= (req, res, next) => {
  console.log(`hello iam jwt user--------------`)
  const jwttoken = req.headers.authorization;
  console.log(jwttoken,`-----------------------toe=ken jwt`)
  let token = jwttoken.replace(/"/g, ''); 
  if (token) {
    try {
      const user = jwt.verify(token, process.env.USER_TOKEN_SECRET);
      // let ekeysd= process.env.USER_TOKEN_SECRET
      // const user = jwt.verify(token,`key`);
      console.log(user)
      req.UserId=user.id
      req.email=user.email
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Token missing' });
  }
};

module.exports=jwtUser;