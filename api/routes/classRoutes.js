
//import express
const express= require('express');
//import landmarkController module
const classController=require(`${__dirname}/../controllers/classController`);

const routes = express.Router();

//Class Routes
routes.route('/')
.get(classController.getAllClasses)
.post(classController.createClass)



routes.route('/:id')
.get(classController.getClassById)
.put(classController.updateClassById)
.delete(classController.deleteClassById)

//lets export our module!
module.exports= routes;