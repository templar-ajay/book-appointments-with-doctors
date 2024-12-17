const Slot = require("../models/Slot");
const Doctor = require("../models/Doctor");
const { CustomError } = require("../errors/CustomErrors");
const { isSlotOverlapping } = require("../utils/slotUtils");
const { daysMap, getKeyByValue } = require("../utils/dayUtils");

// -------------------- CREATE SLOTS --------------------
exports.createSlots = async (req, res) => {
  try {
    const { start_time, end_time, duration, recurrence } = req.body;
    const { doctorId } = req.params;

    // Validate input data
    if (!start_time || !end_time || !duration || !recurrence) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    const slots = [];
    const slotDuration = duration * 60 * 1000; // Convert duration to milliseconds

    // Function to generate slots
    const validateAndGenerateSlots = async (
      currentStartTime,
      currentEndTime
    ) => {
      let time = new Date(currentStartTime);

      while (time < currentEndTime) {
        const slotStartTime = new Date(time);
        const slotEndTime = new Date(time.getTime() + slotDuration);

        // Stop if slotEndTime exceeds the specified currentEndTime
        if (slotEndTime > currentEndTime) {
          break;
        }

        // Check for overlap
        if (await isSlotOverlapping({ doctorId, slotStartTime, slotEndTime })) {
          throw new CustomError(
            `Overlapping slot detected for time range ${slotStartTime.toISOString()} - ${slotEndTime.toISOString()}`,
            409
          );
        }

        // Push slot if no overlap and within the allowed time range
        slots.push({
          doctor_id: doctorId,
          start_time: slotStartTime,
          end_time: slotEndTime,
          status: "available",
        });

        time = new Date(time.getTime() + slotDuration);
      }
    };

    // Generate slots based on recurrence type
    const generateSlotsByRecurrence = async () => {
      const startDate = new Date(start_time);
      const endDate = new Date(end_time);
      const recurrenceEndDate = new Date(recurrence.end_date);
      recurrenceEndDate.setHours(23, 59, 59, 999); // Set to end of the day

      if (recurrenceEndDate < startDate) {
        throw new CustomError(
          "end_date should be the same day or a future date with respect to start_time",
          400
        );
      }

      if (recurrence.type === "one-time") {
        await validateAndGenerateSlots(startDate, endDate);
      } else if (recurrence.type === "daily") {
        let currentDate = new Date(startDate);

        while (currentDate <= recurrenceEndDate) {
          await validateAndGenerateSlots(
            currentDate,
            new Date(currentDate.getTime() + (endDate - startDate))
          );
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else if (recurrence.type === "weekly") {
        const selectedDays = recurrence.days.map((day) => daysMap[day]);
        let currentDate = new Date(startDate);

        validWeekDays = [];

        while (currentDate <= recurrenceEndDate) {
          // Check if the current day is one of the selected days
          if (selectedDays.includes(currentDate.getDay())) {
            await validateAndGenerateSlots(
              currentDate,
              new Date(currentDate.getTime() + (endDate - startDate))
            );
          } else {
            validWeekDays.push(getKeyByValue(daysMap, currentDate.getDay()));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        if (validWeekDays?.length && !slots.length) {
          throw new CustomError(
            `Invalid weekdays provided: [${selectedDays
              .map((x) => getKeyByValue(daysMap, x))
              .join(
                ", "
              )}]. Following weekdays fall in the specified time: [${validWeekDays.join(
              ", "
            )}]`,
            400
          );
        }
      }
    };

    await generateSlotsByRecurrence();

    if (slots.length > 0) {
      await Slot.insertMany(slots);
      return res
        .status(201)
        .json({ message: "Slots created successfully.", slots });
    }

    return res.status(400).json({ message: "No slots created." });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({
      message: "Internal server error.",
      error: err.message,
    });
  }
};

// -------------------- GET AVAILABLE SLOTS --------------------
exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    const slots = await Slot.find({
      doctor_id: doctorId,
      status: "available",
      start_time: {
        $gte: new Date(date + "T00:00:00Z"),
        $lt: new Date(date + "T23:59:59Z"),
      },
    });

    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

// -------------------- GET SLOT BY ID --------------------
exports.getSlotById = async (req, res) => {
  try {
    const { slotId } = req.params;
    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    return res.status(200).json(slot);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};
