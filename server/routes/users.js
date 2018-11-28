const express = require('express');
const User = require('../models/User');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary')
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get('/profile', isLoggedIn, (req,res,next) => {
  req.user.password = null
  res.json(req.user)
})

router.put('/profile', isLoggedIn, (req,res,next) => {
  let updates = {
    username: req.body.username,
    // pictureUrl: req.body.pictureUrl, // done by "POST /api/users/pictures"
  }
  // If the user sends "newPassword" and "currentPassword", check if the "req.body.currentPassword" is correct and sets the new password with "req.body.newPassword"
  if (req.body.newPassword && req.body.currentPassword && req.body.newPassword !== "") {
    // bcrypt.compareSync compares a clear password with a hass password
    if (!bcrypt.compareSync(req.body.currentPassword, req.user.password)) {
      // create an error object to send to our error handler with "next()"
      next(new Error("Current password is wrong"))
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(req.body.newPassword, salt)
    updates.password = hashPass
  }
  User.findByIdAndUpdate(req.user._id, updates)
  .then(user => {
    res.json({
      success: true
    })
  })
})

// parser.single('picture') => extract from the field 'picture' the file and define req.file (and req.file.url)
router.post('/pictures', isLoggedIn, parser.single('picture'), (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
    .catch(err => next(err))
});

module.exports = router;
