// 表單備註元件
function Note({ register }) {
  return (
    <textarea
      maxLength="50"
      placeholder="備註內容最多50個字"
      {...register("note")}
    />
  );
}

export default Note;
