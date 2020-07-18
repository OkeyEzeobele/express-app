require('dotenv').config();
const mysql = require('mysql2');

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

//Create A connection
const dbConnection = mysql.createPool({
	host: dbHost,
	user: dbUser,
	password: dbPassword,
	database: 'expresswebapp'
}).promise();
module.exports = dbConnection

dbConnection.query("CREATE DATABASE IF NOT EXISTS `expresswebapp`", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});


//Connect to MySQL
dbConnection.getConnection(function(err){
	if (err) throw err;
	console.log('Connected To The Database!');

	// Create Table
	const sql = "CREATE TABLE IF NOT EXISTS `users` (`id` int(10) unsigned NOT NULL AUTO_INCREMENT,`name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,`email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,`password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,PRIMARY KEY (`id`),UNIQUE KEY `email` (`email`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

	dbConnection.query(sql, function(err,result){
		if (err) throw err;
		console.log('Our Table Has Been Created...');
	});

});


