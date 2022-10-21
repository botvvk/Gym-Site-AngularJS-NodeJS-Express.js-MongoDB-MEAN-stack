//-----------------MODULES---------------------
//import express
const express= require('express');
//import morgan
const morgan = require('morgan');
//import mongoose
const mongoose = require('mongoose');
//import dotenv
const dotenv = require("dotenv");




//---------------------------------------------
const reservationRouter= require('./routes/reservationRoutes')
const userRouter= require('./routes/userRoutes');
const classRouter= require('./routes/classRoutes');

dotenv.config({ path : './config.env'});
const db =process.env.DATABASE;

mongoose.connect(db)
  .then(() =>{
    console.log('Connection to the database succeeded!');
  })
  .catch(() =>{
    console.log('connection to the database failed');
  })


const app= express();

/* CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use(express.json());


app.use(morgan('dev'));


app.use('/reservations',reservationRouter);
app.use('/users',userRouter);
app.use('/classes',classRouter);


module.exports = app;