const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../models");
const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { validateLogin, validateRegister } = require("../utils/validate");
// const generateToken = require("../utils/generateToken");
const register = asynchandler(async (req, res) => {
  //validate register
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { firstName, lastName, email, password, userName } = req.body;

  let user = await db.User.findOne({ where: { email } });
  if (user) {
    return res
      .status(400)
      .json({ message: "Email already exists, please login" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await db.User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    userName,
  });
  return res.status(201).json({
    message: "register successfully ",
    name: user.name,
    email: user.email,
    id: user.id,
  });
});

const login = asynchandler(async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;
  let user;

  user = await db.User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "invalid email or passowrd" });
  }
  const ispasswordValid = await bcrypt.compare(password, user.password);
  if (!ispasswordValid) {
    return res.status(404).json({ message: "invalid email or passowrd" });
  }
  const token = jwt.sign(
    { id: user.id, isAmin: user.isAmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res
    .status(201)
    .json({ message: "login successful ", token, id: user.id }); //token
});
module.exports = { register, login };
