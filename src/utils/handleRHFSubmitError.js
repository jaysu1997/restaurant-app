// 處理React Hook Form的提交錯誤
import StyledHotToast from "../ui/StyledHotToast";

function handleRHFSubmitError(error, errorTitle = "提交失敗") {
  console.log(errorTitle, error);
  // 透過反覆遍歷取得所有欄位的錯誤訊息
  const getAllMessages = (errors) => {
    return Object.keys(errors).flatMap((key) => {
      const error = errors[key];
      if (error.message) {
        return [error.message];
      }
      if (typeof error === "object") {
        return getAllMessages(error);
      }
      return [];
    });
  };

  // 彈出錯誤提示toast
  StyledHotToast({
    type: "error",
    title: errorTitle,
    content: `${getAllMessages(error).join("， ")}。`,
  });
}

export { handleRHFSubmitError };
