const Post = require('../models/post');

exports.getAllPosts = async (req, res, next) => {
	try {
		let [posts, _] = await Post.findAll();
		res.status(200).json({count: posts.length, posts});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.createNewPost = async (req, res, next) => {
	const { title, body, authorId } = req.body;
	try {
		let newPost = new Post(title, body, authorId);
		newPost = await newPost.save();
		res.status(201).json({message: `${title} post succesfully created`});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getPostById = async (req, res, next) => {
	const { id } = req.params;
	try {
		let [post, _] = await Post.findById(id);
		res.status(200).json({post});
	} catch (error) {
		console.log(error);
		next(error);
	}
}

exports.getAllCommentsByPostId = async (req, res, next) => {
	const { id } = req.params;
	try {
		let [posts, _] = await Post.getAllCommentsByPostId(id);
		res.status(200).json({posts});
	} catch (error) {
		console.log(error);
		next(error);
	}
}