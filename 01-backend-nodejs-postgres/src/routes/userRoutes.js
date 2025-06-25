const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/update', userController.updateUserController);
router.get('/account', userController.getAccountController);

module.exports = router;
