require('dotenv').config();
const mysql = require('mysql2');

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

//Create Database and table
var con = mysql.createConnection({
	host: dbHost,
	user: dbUser,
	password: dbPassword,
});

con.query("CREATE DATABASE IF NOT EXISTS `expresswebapp`", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

var con = mysql.createConnection({
	host: dbHost,
	user: dbUser,
	password: dbPassword,
	database: 'expresswebapp'
});

con.connect(function(err){
	if (err) throw err;
	console.log('Connected To The Database!');

	// Create Table
	const sql = "CREATE TABLE IF NOT EXISTS `users` (`id` int(10) unsigned NOT NULL AUTO_INCREMENT,`name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,`email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,`password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,PRIMARY KEY (`id`),UNIQUE KEY `email` (`email`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

	con.query(sql, function(err,result){
		if (err) throw err;
		console.log('Our Table Has Been Created...');
	});

});


//Create A pool
const dbConnection = mysql.createPool({
	host: dbHost,
	user: dbUser,
	password: dbPassword,
	database: 'expresswebapp'
}).promise();
module.exports = dbConnection




//Connect to MySQL



