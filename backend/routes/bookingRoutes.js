const express = require("express");

const authGuard =
  require("../middleware/authGuard");

const {
  createBooking,
  getMyBookings,
  updateBookingStatus
} =
  require("../controllers/bookingController");

const router =
  express.Router();

router.post(
  "/",
  authGuard,
  createBooking
);

router.get(
  "/my",
  authGuard,
  getMyBookings
);

router.patch(
  "/:id/status",
  authGuard,
  updateBookingStatus
);

module.exports = router;