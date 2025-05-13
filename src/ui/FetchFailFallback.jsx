function FetchFailFallback() {
  return (
    <div>
      <p>數據獲取失敗</p>
      <button onClick={() => window.location.reload()}>重新整理</button>
    </div>
  );
}

export default FetchFailFallback;
