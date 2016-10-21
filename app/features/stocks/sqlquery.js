var config = require("../../config/config")
var sql = require('mssql');

function query(req, res) {
	console.log(req.params.ticker);
	var ticker = req.params.ticker;
	var query = "select top 10 db_ticker_id, db_strTicker from tbl_Ticker ";
	if ( ticker) {
	 query = query + " where db_strTicker = '" + req.params.ticker + "'";
	}
    var dbConn = new sql.Connection(config.dbconfig);
    //5.
    dbConn.connect().then(function () {
        //6.
        var request = new sql.Request(dbConn);
        //7.
        request.query(query).then(function( recordSet) {
            console.dir(recordSet);
			//res.statusCode = 200;
            dbConn.close();
			res.json(recordSet).send();
        }).catch(function (err) {
            //8.
            console.log(err);
            //dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });
};

module.exports =  {
	query: query
};