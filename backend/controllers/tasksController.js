const Task = require('../models/taskModel');

// タスク一覧を取得する関数
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'タスクの取得に失敗しました' });
  }
};

// 特定のタスクをIDで取得する関数
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;  // URLからタスクIDを取得
    const task = await Task.getTaskById(taskId);  // タスクをIDで取得
    if (task) {
      res.json(task);  // タスクをクライアントに返す
    } else {
      res.status(404).json({ message: 'タスクが見つかりません' });
    }
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};

// タスクを作成する関数
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'タスクの作成に失敗しました' });
  }
};

// タスクを更新するコントローラ関数
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const updatedTask = await Task.updateTask(taskId, updatedTaskData);
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'タスクが見つかりません' });
    }
  } catch (error) {
    res.status(500).json({ message: 'タスクの更新に失敗しました', error });
  }
};