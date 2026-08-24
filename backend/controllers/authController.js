const jwt = require("jsonwebtoken");
const Member = require("../models/Member");

const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const member = await Member.findOne({ email });

    if (!member) {
      return res.status(401).json({
        success: false,
        message: "Member not found"
      });
    }

    const token = jwt.sign(
      {
        memberId: member._id,
        name: member.name,
        role: "Member"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      member: {
        id: member._id,
        name: member.name,
        email: member.email
      },
      role: "Member"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };