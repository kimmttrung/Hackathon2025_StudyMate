const folderModel = require('../models/folderModel');

// Tạo folder mới
async function createFolder(req, res) {
  const { user_id, name } = req.body;
  console.log("check body", req.body);

  if (!user_id || !name) {
    return res.status(400).json({ error: 'user_id and name are required' });
  }

  try {
    const newFolder = await folderModel.createFolder(user_id, name);
    res.status(201).json(newFolder);
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Lấy tất cả folder của user, sắp xếp theo name/created_at/last_update
async function getAllFolders(req, res) {
  const { user_id } = req.params;
  const { sortBy = 'created_at', sortOrder = 'asc' } = req.query;

  try {
    const folders = await folderModel.getAllFolders(user_id, sortBy, sortOrder);
    res.status(200).json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createFolder,
  getAllFolders,
};
