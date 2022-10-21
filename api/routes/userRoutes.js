
//import express
const express= require('express');
//import landmarkController module
const userController=require(`${__dirname}/../controllers/userController`);

const routes = express.Router();

//User Routes
routes.route('/')
.get(userController.getAllUsers)
.post(userController.checkEmail,userController.createUser)


routes.route('/signup')
.post(userController.checkEmail,userController.createUser)

routes.route('/login')
.post(userController.checkEmailLogin,userController.userLogin)

routes.route('/:id')
.get(userController.getUserById)
.put(userController.checkAdmin,userController.updateUser)
.delete(userController.checkAdmin,userController.deleteUserById)

routes.route('/user/:email')
.get(userController.getUserByEmail)

//lets export our module!
module.exports= routes;