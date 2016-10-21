// app/tickers.js
var express = require('express')
  , router = express.Router()

var config = require("../../config/config")

var tickers = [
    { tick: 'aapl', price:100.23},
    { tick: 'ibm', price:160.21},
    { tick: 'csco', price:29.89},
    { tick: 'intc', price:35.06},
]

function getTickers (arr) {  
    return tickers;
}

function queryTickers(req, res) {
    return res.json(tickers.filter(function(ticker) {
        if (ticker.tick == req.params.ticker) {
            return ticker;
        }
    }));
}
// http://localhost:3000/stocks/getTickers/gt
router.get('/gt', (req, res) => {res.json(getTickers(tickers))});

// http://localhost:3000/stocks/getTickers/qt
// http://localhost:3000/stocks/getTickers/qt/aapl
// this has two flavors - one with and one without a ticker param
router.get('/qt/:ticker', (req, res) => {res.json(queryTickers(req, res))});

module.exports = router;