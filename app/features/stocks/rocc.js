var http = require('http');
var htmlparser = require('htmlparser2');
var config = require("../../config/config")

var url = "";


function getRocc(req, res) {
  if (!req.params.ticker) {
    res.send("error - no ticker");
    return;
  } else {
    url = config.roccURL + req.params.ticker
  }
  console.log(url);

  //set up return schema
  var rocc = {};
  rocc.data = {};
  rocc.data.Company = [];
  rocc.data.Competitors = [];

  http.get(url, function(response){
    parseResponse(response);
  });

  var parseResponse = function(response) {
    rocc.data.ticker = req.params.ticker;
    rocc.data.id = req.params.id;
    var bCompany=-1;
    var data = "";

    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function(chunk) {
        var parsedData = new htmlparser.Parser({
        ontext: function(text){
            if (text.trim() === "Company") {
              bCompany = 1;
            } else if (text.trim() === "Competitors") {
              bCompany = 2;
            }

            if (text.trim().endsWith("%")) {
                if (bCompany === 1) {
                  rocc.data.Company.push(text.trim());
                }
                if (bCompany === 2) {
                  rocc.data.Competitors.push(text.trim());
                }
            }
          }
        }, {decodeEntities: true});
        parsedData.write(data);
        parsedData.end();
        res.send(rocc);
      }
    )};
};

module.exports = {
	getRocc: getRocc
}
