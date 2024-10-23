// エラーハンドリングミドルウェア
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);  // エラーログをコンソールに表示

  // クライアントにエラーメッセージを返す
  res.status(err.status || 500).json({
    message: err.message || 'サーバーエラーが発生しました。',
  });
};

module.exports = errorMiddleware;
