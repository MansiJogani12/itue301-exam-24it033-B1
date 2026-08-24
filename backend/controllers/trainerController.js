const Trainer = require("../models/Trainer");

const getAllTrainers = async (req, res, next) => {
  try {
    const trainers = await Trainer.find();

    res.status(200).json({
      success: true,
      count: trainers.length,
      data: trainers
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTrainers
};