const express = require("express");
const {
  bookSlot,
  getBookedAppointments,
} = require("../controllers/bookingController");
const {
  validateBooking,
  validateGetBookings,
} = require("../validators/bookingValidators");
const { validateSlotId } = require("../validators/slotValidators");
const { validateDoctorId } = require("../validators/doctorValidators");

const router = express.Router();

// Book a slot
router.post("/slots/:slotId/book", validateSlotId, validateBooking, bookSlot);

// Get all booked appointments for a doctor
router.get(
  "/doctors/:doctorId/bookings",
  validateDoctorId,
  validateGetBookings,
  getBookedAppointments
);

module.exports = router;
