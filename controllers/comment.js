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

exports.getRootComments = async (req, res, next) => {
	try {
		let [comments, _] = await Comment.findRootComments();
		res.status(200).json({count: comments.length, comments});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getChildrenComments = async (req, res, next) => {
	try {
		let [comments, _] = await Comment.findChildrenComments();
		res.status(200).json({count: comments.length, comments});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getChildrenCommentsByParentId = async (req, res, next) => {
	const { id } = req.params;
	try {
		let [comments, _] = await Comment.findChildrenCommentsByParentId(id);
		res.status(200).json({count: comments.length, comments});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.createNewComment = async (req, res, next) => {
	const { parentCommentId, commenterId, comment, postId } = req.body;
	try {
		let newComment = new Comment(parentCommentId, commenterId, comment, postId);
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

exports.updateUpvoteById = async (req, res, next) => {
	const { id } = req.params;
	try {
		let [comment, _] = await Comment.upvoteById(id);
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