```
Aurora-Bites-main
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ logo.webp
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ default-user.png
│  │  ├─ empty-state.svg
│  │  └─ error.svg
│  ├─ components
│  │  └─ DropdownMenu
│  ├─ context
│  │  ├─ OrderContext.jsx
│  │  ├─ orderReducer.js
│  │  ├─ SettingsContext.jsx
│  │  └─ settingsHelpers.js
│  ├─ features
│  │  ├─ account
│  │  │  ├─ AvatarCropper.jsx
│  │  │  ├─ Slider.jsx
│  │  │  ├─ UpdatePassword.jsx
│  │  │  ├─ UpdateUserAvatar.jsx
│  │  │  ├─ User.jsx
│  │  │  └─ UserProfileSetting.jsx
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
│  │     ├─ RegularOpenHours.jsx
│  │     ├─ sortTimeSlots.js
│  │     ├─ SpecialOpenHours.jsx
│  │     ├─ StoreInfo.jsx
│  │     └─ validateOverlap.js
│  ├─ hooks
│  │  ├─ data
│  │  │  ├─ auth
│  │  │  │  ├─ useSignIn.js
│  │  │  │  ├─ useSignOut.js
│  │  │  │  ├─ useSignUp.js
│  │  │  │  ├─ useUpdateUserPassword.js
│  │  │  │  ├─ useUpdateUserProfile.js
│  │  │  │  ├─ useUpsertUserAvatar.js
│  │  │  │  └─ useUser.js
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
│  │  ├─ Account.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Inventory.jsx
│  │  ├─ Menu.jsx
│  │  ├─ MenuManage.jsx
│  │  ├─ Order.jsx
│  │  ├─ Orders.jsx
│  │  ├─ PageNotFound.jsx
│  │  ├─ Settings.jsx
│  │  └─ SignIn.jsx
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
│  │  ├─ ButtonSpinner.jsx
│  │  ├─ ConfirmDelete.jsx
│  │  ├─ ControlledInput.jsx
│  │  ├─ ControlledSelect.jsx
│  │  ├─ ControlledSwitch.jsx
│  │  ├─ DataDisplayCard.jsx
│  │  ├─ DateRangePicker.jsx
│  │  ├─ DiningMethodSwitch.jsx
│  │  ├─ DishCard.jsx
│  │  ├─ DropdownMenu.jsx
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
│  │  ├─ LoadingBars.jsx
│  │  ├─ Logo.jsx
│  │  ├─ Modal.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Note.jsx
│  │  ├─ NumericInput.jsx
│  │  ├─ OrderForm
│  │  │  ├─ CustomizeArea.jsx
│  │  │  ├─ Option.jsx
│  │  │  ├─ OrderForm.jsx
│  │  │  └─ orderFormHelpers.js
│  │  ├─ PageHeader.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ PasswordInput.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  ├─ QueryStatusFallback.jsx
│  │  ├─ ServingsControl.jsx
│  │  ├─ SettingFormSection.jsx
│  │  ├─ StoreStatusBadge .jsx
│  │  ├─ StyledDayPicker.jsx
│  │  ├─ StyledHotToast.jsx
│  │  └─ Tag.jsx
│  └─ utils
│     ├─ {fadeInAnimation}.js
│     ├─ handleSupabaseError.js
│     ├─ orderHelpers.js
│     └─ scrollToTop.js
└─ vite.config.js

```
