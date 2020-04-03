const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = new User({ login, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "WOWOWOOW");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
    const { login, password } = req.body;

    if(!login || !password) {
        return res.status(422).send({ error: 'Must provide login and password'});
    }

    const user = await User.findOne({login});
    if(!user) {
        return res.status(404).send({error: 'Login not found'});

    }
    try{
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, "WOWOWOWOWOw");
    res.send({token});
    } catch (err) {
        return res.status(422).send({error: 'Invalid login or password'});
    }
});

module.exports = router;
