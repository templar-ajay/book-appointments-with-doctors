const express = require("express");
const {
  createSlots,
  getAvailableSlots,
  getSlotById,
} = require("../controllers/slotController");
const {
  validateCreateSlots,
  validateGetAvailableSlots,
  validateSlotId,
} = require("../validators/slotValidators");
const { validateDoctorId } = require("../validators/doctorValidators");

const router = express.Router();

router.post(
  "/doctors/:doctorId/slots",
  validateDoctorId,
  validateCreateSlots,
  createSlots
);

router.get(
  "/doctors/:doctorId/available_slots",
  validateDoctorId,
  validateGetAvailableSlots,
  getAvailableSlots
);

router.get("/slots/:slotId", validateSlotId, getSlotById);

module.exports = router;
