// models/friendshipModel.js
const db = require("../config/db");

const Friendship = {
  async sendRequest(requester_id, receiver_id) {
    const query = `
      INSERT INTO friendships (requester_id, receiver_id, status)
      VALUES ($1, $2, 'pending')
      RETURNING *;
    `;
    const result = await db.query(query, [requester_id, receiver_id]);
    return result.rows[0];
  },

  async getFriends(user_id) {
    const query = `
      SELECT 
        u.id,
  u.username,
  u.full_name,
  u.email,
  u.gender,
  u.date_of_birth,
  u.phone,
  u.address_province,
  u.address_district,
  u.nationality,
  u.avatar,
  u.is_online,
  u.bio,
  u.created_at,
        f.status AS status,
        f.requester_id,
        f.receiver_id
      FROM users u
      JOIN friendships f ON (f.requester_id = u.id OR f.receiver_id = u.id)
      WHERE (f.requester_id = $1 OR f.receiver_id = $1)
        AND f.status = 'accepted' AND u.id != $1;
    `;
    const result = await db.query(query, [user_id]);
    return result.rows;
  },

  async getPendingRequests(user_id) {
    const query = `
    SELECT 
      u.id,
      u.username,
      u.email,
      u.full_name,
      u.gender,
      u.date_of_birth,
      u.phone,
      u.address_province,
      u.address_district,
      u.nationality,
      u.avatar,
      u.is_online,
      u.bio,
      u.created_at,
      us.posts,
      us.friends,
      us.points,
      us.rank,
      us.subjects,
      f.requester_id,
      f.receiver_id,
      f.status,
      CASE 
        WHEN f.requester_id = $1 THEN 'outgoing'
        WHEN f.receiver_id = $1 THEN 'incoming'
      END AS direction
    FROM friendships f
    JOIN users u ON 
      (u.id = f.requester_id AND f.receiver_id = $1)
      OR (u.id = f.receiver_id AND f.requester_id = $1)
    LEFT JOIN user_stats us ON u.id = us.user_id
    WHERE f.status = 'pending';
  `;

    const result = await db.query(query, [user_id]);
    return result.rows;
  },


  async acceptRequest(requester_id, receiver_id) {
    // Cập nhật trạng thái trong bảng friendships
    const updateFriendshipQuery = `
    UPDATE friendships
    SET status = 'accepted', updated_at = CURRENT_TIMESTAMP
    WHERE requester_id = $1 AND receiver_id = $2
    RETURNING *;
  `;
    const result = await db.query(updateFriendshipQuery, [requester_id, receiver_id]);

    // Nếu không tồn tại lời mời thì trả về null
    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  },

  async declineRequest(requester_id, receiver_id) {
    const query = `
      DELETE FROM friendships
      WHERE requester_id = $1 AND receiver_id = $2
      RETURNING *;
    `;
    const result = await db.query(query, [requester_id, receiver_id]);
    return result.rows[0];
  },

  async getAllUsersWithStats(currentUserId) {
    const result = await db.query(`
      SELECT 
        u.id,
        u.username,
        u.email,
        u.full_name,
        u.gender,
        u.date_of_birth,
        u.phone,
        u.address_province,
        u.address_district,
        u.nationality,
        u.avatar,
        u.is_online,
        u.bio,
        u.created_at,
        us.posts,
        us.friends,
        us.points,
        us.rank,
        us.subjects
      FROM users u
      LEFT JOIN user_stats us ON u.id = us.user_id
      WHERE u.id != $1
      ORDER BY u.created_at DESC
    `, [currentUserId]);

    return result.rows;
  }
};

module.exports = Friendship;