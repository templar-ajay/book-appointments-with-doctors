const Joi = require("joi");

const bookSlotSchema = Joi.object({
  patient_name: Joi.string().trim().min(3).required().messages({
    "string.base": "patient_name must be a string.",
    "string.min": "patient_name must be at least 3 characters.",
    "any.required": "patient_name is required.",
  }),
  reason: Joi.string().trim().min(5).required().messages({
    "string.base": "reason must be a string.",
    "string.min": "reason must be at least 5 characters.",
    "any.required": "reason is required.",
  }),
});

const getBookingsSchema = Joi.object({
  start_date: Joi.date()
    .iso()
    .messages({ "date.format": "start_date must be in ISO 8601 format." }),

  end_date: Joi.date()
    .iso()
    .messages({ "date.format": "end_date must be in ISO 8601 format." }),
}).custom((value, helpers) => {
  const { start_date, end_date } = value;

  if (start_date && end_date && start_date > end_date) {
    return helpers.message(
      "end_date must be on the same day or in future, relative to the start_date."
    );
  }
  return value;
});

const validateBooking = (req, res, next) => {
  const { error } = bookSlotSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateGetBookings = (req, res, next) => {
  const { error } = getBookingsSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateBooking, validateGetBookings };
