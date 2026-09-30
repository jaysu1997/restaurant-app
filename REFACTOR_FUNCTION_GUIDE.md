# 功能函式整理與重構建議

這份文件是針對目前專案中各類功能函式的整理建議，目標是讓元件、工具函式、業務邏輯的責任邊界更清楚，並讓未來新增檔案時有可依循的規則。

---

## 一、整理原則

1. 純函式、資料轉換、格式化、驗證、查詢參數解析，應該抽出到 utils。
2. React 的事件處理、狀態更新、表單提交流程，保留在元件或 hook 裡。
3. 一個檔案只處理一類責任，避免「元件檔內混著 UI + 邏輯 + 轉換」的情況。
4. 跨 feature 共用的函式，放在共用層；只屬於某一個 feature 的函式，放在該 feature 的 utils。

---

## 二、建議的資料夾規則

### 1. 共用層

建議保留以下共用資料夾：

- src/utils/
  - 放跨 feature 的通用函式
  - 例如：格式化、驗證、日期工具、字串工具、查詢參數工具

如果之後規模變大，可進一步拆成：

- src/utils/date/
- src/utils/string/
- src/utils/validation/
- src/utils/query/

### 2. Feature 層

每個 feature 建議維持以下結構：

- src/features/<feature>/components/
  - UI 元件
- src/features/<feature>/utils/
  - 該 feature 的純函式與轉換邏輯
- src/features/<feature>/hooks/
  - 該 feature 專屬 hook

---

## 三、哪些函式應該從元件中抽出來

### 1. 這類函式建議抽出到 utils

這些函式通常是「純資料轉換」、「判斷」、「格式化」或「驗證」，不應該留在元件裡。

#### a. 日期與時間相關

- DateRangePicker 中的 formatRangeDate
  - 備註：這是格式化函式，且可能被其他元件重用，建議抽出到 src/utils/date/dateRange.js
- RangeCalendar 中的 normalizeDate
  - 備註：純輸入標準化邏輯，建議抽出到 src/utils/date/dateRange.js

#### b. 選項與資料轉換相關

- DiningInfoField 中的 ensureOptionExists
  - 備註：屬於選項資料補齊邏輯，建議抽出到 src/features/orders/utils/diningInfoUtils.js
- MiniMenu 中的 groupDishesByCategory
  - 備註：資料分組邏輯，建議抽出到 src/features/orders/utils/menuGrouping.js
- useOrderEdit 中的 toSelectOption、toPickupTimeOption、createDraftItems
  - 備註：這些都是表單預設值轉換邏輯，建議抽出到 src/features/orders/utils/orderEditUtils.js

#### c. 表單與資料映射相關

- MenuTransform 中的 transformIngredients、transformImageData
  - 備註：這些是 payload 轉換邏輯，可維持在 menuTransform.js，若後續再擴大，建議拆成兩個檔案：
    - formMapper.js
    - payloadBuilder.js

#### d. 驗證與排序相關

- settings 的 normalizeDaySlots、normalizeRegularOpenHours、normalizeSpecialOpenHours
  - 備註：屬於 settings 的業務資料整理，建議集中到 src/features/settings/utils/openHoursUtils.js
- settings 的 validateDateRangeField
  - 備註：屬於營業時間日期重疊驗證，建議集中到 src/features/settings/utils/dateRangeValidation.js

---

## 四、哪些函式可以放在同一個檔案內

### 1. 這類函式適合放在同一個檔案裡

#### a. 同一個業務流程的相關函式

- Dashboard 統計相關
  - updateLast7DaysStats
  - updateHourlyOrders
  - updateDishStats
  - getTopDishesFromStats
  - getDashboardStats
  - 備註：這些邏輯高度相關，現在放在 src/features/dashboard/utils/getDashboardStats.js 是合理的，不需要再拆太細。

#### b. 同一個功能表單的轉換邏輯

- menu-manage 的 toMenuForm、toMenuPayload
  - 備註：這兩個函式本質上是同一組「表單轉換」流程，放在同一個檔案中很合適。

#### c. 同一個 feature 的小型工具

- menu 的 getSelectedCategory
  - 備註：如果只是單一查詢參數判斷，放在 src/features/menu/utils/menuHelpers.js 就夠清楚。

---

## 五、各個 feature 的建議整理方式

### 1. account

建議目錄：

- src/features/account/components/
- src/features/account/utils/

建議保留：

- AvatarCropper、Slider、UpdatePassword、UpdateUserAvatar、UserProfileSetting 仍然維持為元件檔

建議抽出：

- AvatarCropper 中的裁切與保存前的資料準備邏輯，若後續變複雜，可抽到
  - src/features/account/utils/avatarCropUtils.js

備註：

- cropImage、showToast 這兩個已經屬於共用工具，應該維持在 src/utils。

