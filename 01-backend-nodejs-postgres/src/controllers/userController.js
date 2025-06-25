const { updateUser, findUserByEmail, findUserByName } = require('../models/userModel');
const bcrypt = require('bcrypt');

const updateUserController = async (req, res) => {
    const { email, username, password, gender, nationality, phoneNumber, currentPassword } = req.body;

    const user = await findUserByName(username);

    if (user.rows.length > 0) {
        return res.status(400).json({ message: "Username already existed" })
    }

    if (!email) {
        return res.status(400).json({ message: "Missing email" });
    }

    try {
        // Tìm user hiện tại theo email
        const userResult = await findUserByEmail(email);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentUser = userResult.rows[0];

        // Nếu có yêu cầu đổi password, phải kiểm tra currentPassword
        let updatedPassword = currentUser.password;
        if (password?.trim()) {
            // Nếu currentPassword là undefined hoặc rỗng, trả về lỗi
            if (!currentPassword) {
                return res.status(400).json({ message: 'Vui lòng nhập mật khẩu hiện tại' });
            }

            const isMatch = await bcrypt.compare(currentPassword || '', currentUser.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu hiện tại không chính xác' });
            }

            // Hash password mới
            updatedPassword = await bcrypt.hash(password.trim(), 10);
        }

        // Giữ lại thông tin cũ nếu không thay đổi
        const updatedUsername = username?.trim() || currentUser.username;
        const updatedGender = gender?.trim() || currentUser.gender;
        const updatedNationality = nationality?.trim() || currentUser.nationality;
        const updatedPhone = phoneNumber?.trim() || currentUser.phonenumber;

        // Gọi update trong DB
        await updateUser(
            email,
            updatedUsername,
            updatedPassword,
            updatedGender,
            updatedNationality,
            updatedPhone
        );


        return res.status(200).json(
            {
                message: "Cập nhật thành công",
                success: true
            });
    } catch (err) {
        //console.error(err);
        res.status(500).json({ message: "Error updating data" });
    }

};

const getAccountController = async (req, res) => {
    return res.status(200).json(req.user);

}

module.exports = {
    updateUserController, getAccountController
};