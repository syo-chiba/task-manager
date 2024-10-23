import React, { useState } from 'react';
import taskService from '../services/taskService';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description };
    await taskService.createTask(newTask);  // ローカルのデータに追加
    onTaskAdded();  // タスクが追加されたことを親コンポーネントに通知
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="タスクタイトル" 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="タスクの説明" 
      />
      <button type="submit">追加</button>
    </form>
  );
};

export default TaskForm;
