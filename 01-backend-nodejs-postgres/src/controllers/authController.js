require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
// const { name } = require('ejs');


exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Kiểm tra trùng email
    const existingUser = await User.findUserByEmail(email);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // Mã hoá mật khẩu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo người dùng mới
    await User.insertUser(email, hashedPassword);

    res.json({ msg: 'Register successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Register failed', success: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userResult = await User.findUserByEmail(email);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ msg: 'Email or password is wrong' });
    }

    const user = userResult.rows[0];

    // So sánh password gốc với hash đã lưu
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Có thể tạo JWT ở đây nếu cần
      const payload = {
        email: user.email,
        name: user.username,
        id: user.id,
      }

      const access_token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE
        }
      )

      // Set is_online = true
      await User.updateUserOnlineStatus(user.id, true);

      res.status(200).json({
        access_token,
        msg: 'Login successful',
        success: true,
        user: {
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          full_name: user.full_name,
          gender: user.gender,
          nationality: user.nationality,
          phone: user.phone,
          province: user.address_province,
          district: user.address_district,
          date_of_birth: user.date_of_birth,
          bio: user.bio,
          is_online: true, // Optional: client side tiện xử lý
        }
      });
    } else {
      res.status(401).json({ msg: 'Retriving user failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Login failed' });
  }
};
