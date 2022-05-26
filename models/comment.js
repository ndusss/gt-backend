const db = require('../config/db');
const datetimeNow = require('../utils/datetime');

class Comment {
	constructor(commenterId, comment, postId) {
		this.commenterId = commenterId;
		this.comment = comment;
		this.postId = postId;
	}

	async save() {
		let createdAtDateTime = datetimeNow();
		let sql = `
			INSERT INTO comment(
				commenter_id,
				comment,
				created_at,
				post_id
			)
			VALUES(
				?,
				?,
				?,
				?
			)
		`;

		const [newComment, _] = await db.execute(sql, [this.commenterId, this.comment, createdAtDateTime, this.postId]);
		return newComment;
	}

	static findAll() {
		let sql = `SELECT * FROM comment;`;
		return db.execute(sql);
	}

	static findById(id) {
		let sql = `SELECT * FROM comment WHERE id = ${id}`;
		return db.execute(sql);
	}

	static getPostByCommentId(id) {
		let sql = `SELECT post.id FROM comment, post WHERE comment.id = ${id} and post.id = comment.post_id`;
		return db.execute(sql);
	}

}

module.exports = Comment;