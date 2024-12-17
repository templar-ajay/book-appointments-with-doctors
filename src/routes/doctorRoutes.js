const express = require("express");
const {
  createDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const {
  validateDoctor,
  validateDoctorId,
  validateUpdateDoctor,
} = require("../validators/doctorValidators");

const router = express.Router();

router.post("/", validateDoctor, createDoctor);
router.get("/", getAllDoctors);
router.get("/:doctorId", validateDoctorId, getDoctorById);
router.patch(
  "/:doctorId",
  validateDoctorId,
  validateUpdateDoctor,
  updateDoctor
);
router.delete("/:doctorId", validateDoctorId, deleteDoctor);

module.exports = router;
