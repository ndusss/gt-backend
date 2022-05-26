const db = require('../config/db');
const datetimeNow = require('../utils/datetime');

class Post {
	constructor(title, body, authorId) {
		this.title = title;
		this.body = body;
		this.authorId = authorId;
	}

	async save() {
		let createdAtDateTime = datetimeNow();
		console.log('createdAtDateTime', createdAtDateTime);
		let sql = `
			INSERT INTO post(
				title,
				body,
				created_at,
				author_id
			)
			VALUES(
				?,
				?,
				?,
				?
			)
		`;

		const [newPost, _] = await db.execute(sql, [this.title, this.body, createdAtDateTime, this.authorId]);
		return newPost;
	}

	static findAll() {
		let sql = `SELECT * FROM post;`;
		return db.execute(sql);
	}

	static findById(id) {
		let sql = `SELECT * FROM post WHERE id = ${id}`;
		return db.execute(sql);
	}

	static getAllCommentsByPostId(id) {
		let sql = `SELECT * FROM comment WHERE post_id = ${id}`;
		return db.execute(sql);
	}
}

module.exports = Post;