const express = require("express");
const router = express.Router();
const DiscussionController = require("../controllers/discussionController");

router.get("/", DiscussionController.listPosts);
router.get("/:id", DiscussionController.getPost);
router.post("/", DiscussionController.createPost);
router.post("/:id/vote", DiscussionController.vote);
router.post("/:id/comments", DiscussionController.addComment);

module.exports = router;
