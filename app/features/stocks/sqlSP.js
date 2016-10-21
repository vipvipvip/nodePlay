var config = require("../../config/config")
var sql = require('mssql');

function callCSP(req, res) {
    //2. 
    var dbConn = new sql.Connection(config.dbconfig);
    dbConn.connect().then(function () {
         
        //3.
        var request = new sql.Request(dbConn);
        request.input('tid', sql.Int, 442)
        .execute("csp_GetActualMonthValues").then(function (recordSet, returnValue, affected) {
            //4.
			res.json(recordSet)
            dbConn.close();
        }).catch(function (err) {
            //5.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //6.
        console.log(err);
    });
}
module.exports = {
	callCSP: callCSP
}
