const express = require('express');
const mongoose = require('mongoose');
const Country = require('../models/Country')

// The same as: const checkId = require('../middlewares').checkId
const { checkId, isLoggedIn } = require('../middlewares')

const router = express.Router();

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
  .populate('_owner', 'username') // populate on _owner and only send the username and _id (default)
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err))
});

// Route to get the detail of a country
router.get('/:id', checkId('id'), (req, res, next) => {
  let id = req.params.id
  Country.findById(id)
    .then(countryDoc => {
      res.json(countryDoc)
    })
})

// Route to update a country
router.put('/:countryId', isLoggedIn, checkId('countryId'), (req, res, next) => {
  let id = req.params.countryId
  Country.findByIdAndUpdate(id, {
    name: req.body.name,
    capitals: req.body.capitals,
    area: req.body.area,
    description: req.body.description,
  })
    .then(countryDoc => {
      res.json({
        success: !!countryDoc // true only if a country was found
      })
    })
    .catch(err => next(err))
})

// Route to add a country
router.post('/', isLoggedIn, (req, res, next) => {
  let { name, capitals, area, description } = req.body
  let _owner = req.user._id
  Country.create({ name, capitals, area, description, _owner })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});

router.delete('/:id', isLoggedIn, checkId('id'), (req, res, next) => {
  let id = req.params.id
  Country.findByIdAndDelete(id)
    .then(countryDoc => {
      console.log("DEBUG countryDoc", countryDoc)
      res.json({
        // !!myVariable converts truthy to true and falsy to false
        success: !!countryDoc,
        country: countryDoc,
        // message: "This is just a test!"
      })
    })
    .catch(err => next(err))
})

module.exports = router;
