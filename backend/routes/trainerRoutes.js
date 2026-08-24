const express = require("express");

const {
  getAllTrainers
} = require("../controllers/trainerController");

const router = express.Router();

router.get("/", getAllTrainers);

module.exports = router;