### 2. dashboard

建議目錄：

- src/features/dashboard/components/
- src/features/dashboard/utils/

建議保留：

- getDashboardStats.js 這一個檔案即可

建議抽出：

- 若之後需要拆分，先依照統計維度拆：
  - revenueStats.js
  - orderStats.js
  - dishStats.js

備註：

- 目前這個區塊的函式高度關聯，保留在同一個檔案是比較好的做法。

### 3. inventory

建議目錄：

- src/features/inventory/components/
- src/features/inventory/utils/

建議保留：

- InventoryForm、RelatedMenus 仍然是元件與頁面型組件

建議抽出：

- 如果未來出現更多表單預設值、關聯 menu 的轉換邏輯，應該移到
  - src/features/inventory/utils/inventoryFormUtils.js

### 4. menu

建議目錄：

- src/features/menu/components/
- src/features/menu/utils/

建議保留：

- getSelectedCategory 放在 menuHelpers.js

建議抽出：

- 若後續有更多查詢參數判斷、分類邏輯，可新增：
  - src/features/menu/utils/categoryUtils.js
  - src/features/menu/utils/cartUtils.js

備註：

- 目前 MenuList、CategoryBar、ShoppingCart 等元件中若有純資料整理邏輯，應往 utils 抽。

### 5. menu-manage

建議目錄：

- src/features/menu-manage/components/
- src/features/menu-manage/utils/

建議保留：

- menuTransform.js 是目前很合適的檔案，因為它已經把表單與 payload 轉換集中在一起

建議抽出：

- 若要再更清楚，可拆成：
  - src/features/menu-manage/utils/menuFormMapper.js
  - src/features/menu-manage/utils/menuPayloadBuilder.js

### 6. orders

建議目錄：

- src/features/orders/components/
- src/features/orders/utils/
- src/features/orders/hooks/

建議抽出：

- toSelectOption、toPickupTimeOption、createDraftItems
  - 建議放到 src/features/orders/utils/orderEditUtils.js
- ensureOptionExists
  - 建議放到 src/features/orders/utils/diningInfoUtils.js
- groupDishesByCategory
  - 建議放到 src/features/orders/utils/menuGrouping.js

備註：

- OrderItemForm、OrderOverview、OrderDishes 等元件內的「純判斷與轉換邏輯」若太多，應逐步移到 utils。

### 7. settings

建議目錄：

- src/features/settings/components/
- src/features/settings/utils/

建議集中建立以下檔案：

- src/features/settings/utils/openHoursUtils.js
  - 放入：
    - parseYMD
    - minutesToDate
    - formatPickupStr
    - matchOpenHours
    - getOpenHoursInfo
    - getOpenStatus
    - generatePickupTimeOptions
    - canCreateOrder

- src/features/settings/utils/timeSlotUtils.js
  - 放入：
    - normalizeDaySlots
    - normalizeRegularOpenHours
    - normalizeSpecialOpenHours

- src/features/settings/utils/dateRangeValidation.js
  - 放入：
    - validateDateRangeField

- src/features/settings/utils/tableConfigUtils.js
  - 放入：
    - generateTableNumbers
    - generateDineInTableOptions

備註：

- 這一塊是目前最值得優先整理的區域，因為目前的 settingsHelpers 已經混入過多責任。

### 8. staff

建議目錄：

- src/features/staff/components/
- src/features/staff/utils/

建議抽出：

- 如果未來有表單驗證、資料整理、角色轉換邏輯，可統一放到：
  - src/features/staff/utils/staffFormUtils.js

---

## 六、共用層建議新增的檔案

### 1. src/utils/date/dateRange.js

建議放入：

- formatRangeDate
- normalizeDate
- parseYMD
- minutesToDate

### 2. src/utils/validation/phone.js

建議放入：

- validatePhoneNumber

### 3. src/utils/validation/common.js

建議放入：

- trimString
- parsePositiveInt

### 4. src/utils/query/filters.js

建議放入：

- getValidParam
- parseDateRange
- parseFilterQuery
- hasActiveFilters
- buildSearchParams

### 5. src/utils/media/cropImage.js

建議保留：

- cropImage

---

## 七、建議的實施順序

1. 先整理 settings，因為它是目前最混亂的區塊。
2. 再整理 orders，因為有多個表單轉換與資料映射邏輯。
3. 再整理 components 內的純函式，抽到 utils。
4. 最後整理共用層，避免 utils 內的檔案過度泛化。

---

## 八、總結

如果要把這個專案維持在一個比較乾淨的結構，最重要的是兩件事：

1. feature 專屬邏輯放 feature/utils
2. 共用、可重用、純函式放 src/utils

只要做到這兩點，這個專案的檔案分類與函式責任邊界就會大幅清楚。
