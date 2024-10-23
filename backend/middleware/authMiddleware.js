const jwt = require('jsonwebtoken');

// 認証ミドルウェア
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');  // Authorizationヘッダーからトークンを取得

  if (!token) {
    return res.status(401).json({ message: '認証トークンがありません。' });
  }

  try {
    // トークンを検証
    const decoded = jwt.verify(token, 'your_jwt_secret');  // 'your_jwt_secret' はJWTの秘密鍵
    req.user = decoded;  // デコードしたユーザー情報をリクエストに追加
    next();  // 次のミドルウェアへ進む
  } catch (err) {
    return res.status(401).json({ message: '無効なトークンです。' });
  }
};

module.exports = authMiddleware;
