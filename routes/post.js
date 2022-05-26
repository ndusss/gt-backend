const express = require('express');
const post = require('../controllers/post');
const router = express.Router();

// @route  /post/
router.route('/').get(post.getAllPosts).post(post.createNewPost);
router.route('/:id').get(post.getPostById);
router.route('/:id/comments').get(post.getAllCommentsByPostId);

module.exports = router;