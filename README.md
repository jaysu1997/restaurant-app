
```
restaurant-app
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
│  │  ├─ empty-cart.svg
│  │  ├─ empty-state.svg
│  │  ├─ error.svg
│  │  ├─ page-not-found.svg
│  │  └─ warning.svg
│  ├─ components
│  │  ├─ FormSection.jsx
│  │  ├─ PasswordInput.jsx
│  │  └─ ScrollToTop.jsx
│  ├─ context
│  │  ├─ order
│  │  │  ├─ orderReducer.js
│  │  │  └─ useOrder.js
│  │  └─ settings
│  ├─ features
│  │  ├─ account
│  │  │  ├─ AvatarCropper.jsx
│  │  │  ├─ Slider.jsx
│  │  │  ├─ UpdatePassword.jsx
│  │  │  ├─ UpdateUserAvatar.jsx
│  │  │  └─ UserProfileSetting.jsx
│  │  ├─ auth
│  │  │  ├─ api
│  │  │  │  ├─ getCurrentUser.js
│  │  │  │  ├─ login.js
│  │  │  │  └─ logout.js
│  │  │  └─ hooks
│  │  │     ├─ useLogin.js
│  │  │     ├─ useLogout.js
│  │  │     └─ useUser.js
│  │  ├─ dashboard
│  │  │  ├─ components
│  │  │  │  ├─ EmptyState.jsx
│  │  │  │  ├─ PeakHoursChart.jsx
│  │  │  │  ├─ RevenueTrendChart.jsx
│  │  │  │  ├─ StatItem.jsx
│  │  │  │  ├─ StatsCards.jsx
│  │  │  │  ├─ StatsCharts.jsx
│  │  │  │  ├─ StoreStatusBadge.jsx
│  │  │  │  ├─ TodayOrderList.jsx
│  │  │  │  └─ TopDishesChart.jsx
│  │  │  └─ utils
│  │  │     └─ getDashboardStats.js
│  │  ├─ inventory
│  │  │  ├─ InventoryDataCard.jsx
│  │  │  ├─ InventoryForm.jsx
│  │  │  └─ RelatedMenus.jsx
│  │  ├─ menu
│  │  │  ├─ CartItem.jsx
│  │  │  ├─ CartOpenButton.jsx
│  │  │  ├─ EmptyShoppingCart.jsx
│  │  │  ├─ MenuList.jsx
│  │  │  ├─ OrderInfoField.jsx
│  │  │  ├─ ShoppingCart.jsx
│  │  │  └─ SwiperBar.jsx
│  │  ├─ menu-manage
│  │  │  ├─ CustomizeScetion.jsx
│  │  │  ├─ IngredientScetion.jsx
│  │  │  ├─ MenuForm.jsx
│  │  │  ├─ MenusDataCard.jsx
│  │  │  ├─ menuSubmitNormalizer.js
│  │  │  └─ OptionSection.jsx
│  │  ├─ orders
│  │  │  ├─ api
│  │  │  │  └─ getRecentOrders.js
│  │  │  ├─ CategoryGroup.jsx
│  │  │  ├─ context
│  │  │  │  └─ OrderContext.jsx
│  │  │  ├─ hooks
│  │  │  │  └─ useRecentOrders.js
│  │  │  ├─ MiniMenu.jsx
│  │  │  ├─ OrderCard.jsx
│  │  │  ├─ OrderDishes.jsx
│  │  │  ├─ OrderDropdownMenu.jsx
│  │  │  ├─ OrderOperation.jsx
│  │  │  ├─ OrdersTable.jsx
│  │  │  ├─ OrderSummaryEdit.jsx
│  │  │  └─ OrderSummaryView.jsx
│  │  ├─ settings
│  │  │  ├─ api
│  │  │  │  └─ getSettings.js
│  │  │  ├─ context
│  │  │  │  └─ SettingsContext.jsx
│  │  │  ├─ ControlledTimeRange.jsx
│  │  │  ├─ DineInTableSettings.jsx
│  │  │  ├─ hooks
│  │  │  │  ├─ useGetSettings.js
│  │  │  │  ├─ useOpenStatus.js
│  │  │  │  └─ useSettings.js
│  │  │  ├─ RegularOpenHours.jsx
│  │  │  ├─ sortTimeSlots.js
│  │  │  ├─ SpecialOpenHours.jsx
│  │  │  ├─ StoreInfo.jsx
│  │  │  ├─ utils
│  │  │  │  └─ settingsHelpers.js
│  │  │  └─ validateOverlap.js
│  │  └─ staff
│  │     ├─ Signup.jsx
│  │     └─ StaffList.jsx
│  ├─ hooks
│  │  ├─ data
│  │  │  ├─ auth
│  │  │  │  ├─ useUpdateUserAvatar.js
│  │  │  │  ├─ useUpdateUserPassword.js
│  │  │  │  └─ useUpdateUserProfile.js
│  │  │  ├─ inventory
│  │  │  │  ├─ useDeleteInventory.js
│  │  │  │  ├─ useGetInventory.js
│  │  │  │  └─ useSubmitInventory.js
│  │  │  ├─ menus
│  │  │  │  ├─ useDeleteMenu.js
│  │  │  │  ├─ useGetMenus.js
│  │  │  │  ├─ useIngredientRelatedMenus.js
│  │  │  │  └─ useSubmitMenuForm.js
│  │  │  ├─ orders
│  │  │  │  ├─ useCreateOrder.js
│  │  │  │  ├─ useDeleteOrder.js
│  │  │  │  ├─ useGetOrder.js
│  │  │  │  ├─ useGetPaginatedOrders.js
│  │  │  │  └─ useUpdateOrder.js
│  │  │  ├─ settings
│  │  │  │  └─ useSubmitSettings.js
│  │  │  └─ staff
│  │  │     ├─ useCreateStaff.js
│  │  │     ├─ useDeleteStaff.js
│  │  │     ├─ useGetStaff.js
│  │  │     └─ useUpdateStaff.js
│  │  ├─ useClickOutside.js
│  │  ├─ useMediaQuery.js
│  │  └─ useScrollLock.js
│  ├─ layout
│  │  ├─ AppLayout.jsx
│  │  ├─ Header.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ NavItem.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  └─ User.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Account.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Inventory.jsx
│  │  ├─ Login.jsx
│  │  ├─ Menu.jsx
│  │  ├─ MenuManage.jsx
│  │  ├─ Order.jsx
│  │  ├─ Orders.jsx
│  │  ├─ PageNotFound.jsx
│  │  ├─ Settings.jsx
│  │  └─ Staff.jsx
│  ├─ services
│  │  ├─ apiAuth.js
│  │  ├─ apiInventory.js
│  │  ├─ apiMenus.js
│  │  ├─ apiOrder.js
│  │  ├─ apiSettings.js
│  │  ├─ apiStaff.js
│  │  ├─ handleEdgeFunctionError.js
│  │  ├─ handleSupabaseApiError.js
│  │  └─ supabase.js
│  ├─ style
│  │  └─ GlobalStyles.js
│  ├─ ui
│  │  ├─ Button.jsx
│  │  ├─ ButtonCancel.jsx
│  │  ├─ ButtonSpinner.jsx
│  │  ├─ ButtonSubmit.jsx
│  │  ├─ CloseButton.jsx
│  │  ├─ ConfirmDelete.jsx
│  │  ├─ ContentContainer.jsx
│  │  ├─ ControlledSelect.jsx
│  │  ├─ ControlledSwitch.jsx
│  │  ├─ DataDisplayCard.jsx
│  │  ├─ DateRangePicker.jsx
│  │  ├─ Description.jsx
│  │  ├─ DiningMethodSegmented.jsx
│  │  ├─ DishCard.jsx
│  │  ├─ Dot.jsx
│  │  ├─ DropdownMenu.jsx
│  │  ├─ ErrorBoundaryFallback.jsx
│  │  ├─ Filter
│  │  │  ├─ DateRangeFilter.jsx
│  │  │  ├─ Filter.jsx
│  │  │  ├─ filterHelpers.js
│  │  │  ├─ OptionFilter.jsx
│  │  │  └─ SearchFilter.jsx
│  │  ├─ FilterIcon.jsx
│  │  ├─ FormFieldLayout.jsx
│  │  ├─ FormInput.jsx
│  │  ├─ LoadingBars.jsx
│  │  ├─ Logo.jsx
│  │  ├─ Modal.jsx
│  │  ├─ Note.jsx
│  │  ├─ OrderForm
│  │  │  ├─ CustomizationField.jsx
│  │  │  ├─ Option.jsx
│  │  │  └─ OrderForm.jsx
│  │  ├─ OrderItemActions.jsx
│  │  ├─ PageContainer.jsx
│  │  ├─ PageHeader.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ Price.jsx
│  │  ├─ QueryStatusFallback.jsx
│  │  ├─ RequiredMark.jsx
│  │  ├─ SectionContainer.jsx
│  │  ├─ ServingsControl.jsx
│  │  ├─ StatusView.jsx
│  │  ├─ StyledDayRangePicker.jsx
│  │  ├─ StyledHotToast.jsx
│  │  ├─ StyledOverlay.jsx
│  │  ├─ StyledSelect.jsx
│  │  ├─ Tag.jsx
│  │  └─ UserAvatar.jsx
│  └─ utils
│     ├─ constants.js
│     ├─ helpers.js
│     ├─ orderHelpers.js
│     ├─ selectHelpers.js
│     └─ validation.js
└─ vite.config.js

```