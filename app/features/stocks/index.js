// index file for stocks folder

var express = require('express')
  , router = express.Router()

// let module handle its route
// example of one more level of route
// http://localhost:3000/stocks/getTickers/...
router.use('/getTickers', require('./tickers'));


// handle routes for other "stocks" features
// these are treated as simple modules 
// which exports functions and unlike previous 
// example, do not have any route entries
var callCSP = require('./sqlSP')
// http://localhost:3000/stocks/callCSP
router.get('/callCSP', callCSP.callCSP);

var queryDB = require('./sqlquery')
// http://localhost:3000/stocks/queryDB
router.get('/queryDB', queryDB.query)
// http://localhost:3000/stocks/queryDB/aapl
router.get('/queryDB/:ticker', queryDB.query)

var yQ = require('./yql')
// http://localhost:3000/stocks/yq
router.get('/yq', yQ.yQ);
router.get('/yq/:ticker', yQ.yQ);
router.get('/yqS/:ticker', yQ.yQS);

module.exports = router