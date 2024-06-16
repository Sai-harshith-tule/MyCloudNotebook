const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Harshithisagood$boy"; //this is JWT secret

//ROUTE 1: Creatingg user using POST "api/auth/createUser" no login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors return bad request 400 with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //checking whether the user with same email already exists
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      //if exists print the message
      if (user) {
        return res.status(400).json({ errors: "Email already exists!" });
      }

      //gen salt and sec password using bcryptjs package
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        //create data that is sent to  jwt.sign, use id of user to generate auth token
        user: {
          id: user.id,
        },
      };
      //using jwtsecret and data create authorization token
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken }); //send auth token as response to the user

      //res.json(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 2: authenticate a user using: POST "api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors return bad request 400 with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //find a user and pull him on the basis of email
      let user = await User.findOne({ email });
      //if user does not exist
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      }
      //compare password using bcrypt
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        //if password doesnt match, return bad request
        success = false;
        return res.status(400).json({ success, error: "Please try to login with valid credentials" });
      }

      //if password matches
      const data = {
        //create data variable that has user id in an object
        user: {
          id: user.id,
        },
      };
      //using jwtsecret and data create authorization token
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken }); //send auth token as response to the user
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: get logged in user details using: POST "api/auth/getuser". logni required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
