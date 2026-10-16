# Helper 與邏輯函式分層規範

本文件描述目前專案的工具函式位置與命名原則，新增或搬移函式時依此維持一致。

## 分層原則

- 跨 feature 使用的純函式放在 `src/utils/`，並依責任放入具體模組。
- 只服務單一 feature 的轉換、格式化、篩選或驗證邏輯放在 `src/features/<feature>/utils/`。
- React state、事件處理、資料請求流程留在元件或 hook；不要為了抽取而把 UI 流程搬進 utils。
- Context reducer、service/API 專屬邏輯留在各自的責任層。
- 避免使用過度籠統的 `helpers.js`、`utils.js`；檔名應說明資料領域或功能。

## 命名方式

- 檔名使用 camelCase，並以責任或資料領域命名，例如 `dateTime.js`、`orderData.js`、`inventoryFilters.js`。
- 函式使用 camelCase 動詞開頭，表達動作或結果，例如 `parseDateRange`、`buildOrderData`、`filterMenuData`。
- 同一流程的緊密協作函式放在同一檔；無關責任不要只因為檔案很小而合併。
- 元件、hooks、樣式工具不屬於通用純函式，不放進 `utils`。

## 共用工具

- `src/utils/text.js`：字串整理，例如 `trimString`。
- `src/utils/numbers.js`：數值解析，例如 `parsePositiveInt`。
- `src/utils/validation.js`：跨 feature 共用的 email、電話驗證。
- `src/utils/dateTime.js`：日期/時間解析、正規化與顯示格式化。
- `src/utils/queryFilters.js`：篩選 query string 的解析、驗證與更新。
- `src/utils/orderData.js`：被點餐、訂單與 reducer 共用的訂單計算、整理及庫存差異處理。
- `src/utils/orderFormatting.js`：跨畫面共用的訂單顯示格式。
- `src/utils/media/cropImage.js`：圖片裁切等媒體操作。
- `src/utils/toUser.js`：Supabase 使用者資料映射。
- `src/utils/showToast.jsx`：跨 feature 共用的 toast UI 副作用。
- `src/style/helpers.js`：樣式專用工具；不與業務 utils 混放。

## Feature 工具

- `src/features/dashboard/utils/`：dashboard 統計與訂單摘要顯示。
- `src/features/inventory/utils/`：庫存資料篩選與轉換。
- `src/features/menu-manage/utils/`：菜單表單/payload 映射與菜單篩選。
- `src/features/orders/utils/`：訂單編輯資料、選項、分頁、日期篩選與用餐資訊。
- `src/features/settings/utils/`：營業時間、時段標準化、桌號設定、時間選項與日期區間驗證。

## 抽取判斷

抽取前先確認函式是否為可獨立理解的純資料操作，以及是否有明確的共用範圍。若函式只服務單一元件且緊貼 UI 互動，留在元件內通常更清楚；若是獨立的資料規則，則依上述共用/feature 邊界放置。搬移時一併更新所有引用，避免保留長期相容用的舊 helper 檔名。
