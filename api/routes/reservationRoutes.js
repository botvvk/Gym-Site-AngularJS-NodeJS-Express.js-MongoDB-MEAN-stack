
const express= require('express');

const fileUpload = require('../middleware/img-upload')

const reservationController=require(`${__dirname}/../controllers/reservationController`);

const routes = express.Router();



routes.route('/')
.get(reservationController.getAllReservations)
.post(reservationController.createReservation)
.patch( reservationController.updateReservationById)
.get(reservationController.getCountGroupRes)

routes.route('/count')
.get(reservationController.getCountGroupRes)

routes.route('/:id')
.get(reservationController.getAllReservationsById)
.delete(reservationController.deleteReservationById)
//.patch(fileUpload,reservationController.updateReservationById)
//.delete(reservationController.deleteReservationById)




module.exports= routes;
