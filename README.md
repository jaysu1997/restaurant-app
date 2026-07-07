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
│  │  │  ├─ HeaderActionButton.jsx
│  │  │  ├─ IconButton.jsx
│  │  │  ├─ SubmitButton.jsx
│  │  │  └─ TextButton.jsx
│  │  ├─ ConfirmDelete.jsx
│  │  ├─ DataDisplayCard.jsx
│  │  ├─ Description.jsx
│  │  ├─ DropdownMenu.jsx
│  │  ├─ ErrorBoundaryFallback.jsx
│  │  ├─ FeedbackState.jsx
│  │  ├─ Filter
│  │  │  ├─ DateRangeFilter.jsx
│  │  │  ├─ Filter.jsx
│  │  │  ├─ FilterRenderer.jsx
│  │  │  ├─ OptionFilter.jsx
│  │  │  └─ SearchFilter.jsx
│  │  ├─ FormActions.jsx
│  │  ├─ FormFieldLayout.jsx
│  │  ├─ FormInputField.jsx
│  │  ├─ Header.jsx
│  │  ├─ Logo.jsx
│  │  ├─ modal
│  │  │  ├─ Modal.jsx
│  │  │  ├─ ModalBody.jsx
│  │  │  ├─ ModalFormCard.jsx
│  │  │  └─ ModalFormSection.jsx
│  │  ├─ ModalCloseButton.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ NavItem.jsx
│  │  ├─ Note.jsx
│  │  ├─ PageContainer.jsx
│  │  ├─ PageHeader.jsx
│  │  ├─ FormPasswordField.jsx
│  │  ├─ Price.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  ├─ QueryStatusFallback.jsx
│  │  ├─ RequiredMark.jsx
│  │  ├─ ScrollToTop.jsx
│  │  ├─ SectionContainer.jsx
│  │  ├─ StyledOverlay.jsx
│  │  ├─ Tag.jsx
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
│  │  │  ├─ components
│  │  │  ├─ InventoryForm.jsx
│  │  │  └─ RelatedMenus.jsx
│  │  ├─ menu
│  │  │  ├─ components
│  │  │  │  ├─ CartItem.jsx
│  │  │  │  ├─ CartOpenButton.jsx
│  │  │  │  ├─ CartOrderInfo.jsx
│  │  │  │  ├─ CategoryBar.jsx
│  │  │  │  ├─ CategoryButton.jsx
│  │  │  │  ├─ DishCard.jsx
│  │  │  │  ├─ EmptyCart.jsx
│  │  │  │  ├─ MenuList.jsx
│  │  │  │  ├─ ScrollNavButton.jsx
│  │  │  │  └─ ShoppingCart.jsx
│  │  │  └─ utils
│  │  │     └─ menuHelpers.js
│  │  ├─ menu-manage
│  │  │  ├─ CustomizeSection.jsx
│  │  │  ├─ IngredientSection.jsx
│  │  │  ├─ MenuForm.jsx
│  │  │  ├─ OptionSection.jsx
│  │  │  └─ utils
│  │  │     └─ menuTransform.js
│  │  ├─ orders
│  │  │  ├─ components
│  │  │  │  ├─ DiningInfoField.jsx
│  │  │  │  ├─ MiniMenu.jsx
│  │  │  │  ├─ OrderDetailPage.jsx
│  │  │  │  ├─ OrderDishes.jsx
│  │  │  │  ├─ OrderDropdownMenu.jsx
│  │  │  │  ├─ OrderEditPage.jsx
│  │  │  │  ├─ OrderForm
│  │  │  │  │  ├─ CustomizationField.jsx
│  │  │  │  │  ├─ Option.jsx
│  │  │  │  │  └─ OrderForm.jsx
│  │  │  │  ├─ OrderInfo.jsx
│  │  │  │  ├─ OrderItemActions.jsx
│  │  │  │  ├─ OrderNote.jsx
│  │  │  │  ├─ OrderOverview.jsx
│  │  │  │  ├─ OrdersList
│  │  │  │  │  ├─ OrdersListDesktop.jsx
│  │  │  │  │  └─ OrdersListMobile.jsx
│  │  │  │  ├─ OrderStatusField.jsx
│  │  │  │  ├─ PaymentStatusField.jsx
│  │  │  │  ├─ ServingsControl.jsx
│  │  │  │  └─ StoreClosedNotice.jsx
│  │  │  └─ hooks
│  │  │     ├─ useOrderEdit.js
│  │  │     └─ useOrderInventory.js
│  │  ├─ settings
│  │  │  ├─ components
│  │  │  │  └─ TableZoneItem.jsx
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
│  │  ├─ FormSelectField.jsx
│  │  ├─ ControlledSwitch.jsx
│  │  ├─ DateRangePicker.jsx
│  │  ├─ DiningMethodSegmented.jsx
│  │  ├─ FilterIcon.jsx
│  │  ├─ LoadingBars.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ RangeCalendar.jsx
│  │  ├─ showToast.jsx
│  │  ├─ BaseSelect.jsx
│  │  └─ UserAvatar.jsx
│  └─ utils
│     ├─ constants.js
│     ├─ filterHelpers.js
│     ├─ helpers.js
│     ├─ orderHelpers.js
│     ├─ selectHelpers.js
│     └─ validation.js
└─ vite.config.js

```
