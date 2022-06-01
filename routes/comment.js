const express = require('express');
const comment = require('../controllers/comment');
const router = express.Router();

// @route /comment/
router.route('/').get(comment.getAllComments).post(comment.createNewComment);
router.route('/parent').get(comment.getRootComments);
router.route('/children').get(comment.getChildrenComments);
router.route('/children/:id').get(comment.getChildrenCommentsByParentId);
router.route('/:id').get(comment.getCommentById).put(comment.updateUpvoteById);
router.route('/:id/company').get(comment.getPostByCommentId);

module.exports = router;