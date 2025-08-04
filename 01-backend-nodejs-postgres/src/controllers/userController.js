const { findUserByEmail, findUserByName, updateUserProfile, findUserByEmailWithNotPassword, updateUserOnlineStatus } = require('../models/userModel');
const bcrypt = require('bcrypt');

const updateUserController = async (req, res) => {
    const {
        email,
        username,
        password,
        full_name,
        gender,
        date_of_birth,
        phone,
        province,
        district,
        nationality,
        currentPassword,
        bio,
    } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Missing email" });
    }

    try {
        const userResult = await findUserByEmail(email);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentUser = userResult.rows[0];

        // Check username duplication
        if (username && username !== currentUser.username) {
            const usernameCheck = await findUserByName(username);
            if (usernameCheck.rows.length > 0) {
                return res.status(400).json({ message: "Username already exists" });
            }
        }

        const updates = {};

        // Only update if value provided
        if (username) updates.username = username.trim();
        if (req.file) updates.avatar = req.file.buffer;
        if (full_name) updates.full_name = full_name.trim();
        if (gender) updates.gender = gender.trim();
        if (date_of_birth) updates.date_of_birth = date_of_birth;
        if (phone) updates.phone = phone.trim();
        if (province) updates.address_province = province.trim();
        if (district) updates.address_district = district.trim();
        if (nationality) updates.nationality = nationality.trim();
        if (bio) updates.bio = bio.trim();

        // Update password if provided
        if (password?.trim()) {
            if (!currentPassword) {
                return res.status(400).json({ message: 'Vui lòng nhập mật khẩu hiện tại' });
            }

            if (!currentUser.password) {
                return res.status(500).json({ message: 'Tài khoản chưa có mật khẩu, không thể đổi' });
            }

            const isMatch = await bcrypt.compare(currentPassword, currentUser.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu hiện tại không chính xác' });
            }

            const updatedPassword = await bcrypt.hash(password.trim(), 10);
            updates.password = updatedPassword;
        }

        const updatedUser = await updateUserProfile(email, updates);

        return res.status(200).json({
            message: "Cập nhật thành công",
            success: true,
            user: updatedUser
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng" });
    }
};

const getAccountController = async (req, res) => {
    try {
        const email = req.user?.email || req.query.email;

        const userResult = await findUserByEmailWithNotPassword(email);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userResult.rows[0];

        // Convert avatar buffer to base64
        if (user.avatar) {
            user.avatar = `data:image/jpeg;base64,${Buffer.from(user.avatar).toString("base64")}`;
        }

        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
    }
};

const logout = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "Không xác định được người dùng" });
        }

        await updateUserOnlineStatus(userId, false);

        res.status(200).json({ success: true, message: "Đăng xuất thành công" });
    } catch (err) {
        console.error("Lỗi logout:", err);
        res.status(500).json({ message: "Đã xảy ra lỗi khi đăng xuất" });
    }
};

module.exports = {
    updateUserController, getAccountController, logout
};