// index file for features folder

var express = require('express')
  , router = express.Router()

// route for all features
// there is only one module that support the calc feature
// so route it directly to that module
router.use('/calc', require('../features/calc/calc'));


// the "stocks" feature has multiple entry points
// so it will pick up further routes from index.js in the 
// stocks folder
router.use('/stocks', require('../features/stocks'));

module.exports = router;