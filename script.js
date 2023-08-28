var mysql = require('mysql');

var conn = mysql.createConnection({
    host:"localhost",
    user:"admin",
    password:"admin"
});

conn.connect(function(err){
    if(err){
        throw err;
    }
    console.log("Connected");
})

