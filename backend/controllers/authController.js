const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// ユーザー登録
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'ユーザー登録が完了しました', user: newUser });
  } catch (error) {
    res.status(500).json({ message: '登録に失敗しました', error });
  }
};

// ログイン処理
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: '認証に失敗しました' });
    }

    // JWTを発行
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'ログインに失敗しました', error });
  }
};
