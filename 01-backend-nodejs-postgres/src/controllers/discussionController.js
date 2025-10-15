const DiscussionModel = require("../models/discussionModel");

const DiscussionController = {
    async listPosts(req, res) {
        try {
            const posts = await DiscussionModel.getAllPosts();
            res.json(posts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getPost(req, res) {
        try {
            const post = await DiscussionModel.getPostById(req.params.id);
            if (!post) return res.status(404).json({ error: "Post not found" });

            const comments = await DiscussionModel.getComments(req.params.id);
            res.json({ ...post, comments });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createPost(req, res) {
        try {
            const { title, content, user_id } = req.body;
            if (!title || !content) {
                return res.status(400).json({ error: "Title and content required" });
            }
            const post = await DiscussionModel.createPost({ title, content, user_id });
            res.status(201).json(post);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async vote(req, res) {
        try {
            const { type } = req.body; // "upvote" hoặc "downvote"
            const post = await DiscussionModel.votePost(req.params.id, type);
            res.json(post);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async addComment(req, res) {
        try {
            const { content, user_id } = req.body;
            if (!content) return res.status(400).json({ error: "Comment content required" });

            const comment = await DiscussionModel.addComment(req.params.id, { content, user_id });
            res.status(201).json(comment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = DiscussionController;
