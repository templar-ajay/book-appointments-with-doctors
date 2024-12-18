const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
});

module.exports = mongoose.model("Slot", slotSchema);
