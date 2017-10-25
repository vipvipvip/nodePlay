var dbconfig = {
    server: 'localhost',
    database: 'StockDB',
    user: 'CenseoAdmin',
    password: 'AdminCenseo',
};

var roccURL = 'http://iminers.com/rocc/rocc.php?symbol=';

const numbersToAdd = [  
  3,
  4,
  10,
  2
];

module.exports = {
    dbconfig:dbconfig,
    numbersToAdd: numbersToAdd,
    roccURL:roccURL

}
