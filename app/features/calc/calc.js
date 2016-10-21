// app/calc.js
var express = require('express')
  , router = express.Router()

var config = require("../../config/config")

function sum (arr) { 
  return arr.reduce(function(a, b) { 
    return a + b
  }, 0)
}

function mult(arr) {
  return arr.reduce(function(a,b) {
    return a*b;
  },1);
}

function summult(arr, req, res) {
  return new Array({
    sum:sum(arr),
    mult:mult(arr)
  });
}

// invocation: http://localhost:3000/calc/sum
router.get('/sum', (req, res) => { res.json({sum: sum(config.numbersToAdd)})});

// invocation: http://localhost:3000/calc/mult
router.get('/mult', (req, res) => { res.json({mult: mult(config.numbersToAdd)})});

// invocation: http://localhost:3000/calc/summult
router.get('/summult', (req, res) => { res.json(summult(config.numbersToAdd, req, res))});

module.exports = router;

