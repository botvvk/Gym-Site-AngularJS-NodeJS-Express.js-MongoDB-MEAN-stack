const mongoose = require("mongoose");

const reservationsSchema = new mongoose.Schema({
    id: String,
    userId: String,
    program: String,
    date:  String,
    day:  String,
    time: String,
    confirmed: String
})

const Reservation = mongoose.model("Reservation",reservationsSchema);

module.exports = Reservation;
