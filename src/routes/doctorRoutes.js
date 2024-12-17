const express = require("express");
const doctorController = require("../controllers/doctorController");
const Joi = require("joi");

// -------------------- Validation Schemas --------------------
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

// -------------------- ROUTES --------------------
const router = express.Router();

router.post("/", validateDoctor, doctorController.createDoctor);
router.get("/", doctorController.getAllDoctors);
router.get("/:id", doctorController.getDoctorById);
router.patch("/:id", validateUpdateDoctor, doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;
