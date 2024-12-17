const Slot = require("../models/Slot");

const isSlotOverlapping = async ({ doctorId, slotStartTime, slotEndTime }) => {
  return (
    (await Slot.findOne({
      doctor_id: doctorId,
      $or: [
        { start_time: { $lt: slotEndTime, $gte: slotStartTime } },
        { end_time: { $gt: slotStartTime, $lte: slotEndTime } },
        {
          start_time: { $lte: slotStartTime },
          end_time: { $gte: slotEndTime },
        },
      ],
    })) !== null
  );
};

module.exports = { isSlotOverlapping };
