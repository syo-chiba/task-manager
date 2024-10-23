import axiosInstance from '../api/axiosInstance';

// タスクをIDで取得する関数
const getTaskById = async (id) => {
  try {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;  // 特定のタスクデータを返す
  } catch (error) {
    console.error('タスクの取得に失敗しました:', error);
    return null;  // エラー時はnullを返す
  }
};

// 他の関数も含めてエクスポート
const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('タスク一覧の取得に失敗しました:', error);
    return [];
  }
};

// タスクを更新する関数
const updateTask = async (id, updatedTask) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('タスクの更新に失敗しました:', error);
    throw error;  // エラーを再度スローすることで呼び出し元でハンドリング可能にする
  }
};

export default {
  getTasks,
  getTaskById,  // getTaskById関数をエクスポート
  updateTask
};
