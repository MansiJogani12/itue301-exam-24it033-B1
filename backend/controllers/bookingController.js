const ClassBooking =
  require("../models/ClassBooking");

const Trainer =
  require("../models/Trainer");

const createBooking =
  async (req, res, next) => {
    try {
      const {
        trainerId,
        className,
        date,
        timeSlot
      } = req.body;

      const trainer =
        await Trainer.findById(
          trainerId
        );

      if (!trainer) {
        return res.status(400).json({
          success: false,
          message:
            "Trainer not found"
        });
      }

      if (!trainer.available) {
        return res.status(400).json({
          success: false,
          message:
            "Trainer is fully booked"
        });
      }

      const booking =
        await ClassBooking.create({
          memberId:
            req.member.memberId,

          trainerId,

          className,

          date,

          timeSlot
        });

      res.status(201).json({
        success: true,
        message:
          "Booking created successfully",

        data: booking
      });

    } catch (error) {
      next(error);
    }
  };

const getMyBookings =
  async (req, res, next) => {
    try {
      const bookings =
        await ClassBooking.find({
          memberId:
            req.member.memberId
        })
        .populate(
          "memberId",
          "name email"
        )
        .populate(
          "trainerId",
          "name specialization"
        );

      res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
      });

    } catch (error) {
      next(error);
    }
  };

const updateBookingStatus =
  async (req, res, next) => {
    try {
      const { status } =
        req.body;

      const booking =
        await ClassBooking.findOne({
          _id: req.params.id,
          memberId:
            req.member.memberId
        });

      if (!booking) {
        return res.status(400).json({
          success: false,
          message:
            "Booking not found"
        });
      }

      booking.status = status;

      await booking.save();

      res.status(200).json({
        success: true,
        message:
          "Booking status updated",

        data: booking
      });

    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createBooking,
  getMyBookings,
  updateBookingStatus
};