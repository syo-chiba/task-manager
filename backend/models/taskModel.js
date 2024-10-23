const pool = require('../config/database');  // データベース接続

// タスクをすべて取得する関数
exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM tasks');
  return rows;
};

// 特定のタスクをIDで取得する関数
exports.getTaskById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
  if (rows.length > 0) {
    return rows[0];  // タスクが見つかった場合はそのタスクを返す
  } else {
    return null;  // タスクが見つからなかった場合はnullを返す
  }
};

// タスクを新規作成する関数
exports.create = async (taskData) => {
  const { title, description } = taskData;
  const [result] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
  return { id: result.insertId, title, description };
};

// タスクを更新する関数
exports.updateTask = async (id, taskData) => {
  const { title, description } = taskData;
  const [result] = await pool.query(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
    [title, description, id]
  );
  if (result.affectedRows > 0) {
    return { id, title, description };
  } else {
    return null;  // タスクが見つからない場合
  }
};
