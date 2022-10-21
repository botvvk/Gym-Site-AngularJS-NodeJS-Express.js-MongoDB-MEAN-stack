const Reservation = require('../models/reservationModel.js')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'epicgymworkout@gmail.com',
    pass: 'Epicgym12345'
  }
});


exports.createReservation = async (req,res)=>{
    console.log(req.body)
    try{
        const newReservation = new Reservation({
            userId:  req.body.userId,
            program: req.body.program,
            date:    req.body.date,
            day:    req.body.day,
            time:    req.body.time,
            confirmed: req.body.confirmed
        });
          
        
        await newReservation.save();
        
        const mailOptions = {
            from: 'epicgymworkout@gmail.com',
            to: req.body.useremail,
            subject: 'Reservation',
            text: 'You made a reservation for '+req.body.date+ ',' + req.body.day + " at " +req.body.time
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.status(200).json({
            status: 'success',
            data: {
                result:newReservation
            }
        });
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message: err
        });
    };
};

exports.getAllReservations = (req, res, next) => {
    const reservationQuery = Reservation.find();
    let fetchedReservations;
    reservationQuery
      .then(documents => {
        fetchedReservations = documents;
        return Reservation.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Reservations fetched successfully!",
          reservations: fetchedReservations,
          maxReservations: count
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching reservations failed!"
        });
      });
  }

  exports.getCountGroupRes = (req, res, next) => {
    const reservationQuery = Reservation.find();
    let fetchedReservations;
    reservationQuery
      .then(documents => {
        fetchedReservations = documents;
        return Reservation.aggregate([
          {
            $group:{
               _id:{program:"$program",date:"$date",time:"$time"},
               count:{$sum:1}
            }
          }
          ])
      })
      .then(count => {
        res.status(200).json({
          message: "Counts fetched successfully!",
          counts: count
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching reservations failed!"
        });
      });
  }








exports.getAllReservationsById = (req, res, next) => {
const reservationQuery = Reservation.find({userId : req.params.id});
let fetchedReservations;
reservationQuery
    .then(documents => {
     console.log(documents);
    fetchedReservations = documents;
    return Reservation.count();
    })
    .then(count => {
    res.status(200).json({
        message: "Reservations fetched successfully!",
        reservations: fetchedReservations,
        maxReservations: count
    });
    })
    .catch(error => {
    res.status(500).json({
        message: "Fetching reservations failed!"
    });
    });
}


exports.updateReservationById = async (req,res)=>{
    try{
        console.log( req.body.confirmed)
        console.log( req.body.useremail)
        if ( req.body.confirmed == "NO"){
            console.log("ia m here casue i am not conf")
            const reservations = await Reservation.findOneAndUpdate({_id: req.body.id},{
                confirmed: "YES"
            });
            const mailOptions = {
                from: 'epicgymworkout@gmail.com',
                to: req.body.useremail,
                subject: 'Confirmation Status',
                text: 'Confirmation statues of your reservation has changed'
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            
            res.status(200).json({
                status:"success",
                data: {
                    reservations
                }
            });
            
        }
        else{
            const reservations = await Reservation.findOneAndUpdate({_id: req.body.id},{
                confirmed: "NO"
            });
            const mailOptions = {
                from: 'epicgymworkout@gmail.com',
                to: req.body.useremail,
                subject: 'Confirmation Status',
                text: 'Confirmation statues of your reservation has changed'
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            
            res.status(200).json({
                status:"success",
                data: {
                    reservations
                }
            });

        };
        

    } catch (err) {
        res.status(404).json({
            status:'fail',
            message: err
        });
    }






};


exports.deleteReservationById =  async (req,res)=>{
    try{
        await Reservation.findOneAndDelete({_id: req.params.id});
        
        res.status(204).json({
            status:"success",
            data: null
        });

    } catch (err) {
        res.status(404).json({
            status:'fail',
            message: err
        });
    }
};


