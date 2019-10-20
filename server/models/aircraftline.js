const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aircraftlineSchema = new Schema({
  aircraftline: Number,
  acLineDate: Number,
  assignedTailNumber: String,
  version: Number
});

module.exports = mongoose.model('AircraftLine' , aircraftlineSchema);
