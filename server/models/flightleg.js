const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightlegSchema = new Schema({
  flightNumber: Number,
  scheduleDate: Number,
  flightSuffix: String,
  assignedTailNumber: String,
  flightLegType: String,
  aircraftlineId: String
});

module.exports = mongoose.model('FlightLeg' , flightlegSchema);
