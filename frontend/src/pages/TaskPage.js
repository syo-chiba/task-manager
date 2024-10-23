import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskPage = () => {
  const [taskAdded, setTaskAdded] = useState(false);

  const handleTaskAdded = () => {
    setTaskAdded(!taskAdded);  // タスク追加後に再レンダリング
  };

  return (
    <div className="container">
      <h2>タスク管理ページ</h2>
      <h3>タスク一覧表</h3>
      <TaskList key={taskAdded} />
      <h3>タスクの新規追加</h3>
      <TaskForm onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default TaskPage;
