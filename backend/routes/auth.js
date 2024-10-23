const express = require('express');
const { register, login } = require('../controllers/authController'); // コントローラを正しくインポート
const router = express.Router();

// ユーザー登録ルート
router.post('/register', register);

// ログインルート
router.post('/login', login);

module.exports = router;
