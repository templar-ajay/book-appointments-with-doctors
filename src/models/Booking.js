const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  slot_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
    required: true,
  },
  patient_name: { type: String, required: true },
  reason: { type: String, required: true },
  booking_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
