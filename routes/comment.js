const express = require('express');
const comment = require('../controllers/comment');
const router = express.Router();

// @route /comment/
router.route('/').get(comment.getAllComments).post(comment.createNewComment);
router.route('/:id').get(comment.getCommentById);
router.route('/:id/company').get(comment.getPostByCommentId);

module.exports = router;