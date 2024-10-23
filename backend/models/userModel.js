const pool = require('../config/database');

// ユーザーを新規作成する関数
exports.create = async (userData) => {
  const { email, password } = userData;
  const [result] = await pool.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password]
  );
  return { id: result.insertId, email };  // 作成したユーザーのIDとメールアドレスを返す
};

// メールアドレスでユーザーを検索する関数
exports.findByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  if (rows.length > 0) {
    return rows[0];  // ユーザーが見つかった場合はそのユーザー情報を返す
  } else {
    return null;  // ユーザーが見つからなかった場合はnullを返す
  }
};
