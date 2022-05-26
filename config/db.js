require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
});

// CHECK if post table exists
let sql_post_exist = `SELECT * FROM post;`;
pool.query(sql_post_exist, function(err, result) {
	if (err) {
		// CREATE post table
		let sql_create_post = `
			CREATE TABLE IF NOT EXISTS post (
				id int primary key auto_increment,
				title varchar(255) not null,
				body TEXT not null,
				created_at datetime not null,
				author_id int not null
			)`;

		pool.query(sql_create_post, function(err, result) {
			if (err) throw err;
			console.log("Post table created");
		});
	};
});

// CHECK if comment table exists
let sql_comment_exist = `SELECT * FROM comment;`;
pool.query(sql_comment_exist, function(err, result) {
	if (err) {
		// CREATE comment table
		let sql_create_comment = `
			CREATE TABLE IF NOT EXISTS comment (
				id int primary key auto_increment,
				commenter_id int not null,
				comment TEXT not null,
				created_at datetime not null,
				upvoted_score INT DEFAULT 0 not null,
				post_id int not null,
				foreign key (post_id) references post(id)
			)`;

		pool.query(sql_create_comment, function(err, result) {
			if (err) throw err;
			console.log("Comment table created");
		})
	};
});

module.exports = pool.promise();