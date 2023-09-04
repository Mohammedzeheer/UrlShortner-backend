const express= require('express')
const userRouter = express.Router();
const userController= require('../controller/userController')
const userJwt=require('../middleware/jwtUser')


userRouter.get(`/`,userController.homePage)
userRouter.post('/save',userJwt,userController.SaveUrl)
userRouter.post('/userRegister', userController.userLogin)
userRouter.get('/getUrl',userJwt,userController.getUrl)


module.exports = userRouter;