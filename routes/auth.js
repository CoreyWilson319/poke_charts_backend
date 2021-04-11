const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

router.post("/user/login", (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    location,
  } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check if user exist
  User.findOne({ email: email }).then((user) => {
    if (!user)
      return res.status(400).json({ msg: "User does not exist" });

    // Validate password
    // this compares the user given password with the password of the staff member found in our findOne method
    bcrypt
      .compare(password, user.password)
      // compare method returns a promise
      // if isMatch is false the credentials entered were wrong
      // If isMatch is true the login credentials was correct send token and user
      .then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });

        jwt.sign(
          { id: user.id },
          process.env.jwt,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token: token,
              user: {
                id: user.id,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                facility: user.facility,
                title: user.title,
              },
            });
          }
        );
      });
  });
});

router.post("/user/register", (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    location,
  } = req.body;

  // Simple Validation
  if (!last_name || !email || !username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check if user exist
  User.findOne({ email: email }).then((user) => {
    if (user)
      return res.status(400).json({ msg: "User already exist" });

    const newUser = new User({
      first_name,
      last_name,
      email,
      // We don't want to store a raw password so we need to hash it
      password,
      username,
      location,
    });

    // Create salt & hash
    // first parameter of genSalt method is how many times we will salt the password
    // 10 is the default
    bcrypt.genSalt(10, (err, salt) => {
      // hash will take in the plain text password first
      // then salt
      // callback function that takes in an err and the hash
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        // If error stop everything and throw that error
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          // Sign the token, first parameter is going to be the payload we want to add
          // Can be anything
          // When we send a token these things will be sent in the token
          // Can add more
          // next paramater will be the secret
          // Last parameter is optional which is the expiresIn by seconds 3600 is an hour
          // Lastly we need to send a callback with an err and the token
          jwt.sign(
            { id: user.id },
            process.env.jwt,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user.id,
                  last_name: user.last_name,
                  email: user.email,
                  username: user.username,
                  location: user.location,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
