require('dotenv').config();

const mysql = require('mysql2');

// Connect DB
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
				id INT PRIMARY KEY AUTO_INCREMENT,
				title VARCHAR255) NOT NULL,
				body TEXT NOT NULL,
				created_at DATETIME NOT NULL,
				author_id INT NOT NULL
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
				id INT PRIMARY KEY AUTO_INCREMENT,
				commenter_id INT NOT NULL,
				comment TEXT NOT NULL,
				created_at DATETIME NOT NULL,
				upvoted_score INT DEFAULT 0 NOT NULL,
				post_id INT NOT NULL,
				FOREIGN KEY (post_id) references post(id)
			)`;

		pool.query(sql_create_comment, function(err, result) {
			if (err) throw err;
			console.log("Comment table created");
		})
	}
	else {
		// Add feature nested comment by adding column parent_comment id
		let sql_column_parent_comment_id_exist = `SHOW COLUMNS FROM comment LIKE 'parent_comment_id';`;
		pool.query(sql_column_parent_comment_id_exist, function(err, result) {
			if (result.length === 0) {
				let sql_alter_column_parent_comment_id = `ALTER TABLE comment ADD COLUMN parent_comment_id INT NOT NULL AFTER id;`
				pool.query(sql_alter_column_parent_comment_id, function(err, result) {
					if (err) throw err;
					console.log("New column 'parent_comment_id' created")
				})
			} else {
				console.log("Column 'parent_comment_id' exists")
			}
		})
	}
});

module.exports = pool.promise();