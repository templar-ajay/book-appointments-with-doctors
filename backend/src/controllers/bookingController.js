const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// Book a Slot
exports.bookSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const { patient_name, reason } = req.body;

    // Check if the slot exists and is available
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }
    if (slot.status === "booked") {
      return res.status(409).json({ message: "Slot is already booked." });
    }

    // Mark the slot as booked
    slot.status = "booked";
    await slot.save();

    // Create a booking
    const booking = new Booking({
      slot_id: slotId,
      patient_name,
      reason,
    });
    await booking.save();

    res.status(201).json({
      message: "Slot booked successfully.",
      booking,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

// Show All Booked Appointments
exports.getBookedAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { start_date, end_date } = req.query;

    const dateFilter = {};
    if (start_date || end_date) {
      dateFilter.start_time = {};
    }
    if (start_date) {
      dateFilter.start_time.$gte = new Date(start_date);
    }
    if (end_date) {
      const endDate = new Date(end_date);
      endDate.setUTCHours(23, 59, 59, 999);
      dateFilter.start_time.$lte = endDate;
    }

    const bookings = await Booking.find()
      .populate({
        path: "slot_id",
        match: {
          doctor_id: doctorId,
          ...dateFilter,
        },
      })
      .exec();

    const filteredBookings = bookings.filter((b) => b.slot_id !== null);

    res.status(200).json({ bookings: filteredBookings });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};
