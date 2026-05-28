
```
restaurant-app
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ logo.webp
├─ README.md
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
│  │  ├─ AppLayout.jsx
│  │  ├─ button
│  │  │  ├─ Button.jsx
│  │  │  ├─ IconButton.jsx
│  │  │  ├─ SubmitButton.jsx
│  │  │  └─ TextButton.jsx
│  │  ├─ ErrorBoundaryFallback.jsx
│  │  ├─ FeedbackState.jsx
│  │  ├─ FormSection.jsx
│  │  ├─ Header.jsx
│  │  ├─ Logo.jsx
│  │  ├─ ModalCloseButton.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ NavItem.jsx
│  │  ├─ Note.jsx
│  │  ├─ PasswordInput.jsx
│  │  ├─ Price.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  ├─ ScrollToTop.jsx
│  │  ├─ StyledOverlay.jsx
│  │  └─ User.jsx
│  ├─ context
│  │  ├─ orders
│  │  │  ├─ OrderContext.jsx
│  │  │  ├─ orderDraftReducer.js
│  │  │  └─ useOrderDraft.js
│  │  └─ settings
│  │     ├─ SettingsContext.jsx
│  │     ├─ settingsHelpers.js
│  │     └─ useSettings.js
│  ├─ features
│  │  ├─ account
│  │  │  ├─ AvatarCropper.jsx
│  │  │  ├─ Slider.jsx
│  │  │  ├─ UpdatePassword.jsx
│  │  │  ├─ UpdateUserAvatar.jsx
│  │  │  └─ UserProfileSetting.jsx
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
│  │  │  ├─ InventoryForm.jsx
│  │  │  └─ RelatedMenus.jsx
│  │  ├─ menu
│  │  │  ├─ components
│  │  │  │  ├─ CartItem.jsx
│  │  │  │  ├─ CartOpenButton.jsx
│  │  │  │  ├─ CategoryBar.jsx
│  │  │  │  ├─ CategoryButton.jsx
│  │  │  │  ├─ DishCard.jsx
│  │  │  │  ├─ EmptyShoppingCart.jsx
│  │  │  │  ├─ MenuList.jsx
│  │  │  │  ├─ OrderInfoField.jsx
│  │  │  │  ├─ ScrollNavButton.jsx
│  │  │  │  └─ ShoppingCart.jsx
│  │  │  └─ utils
│  │  │     └─ menuHelpers.js
│  │  ├─ menu-manage
│  │  │  ├─ CustomizeScetion.jsx
│  │  │  ├─ IngredientScetion.jsx
│  │  │  ├─ MenuForm.jsx
│  │  │  ├─ OptionSection.jsx
│  │  │  └─ utils
│  │  │     └─ menuTransform.js
│  │  ├─ orders
│  │  │  ├─ components
│  │  │  │  ├─ DiningField .jsx
│  │  │  │  ├─ MiniMenu.jsx
│  │  │  │  ├─ OrderDetailPage.jsx
│  │  │  │  ├─ OrderDishes.jsx
│  │  │  │  ├─ OrderDropdownMenu.jsx
│  │  │  │  ├─ OrderEditPage.jsx
│  │  │  │  ├─ OrderForm
│  │  │  │  │  ├─ CustomizationField.jsx
│  │  │  │  │  ├─ Option.jsx
│  │  │  │  │  └─ OrderForm.jsx
│  │  │  │  ├─ OrderNote.jsx
│  │  │  │  ├─ OrderOperation.jsx
│  │  │  │  ├─ OrderOverview.jsx
│  │  │  │  ├─ OrderSection.jsx
│  │  │  │  ├─ OrdersTable.jsx
│  │  │  │  └─ ServingsControl.jsx
│  │  │  └─ hooks
│  │  │     └─ useOrderInventory.js
│  │  ├─ settings
│  │  │  ├─ ControlledTimeRange.jsx
│  │  │  ├─ DineInTableSettings.jsx
│  │  │  ├─ RegularOpenHours.jsx
│  │  │  ├─ sortTimeSlots.js
│  │  │  ├─ SpecialOpenHours.jsx
│  │  │  ├─ StoreInfo.jsx
│  │  │  └─ validateOverlap.js
│  │  └─ staff
│  │     ├─ SignUp.jsx
│  │     └─ StaffList.jsx
│  ├─ hooks
│  │  ├─ data
│  │  │  ├─ auth
│  │  │  │  ├─ useLogin.js
│  │  │  │  ├─ useLogout.js
│  │  │  │  ├─ useUpdateUserAvatar.js
│  │  │  │  ├─ useUpdateUserPassword.js
│  │  │  │  ├─ useUpdateUserProfile.js
│  │  │  │  └─ useUser.js
│  │  │  ├─ inventory
│  │  │  │  ├─ useDeleteInventory.js
│  │  │  │  ├─ useGetInventory.js
│  │  │  │  └─ useSubmitInventory.js
│  │  │  ├─ menus
│  │  │  │  ├─ useDeleteMenu.js
│  │  │  │  ├─ useGetMenus.js
│  │  │  │  ├─ useIngredientMenus.js
│  │  │  │  └─ useSubmitMenuForm.js
│  │  │  ├─ orders
│  │  │  │  ├─ useCreateOrder.js
│  │  │  │  ├─ useDeleteOrder.js
│  │  │  │  ├─ useGetOrder.js
│  │  │  │  ├─ useGetPaginatedOrders.js
│  │  │  │  ├─ useRecentOrders.js
│  │  │  │  └─ useUpdateOrder.js
│  │  │  ├─ settings
│  │  │  │  ├─ useGetSettings.js
│  │  │  │  └─ useSubmitSettings.js
│  │  │  └─ staff
│  │  │     ├─ useCreateStaff.js
│  │  │     ├─ useDeleteStaff.js
│  │  │     ├─ useGetStaff.js
│  │  │     └─ useUpdateStaff.js
│  │  └─ ui
│  │     ├─ useClickOutside.js
│  │     ├─ useMediaQuery.js
│  │     └─ useScrollLock.js
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
│  │  ├─ apiOrders.js
│  │  ├─ apiSettings.js
│  │  ├─ apiStaff.js
│  │  ├─ handleEdgeFunctionError.js
│  │  ├─ handleSupabaseApiError.js
│  │  └─ supabase.js
│  ├─ style
│  │  └─ GlobalStyles.js
│  ├─ ui
│  │  ├─ ButtonSpinner.jsx
│  │  ├─ ConfirmDelete.jsx
│  │  ├─ ContentContainer.jsx
│  │  ├─ ControlledSelect.jsx
│  │  ├─ ControlledSwitch.jsx
│  │  ├─ DataDisplayCard.jsx
│  │  ├─ DateRangePicker.jsx
│  │  ├─ Description.jsx
│  │  ├─ DiningMethodSegmented.jsx
│  │  ├─ Dot.jsx
│  │  ├─ DropdownMenu.jsx
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
│  │  ├─ Modal.jsx
│  │  ├─ OrderItemActions.jsx
│  │  ├─ PageContainer.jsx
│  │  ├─ PageHeader.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ QueryStatusFallback.jsx
│  │  ├─ RequiredMark.jsx
│  │  ├─ SectionContainer.jsx
│  │  ├─ StyledDayRangePicker.jsx
│  │  ├─ StyledHotToast.jsx
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