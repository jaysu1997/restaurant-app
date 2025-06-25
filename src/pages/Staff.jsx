function Staff() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <label>
        信箱
        <input name="account" />
      </label>

      <label>
        密碼
        <input name="password" />
      </label>
      <button>註冊</button>
    </form>
  );
}

export default Staff;
