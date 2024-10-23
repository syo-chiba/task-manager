const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // 認証関連のルート
const taskRoutes = require('./routes/tasks'); // タスク関連のルート

const app = express();

// CORS設定
app.use(cors());

// リクエストボディのパース
app.use(bodyParser.json());

// 認証関連のAPIルート
app.use('/api/auth', authRoutes);

// タスク関連のAPIルート
app.use('/api/tasks', taskRoutes);

// サーバーの起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
