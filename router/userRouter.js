const express= require('express')
const userRouter = express.Router();
const userController= require('../controller/userController')
const urlController=require('../controller/urlController')
const userJwt=require('../middleware/jwtUser')


userRouter.get('/getUrl',userJwt,urlController.getUrl)
userRouter.post('/save',userJwt,urlController.SaveUrl)

userRouter.post('/userRegister', userController.userLogin)


module.exports = userRouter;