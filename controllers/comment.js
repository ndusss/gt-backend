const Comment = require('../models/comment');

exports.getAllComments = async (req, res, next) => {
	try {
		let [comments, _] = await Comment.findAll();
		res.status(200).json({count: comments.length, comments});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.createNewComment = async (req, res, next) => {
	const { commenterId, comment, postId } = req.body;
	try {
		let newComment = new Comment(commenterId, comment, postId);
		newComment = await newComment.save();
		res.status(201).json({message: `New comment successfully created`});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getCommentById = async (req, res, next) => {
	const { id } = req.params;
	try {
		let [comment, _] = await Comment.findById(id);
		res.status(200).json({comment});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getPostByCommentId = async (req, res, next) => {
	const { id } = req.params;
	try {
		let [comment, _] = await Comment.getPostByCommentId(id);
		res.status(200).json({comment});
	} catch (error) {
		console.log(error);
		next(error);
	}
}