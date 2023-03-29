const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const SECRET_KEY = "basantgoswamiisagoodboy$";

// Route 1 :- creating the user using : post "api/auth/createuser"  -- not login required

router.post('/createuser', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', "Enter valid email").isEmail(),
  body('password', "Enter atleast 5 charecter").isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // if there are errors , return bad requrest and the errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    //  check the email is already exist or not 
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "sorry this email is already exists.." })
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt);

    //create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign({ data }, SECRET_KEY);
    success = true;
    res.json({ success, token })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// Route 2 :- creating the user using : post "api/auth/login" -- not login required

router.post('/login', [
  body('email', "Enter valid email ").isEmail(),
  body('password', "enter valid password..").exists(),
], async (req, res) => {
  // if there are errors , return bad requrest and the errors 
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    //  check the email is already exist or not 
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "sorry this email is not exists.." })
    }

    const passwordCompare = await bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Enter a valid password" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, SECRET_KEY);
    success = true;
    res.json({ success, token })
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal server error1");
  }
})

// Route 3 :- creating the user using : post "api/auth/getuser" -- login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    res.status(401).send("Internal server error2");
    console.error(error.message);
    // console.log(error)
  }
})

module.exports = router


//   .catch (err => {
//   console.log(err)
//   res.json({error : " Enter a unique email id", message : err.message})
// })
  // const user = User(req.body);
  // user.save();