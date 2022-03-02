const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce',
    multipleStatements: true
});

connection.connect(function(err) {
    if(err) {
        console.log('error connection');
    }
    else {
        console.log('>> Database is connected to ecommerce');
    }
})

module.exports = connection;