import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import taskService from '../services/taskService';

const TaskDetail = () => {
  const { id } = useParams();  // URLパラメータからタスクIDを取得
  const [task, setTask] = useState(null);  // タスクデータ
  const [isEditing, setIsEditing] = useState(false);  // 編集モードの状態
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);  // 読み込み中かどうか
  const [error, setError] = useState(null);  // エラーメッセージ

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);  // 読み込み中にする
        const fetchedTask = await taskService.getTaskById(Number(id));  // タスクIDでタスクを取得
        if (fetchedTask) {
          setTask(fetchedTask);
          setTitle(fetchedTask.title);
          setDescription(fetchedTask.description);
        } else {
          setError('タスクが見つかりません');
        }
      } catch (err) {
        setError('タスクの取得に失敗しました');
      } finally {
        setLoading(false);  // 読み込み終了
      }
    };

    fetchTask();
  }, [id]);

  // 読み込み中の表示
  if (loading) {
    return <p>読み込み中...</p>;
  }

  // エラーが発生した場合の表示
  if (error) {
    return <p>{error}</p>;
  }

  // タスクが見つからなかった場合の表示
  if (!task) {
    return <p>タスクが見つかりません。</p>;
  }

  // 編集フォームの送信処理
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description };
    try {
      const updatedTaskResponse = await taskService.updateTask(task.id, updatedTask);  // タスクを更新
      setTask(updatedTaskResponse);  // 更新されたタスク情報をセット
      setIsEditing(false);  // 編集モードを終了
    } catch (error) {
      setError('タスクの更新に失敗しました');
    }
  };

  return (
    <div className="container">
      <h2>{isEditing ? "タスク編集" : "タスク詳細"}</h2>

      {/* 編集モードの場合、編集フォームを表示 */}
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <p>タスクタイトル</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タスクタイトル"
          />
          <p>タスク内容</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="タスクの説明"
          />
          <div>
            <button type="submit">保存</button>
            <button type="button" onClick={() => setIsEditing(false)}>キャンセル</button>
          </div>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>編集</button>  {/* 編集ボタン */}
        </>
      )}
    </div>
  );
};

export default TaskDetail;
