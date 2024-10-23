const express = require('express');
const { getAllTasks, getTaskById, createTask, updateTask } = require('../controllers/tasksController');  // getTaskById をインポート
const router = express.Router();

router.get('/', getAllTasks);  // タスク一覧を取得
router.get('/:id', getTaskById);  // 特定のタスクをIDで取得
router.post('/', createTask);  // タスクを新規作成
router.put('/:id', updateTask);  // タスク更新用のルート

module.exports = router;
