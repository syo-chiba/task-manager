import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <h1>ホームページ</h1>
      <p>タスク管理アプリへようこそ！</p>
      <Link to="/tasks">タスク管理ページに移動</Link>
    </div>
  );
};

export default HomePage;
