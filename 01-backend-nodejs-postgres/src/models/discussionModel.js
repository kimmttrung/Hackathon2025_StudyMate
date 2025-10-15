const pool = require('../config/db');

const DiscussionModel = {
    async getAllPosts() {
        const query = `
        SELECT d.id, d.title, d.content, d.created_at, d.user_id,
               u.username, u.avatar
        FROM discussions d
        JOIN users u ON d.user_id = u.id
        ORDER BY d.created_at DESC
    `;
        const result = await pool.query(query);

        // Convert avatar buffer → base64
        const posts = result.rows.map(post => {
            if (post.avatar) {
                post.avatar = `data:image/jpeg;base64,${post.avatar.toString('base64')}`;
            }
            return post;
        });

        return posts;
    }
    ,
    async getPostWithComments(id) {
        const queryPost = `
        SELECT d.*, u.username, u.avatar
        FROM discussions d
        JOIN users u ON d.user_id = u.id
        WHERE d.id = $1
    `;
        const postResult = await pool.query(queryPost, [id]);
        const post = postResult.rows[0];

        if (!post) return null;

        const queryComments = `
        SELECT c.*, u.username, u.avatar
        FROM discussioncomments c
        JOIN users u ON c.user_id = u.id
        WHERE c.discussion_id = $1
        ORDER BY c.created_at ASC
    `;
        const commentResult = await pool.query(queryComments, [id]);
        post.comments = commentResult.rows;

        return post;
    },

    async createPost({ title, content, user_id }) {
        const result = await pool.query(
            `INSERT INTO discussions (title, content, user_id, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
            [title, content, user_id]
        );
        return result.rows[0];
    },

    async votePost(id, type = "upvote") {
        const column = type === "upvote" ? "upvotes" : "downvotes";
        const result = await pool.query(
            `UPDATE discussions SET ${column} = ${column} + 1 WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    },

    async addComment(postId, { content, user_id }) {
        const result = await pool.query(
            `INSERT INTO comments (post_id, content, user_id, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
            [postId, content, user_id]
        );
        return result.rows[0];
    },

    async getComments(postId) {
        const result = await pool.query(
            "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC",
            [postId]
        );
        return result.rows;
    },
};

module.exports = DiscussionModel;
