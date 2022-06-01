const db = require('../config/db');
const datetimeNow = require('../utils/datetime');

class Comment {
	constructor(parentCommentId, commenterId, comment, postId) {
		this.parentCommentId = parentCommentId;
		this.commenterId = commenterId;
		this.comment = comment;
		this.postId = postId;
	}

	async save() {
		let createdAtDateTime = datetimeNow();
		let sql = `
			INSERT INTO comment(
				parent_comment_id,
				commenter_id,
				comment,
				created_at,
				post_id
			)
			VALUES(
				?,
				?,
				?,
				?,
				?
			)
		`;

		const [newComment, _] = await db.execute(sql, [this.parentCommentId, this.commenterId, this.comment, createdAtDateTime, this.postId]);
		return newComment;
	}

	static findAll() {
		let sql = `SELECT * FROM comment;`;
		return db.execute(sql);
	}

	static findRootComments() {
		let sql = `SELECT * FROM comment WHERE parent_comment_id = 0;`;
		return db.execute(sql);
	}

	static findChildrenComments() {
		let sql = `SELECT * FROM comment WHERE parent_comment_id != 0;`;
		return db.execute(sql);
	}

	static findChildrenCommentsByParentId(parentId) {
		let sql = `SELECT * FROM comment WHERE parent_comment_id != ${parentId}`;
		return db.execute(sql);
	}

	static findById(id) {
		let sql = `SELECT * FROM comment WHERE id = ${id}`;
		return db.execute(sql);
	}

	static upvoteById(id) {
		let sql = `UPDATE comment SET upvoted_score = upvoted_score + 1 WHERE id = ${id}`;
		return db.execute(sql);
	}

	static getPostByCommentId(id) {
		let sql = `SELECT post.id FROM comment, post WHERE comment.id = ${id} and post.id = comment.post_id`;
		return db.execute(sql);
	}

}

module.exports = Comment;