
var uGetHttp = require('../../utils/utils')


var _getQuoteUrl = function(ticker) {
    var tickers = ticker.sort().map(function(t) {   
                    return "'" + t + "'";
                }).join(',');
    var _url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("
    _url += tickers.substr(0,tickers.length) 
    _url +=  ")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    return _url; 
};

var _getYahooStatistics = function(ticker) {
    var _url = "https://query1.finance.yahoo.com/v10/finance/quoteSummary/";
    _url += ticker;
    _url += "?formatted=true&crumb=eMLeV7lI4S7&lang=en-US&region=US&modules=defaultKeyStatistics%2CfinancialData%2CcalendarEvents&corsDomain=finance.yahoo.com"
console.log(_url);
    return _url;
};
function yQuote(req, res) {
    if (!req.params.ticker) {
            res.send({
                        "code": "ENOTICKER",
                        "errno": "ENOTICKER",
                        "syscall": "yQuote",
                        "hostname": req.hostname,
                        "host": "query.yahooapis.com",
                        "port": 443
                        }
                    );
            return;
    };
     
    uGetHttp.getContent(_getQuoteUrl(new Array(req.params.ticker)))
    .then((data) => res.send(JSON.parse(data).query.results))
    .catch((err) => res.send(err));
};

// Added to do valuation using Hotel valuation
function yStatsQuote(req, res) {
    if (!req.params.ticker) {
            res.send({
                        "code": "ENOTICKER",
                        "errno": "ENOTICKER",
                        "syscall": "yQuote",
                        "hostname": req.hostname,
                        "host": "query1.finance.yahoo.com",
                        "port": 443
                        }
                    );
            return;
    };
    uGetHttp.getContent(_getYahooStatistics(req.params.ticker))
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => res.send(err));
};  


module.exports = {
	yQ: yQuote,
    yQS: yStatsQuote
}
