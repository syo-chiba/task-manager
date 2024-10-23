import React, { useState } from 'react';
import axios from '../api/axiosInstance';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    await axios.post('/login', credentials);
    // ログイン成功後の処理
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="メールアドレス" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="パスワード" 
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default AuthForm;
