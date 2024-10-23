import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import taskService from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.getTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>  {/* タスク詳細ページへのリンク */}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
