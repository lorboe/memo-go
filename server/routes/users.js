const express = require('express');
const User = require('../models/User');
const Card = require('../models/Card');
const Deck = require('../models/Deck');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary')
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get('/profile', isLoggedIn, (req, res, next) => {
  req.user.password = null
  let id = req.user._id
  Promise.all([
    User.findById(id),
    Deck.find({ _owner: id })
  ])
    .then(([user, decks]) => {
      console.log("USER:" + user)
      console.log("DECK" + decks)
      res.json({ user, decks })
    })
    .catch(err => next(err))
})

router.put('/profile', isLoggedIn, (req,res,next) => {
  let updates = {
    email: req.body.email,
    // pictureUrl: req.body.pictureUrl, // done by "POST /api/users/pictures"
  }
  if (req.body.newPassword && req.body.currentPassword && req.body.newPassword !== "") {
    if (!bcrypt.compareSync(req.body.currentPassword, req.user.password)) {
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
  let pictureUrl = req.file.url
  if(!pictureUrl) {
    res.next()
  }
  User.findByIdAndUpdate(req.user._id, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
    .catch(err => next(err))
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private


router.post(
  '/like/:id', isLoggedIn,
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id', isLoggedIn,
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

router.get("/my-decks", isLoggedIn, (req,res,next) => {
  Deck.find({_owner: req.user._id})
    .then(decks => {
      res.json(decks);
    })
    .catch(err => next(err))
})

router.delete('/my-account', isLoggedIn, (req, res, next) => {
  // TODO: delete all the cards that belongs to a deck that belongs to the coneect the user
  Deck.deleteMany({ _owner: req.user._id })
    .then(deck => Card.deleteMany({ _deck: deck._id }))
    .then(userDoc => {
      console.log("DEBUG deckDoc", userDoc)
      res.json({
        success: !!userDoc,
        user: userDoc,
      })
    })
    .catch(err => next(err))
})



module.exports = router;
