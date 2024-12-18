const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const { isValidObjectID } = require("./generic");
const { daysMap } = require("../utils/dayUtils");

// -------------------- Validation Schemas --------------------
const createSlotsSchema = Joi.object({
  // start time is required and must be a valid ISO 8601 format time and should be in future
  start_time: Joi.date().iso().greater(new Date()).required().messages({
    "date.base": "start_time must be a valid date.",
    "date.format": "start_time must be in ISO 8601 format.",
    "date.greater": "start_time must be a future date and time.",
    "any.required": "start_time is required.",
  }),
  // end time should be greater than the start_time
  end_time: Joi.date()
    .iso()
    .required()
    .custom((value, helpers) => {
      const { start_time, duration } = helpers.state.ancestors[0]; // Get start_time and duration from the input

      if (!start_time)
        return helpers.message(
          "start_time is required before validating end_time."
        );

      const startTime = new Date(start_time);
      const minEndTime = new Date(startTime.getTime() + duration * 60 * 1000); // start_time + duration

      if (value < minEndTime) {
        return helpers.message(
          "end_time must be at least duration minutes after start_time."
        );
      }

      return value;
    })
    .messages({
      "date.base": "end_time must be a valid date.",
      "date.format": "end_time must be in ISO 8601 format.",
      "any.required": "end_time is required.",
    }),
  duration: Joi.number().valid(15, 30).required().messages({
    "any.required": "duration is required.",
  }),
  recurrence: Joi.object({
    type: Joi.string()
      .valid("daily", "weekly", "one-time")
      .required()
      .messages({
        "any.only": "recurrence.type must be 'daily', 'weekly', or 'one-time'.",
        "any.required": "recurrence.type is required.",
      }),
    days: Joi.array()
      .items(
        Joi.string().valid(
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        )
      )
      .when("type", { is: "weekly", then: Joi.required() }),
    end_date: Joi.date()
      .iso()
      .when("type", {
        is: Joi.string().valid("daily", "weekly"),
        then: Joi.required(),
      }),
  }).required(),
});

const getAvailableSlotsSchema = Joi.object({
  date: Joi.date()
    .iso()
    .custom((value, helpers) => {
      const inputDate = new Date(value).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);

      if (inputDate < today) {
        return helpers.message(
          "Available slots are only available for today or a future date."
        );
      }
      return value;
    })
    .messages({
      "date.base": "Date must be a valid date.",
      "date.format": "Date must be in ISO 8601 format.",
    }),
});

// -------------------- Middleware for Validation --------------------
exports.validateCreateSlots = (req, res, next) => {
  const { error } = createSlotsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.validateSlotId = (req, res, next) => {
  if (isValidObjectID(req.params?.slotId)) {
    return next();
  }
  return res.status(400).json({ message: "Slot not found with given slot Id" });
};

exports.validateGetAvailableSlots = (req, res, next) => {
  const { error } = getAvailableSlotsSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  } else {
    next();
  }
};
