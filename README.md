# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```
Aurora-Bites-main
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ logo.png
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ empty-state.svg
│  │  ├─ empty-state1.svg
│  │  ├─ error.svg
│  │  └─ man.png
│  ├─ context
│  │  ├─ OrderContext.jsx
│  │  └─ orderReducer.js
│  ├─ features
│  │  ├─ dashboard
│  │  │  ├─ analyzeOrders.js
│  │  │  ├─ PeakHoursChart.jsx
│  │  │  ├─ RevenueTrendChart.jsx
│  │  │  ├─ StatsCards.jsx
│  │  │  ├─ StatsCharts.jsx
│  │  │  ├─ TodayOrderList.jsx
│  │  │  └─ TopDishesChart.jsx
│  │  ├─ inventory
│  │  │  ├─ InventoryDataCard.jsx
│  │  │  └─ UpsertInventoryForm.jsx
│  │  ├─ menu
│  │  │  ├─ CartItem.jsx
│  │  │  ├─ EmptyShoppingCart.jsx
│  │  │  ├─ MenuView.jsx
│  │  │  ├─ OrderInfoField.jsx
│  │  │  ├─ ShoppingCart.jsx
│  │  │  └─ SwiperBar.jsx
│  │  ├─ menu-manage
│  │  │  ├─ createNewIngredients.js
│  │  │  ├─ FieldArray.jsx
│  │  │  ├─ MenusDataCard.jsx
│  │  │  ├─ NestedFieldArray.jsx
│  │  │  └─ UpsertMenuForm.jsx
│  │  ├─ orders
│  │  │  ├─ CategoryGroup.jsx
│  │  │  ├─ MiniMenu.jsx
│  │  │  ├─ OrderDishes.jsx
│  │  │  ├─ OrderDropdownMenu.jsx
│  │  │  ├─ OrderOperation.jsx
│  │  │  ├─ OrderRow.jsx
│  │  │  ├─ OrdersTable.jsx
│  │  │  ├─ OrderSummaryEdit.jsx
│  │  │  └─ OrderSummaryView.jsx
│  │  └─ settings
│  │     ├─ ControlledTimeRange.jsx
│  │     ├─ DineInTableSettings.jsx
│  │     ├─ RegularBusinessHours.jsx
│  │     ├─ sortTimeSlots.js
│  │     ├─ SpecialBusinessHours.jsx
│  │     ├─ StoreInfo.jsx
│  │     └─ validateOverlap.js
│  ├─ hooks
│  │  ├─ data
│  │  │  ├─ auth
│  │  │  │  ├─ useSignIn.js
│  │  │  │  └─ useSignUp.js
│  │  │  ├─ inventory
│  │  │  │  ├─ useDeleteInventory.js
│  │  │  │  ├─ useGetInventory.js
│  │  │  │  └─ useUpsertInventory.js
│  │  │  ├─ menus
│  │  │  │  ├─ useDeleteMenu.js
│  │  │  │  ├─ useGetFilterData.js
│  │  │  │  ├─ useGetMenus.js
│  │  │  │  └─ useUpsertMenu.js
│  │  │  ├─ orders
│  │  │  │  ├─ useAnalyzedOrders.js
│  │  │  │  ├─ useCreateOrder.js
│  │  │  │  ├─ useDeleteOrder.js
│  │  │  │  ├─ useGetOrder.js
│  │  │  │  ├─ useGetPaginatedOrders.js
│  │  │  │  └─ useUpdateOrder.js
│  │  │  └─ settings
│  │  │     ├─ useGetSettings.js
│  │  │     └─ useUpsertSettings.js
│  │  └─ ui
│  │     └─ useClickOutside.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Dashboard.jsx
│  │  ├─ Inventory.jsx
│  │  ├─ Menu.jsx
│  │  ├─ MenuManage.jsx
│  │  ├─ Order.jsx
│  │  ├─ Orders.jsx
│  │  ├─ PageNotFound.jsx
│  │  └─ Settings.jsx
│  ├─ services
│  │  ├─ apiAuth.js
│  │  ├─ apiInventory.js
│  │  ├─ apiMenus.js
│  │  ├─ apiOrder.js
│  │  ├─ apiSettings.js
│  │  └─ supabase.js
│  ├─ style
│  │  └─ GlobalStyles.js
│  ├─ ui
│  │  ├─ AppLayout.jsx
│  │  ├─ Button.jsx
│  │  ├─ ConfirmDelete.jsx
│  │  ├─ ControlledInput.jsx
│  │  ├─ ControlledSelect.jsx
│  │  ├─ ControlledSwitch.jsx
│  │  ├─ DataDisplayCard.jsx
│  │  ├─ DateRangePicker.jsx
│  │  ├─ DiningMethodSwitch.jsx
│  │  ├─ DishCard.jsx
│  │  ├─ EmptyStateFallback.jsx
│  │  ├─ ErrorFallback.jsx
│  │  ├─ FetchFailFallback.jsx
│  │  ├─ Filter
│  │  │  ├─ DateRangeFilter.jsx
│  │  │  ├─ Filter.jsx
│  │  │  ├─ filterHelpers.js
│  │  │  ├─ SearchFilter.jsx
│  │  │  └─ SelectFilter.jsx
│  │  ├─ FormErrorsMessage.jsx
│  │  ├─ FormFieldset.jsx
│  │  ├─ FormRow.jsx
│  │  ├─ FormTable.jsx
│  │  ├─ FormTypography.jsx
│  │  ├─ Header.jsx
│  │  ├─ Image.jsx
│  │  ├─ LoadingDotMini.jsx
│  │  ├─ LoadingSpinner.jsx
│  │  ├─ Logo.jsx
│  │  ├─ Modal.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Note.jsx
│  │  ├─ OrderForm
│  │  │  ├─ CustomizeArea.jsx
│  │  │  ├─ Option.jsx
│  │  │  ├─ OrderForm.jsx
│  │  │  └─ orderFormHelpers.js
│  │  ├─ PageHeader.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ QueryStatusFallback.jsx
│  │  ├─ ServingsControl.jsx
│  │  ├─ SettingFormSection.jsx
│  │  ├─ StyledDayPicker.jsx
│  │  ├─ StyledHotToast.jsx
│  │  ├─ Tag.jsx
│  │  └─ User.jsx
│  └─ utils
│     ├─ fadeInAnimation.js
│     ├─ handleSupabaseError.js
│     ├─ orderHelpers.js
│     └─ scrollToTop.js
└─ vite.config.js

```