const express = require("express");
const Doctor = require("../models/Doctor");
const Joi = require("joi");

const router = express.Router();

// -------------------- Validation Schema --------------------
const createDoctorSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
});

const updateDoctorSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  first_name: Joi.string().min(2).max(50),
  last_name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
})
  .min(1)
  .messages({
    "object.min":
      "At least one valid field must be provided. Valid Fields are: username, first_name, last_name, and email",
  });

// -------------------- Middleware for Validation --------------------
const validateDoctor = (req, res, next) => {
  const { error } = createDoctorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUpdateDoctor = (req, res, next) => {
  const { error } = updateDoctorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// -------------------- CREATE DOCTOR --------------------
router.post("/", validateDoctor, async (req, res) => {
  try {
    const existingDoctor = await Doctor.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existingDoctor) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    const doctor = new Doctor(req.body);
    await doctor.save();

    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// -------------------- GET ALL DOCTORS --------------------
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// -------------------- GET SINGLE DOCTOR BY ID --------------------
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// -------------------- UPDATE DOCTOR BY ID --------------------
router.patch("/:id", validateUpdateDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// -------------------- DELETE DOCTOR BY ID --------------------
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
