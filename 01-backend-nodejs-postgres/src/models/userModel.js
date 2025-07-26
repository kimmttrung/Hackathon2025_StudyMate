const client = require('../config/db');

const findUserByEmail = async (email) => {
    const result = await client.query(
        `SELECT 
            id, email, username, full_name, gender, date_of_birth, phone, 
            address_province, address_district, nationality, avatar, created_at
         FROM users
         WHERE email = $1`,
        [email]
    );

    return result;
};

const insertUser = async (email, hashedPassword) => {
    await client.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, hashedPassword]
    );
}

const updateUser = async (email, username, password, gender, nationality, phonenumber) => {
    await client.query(
        `
        UPDATE users
        SET username = $1,
            password = $2,
            gender = $3,
            nationality = $4,
            phonenumber = $5
        WHERE email = $6;
        `,
        [username, password, gender, nationality, phonenumber, email]
    );
};

const findUserByName = async (username) => {
    const result = await client.query(
        `
        SELECT * FROM users
        WHERE username=$1
        `,
        [username]
    );

    return result;
};

const updateUserProfile = async (email, updates = {}) => {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in updates) {
        fields.push(`${key} = $${index++}`);
        values.push(updates[key]);
    }

    values.push(email); // WHERE email = $n

    const query = `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE email = $${index}
        RETURNING id, username, email, avatar, full_name, gender, date_of_birth, phone, address_province, address_district, nationality;
    `;

    const result = await client.query(query, values);
    return result.rows[0]; // Trả về user sau khi update
};




module.exports = {
    findUserByEmail,
    insertUser,
    updateUser,
    findUserByName,
    updateUserProfile
};
