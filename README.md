# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
│  │  ├─ FormSection.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ PasswordInput.jsx
│  │  └─ ScrollToTop.jsx
│  ├─ context
│  │  ├─ order
│  │  │  ├─ OrderContext.jsx
│  │  │  ├─ orderReducer.js
│  │  │  └─ useOrder.js
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
│  │  │  ├─ User.jsx
│  │  │  └─ UserProfileSetting.jsx
│  │  ├─ dashboard
│  │  │  ├─ analyzeOrders.js
│  │  │  ├─ PeakHoursChart.jsx
│  │  │  ├─ RevenueTrendChart.jsx
│  │  │  ├─ StatItem.jsx
│  │  │  ├─ StatsCards.jsx
│  │  │  ├─ StatsCharts.jsx
│  │  │  ├─ TodayOrderList.jsx
│  │  │  └─ TopDishesChart.jsx
│  │  ├─ inventory
│  │  │  ├─ InventoryDataCard.jsx
│  │  │  ├─ InventoryForm.jsx
│  │  │  └─ RelatedMenus.jsx
│  │  ├─ menu
│  │  │  ├─ CartItem.jsx
│  │  │  ├─ EmptyShoppingCart.jsx
│  │  │  ├─ MenuView.jsx
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
│  │  │  ├─ CategoryGroup.jsx
│  │  │  ├─ MiniMenu.jsx
│  │  │  ├─ OrderCard.jsx
│  │  │  ├─ OrderDishes.jsx
│  │  │  ├─ OrderDropdownMenu.jsx
│  │  │  ├─ OrderOperation.jsx
│  │  │  ├─ OrderRow.jsx
│  │  │  ├─ OrdersTable.jsx
│  │  │  ├─ OrderSummaryEdit.jsx
│  │  │  └─ OrderSummaryView.jsx
│  │  ├─ settings
│  │  │  ├─ ControlledTimeRange.jsx
│  │  │  ├─ DineInTableSettings.jsx
│  │  │  ├─ RegularOpenHours.jsx
│  │  │  ├─ sortTimeSlots.js
│  │  │  ├─ SpecialOpenHours.jsx
│  │  │  ├─ StoreInfo.jsx
│  │  │  └─ validateOverlap.js
│  │  └─ staff
│  │     ├─ Signup.jsx
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
│  │  │  │  ├─ useIngredientRelatedMenus.js
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
│  │  ├─ apiOrder.js
│  │  ├─ apiSettings.js
│  │  ├─ apiStaff.js
│  │  ├─ handleEdgeFunctionError.js
│  │  ├─ handleSupabaseApiError.js
│  │  └─ supabase.js
│  ├─ style
│  │  └─ GlobalStyles.js
│  ├─ ui
│  │  ├─ AppLayout.jsx
│  │  ├─ Button.jsx
│  │  ├─ ButtonCancel.jsx
│  │  ├─ ButtonSpinner.jsx
│  │  ├─ ButtonSubmit.jsx
│  │  ├─ ConfirmDelete.jsx
│  │  ├─ ContentContainer.jsx
│  │  ├─ ControlledInput.jsx
│  │  ├─ ControlledSelect.jsx
│  │  ├─ ControlledSwitch.jsx
│  │  ├─ DataDisplayCard.jsx
│  │  ├─ DateRangePicker.jsx
│  │  ├─ Description.jsx
│  │  ├─ DiningMethodSwitch.jsx
│  │  ├─ DishCard.jsx
│  │  ├─ Dot.jsx
│  │  ├─ DropdownMenu.jsx
│  │  ├─ ErrorBoundaryFallback.jsx
│  │  ├─ Filter
│  │  │  ├─ DateRangeFilter.jsx
│  │  │  ├─ Filter.jsx
│  │  │  ├─ filterHelpers.js
│  │  │  ├─ SearchFilter.jsx
│  │  │  └─ SelectFilter.jsx
│  │  ├─ FilterIcon.jsx
│  │  ├─ FormFieldLayout.jsx
│  │  ├─ FormInput.jsx
│  │  ├─ FormRow.jsx
│  │  ├─ FormTable.jsx
│  │  ├─ FormTypography.jsx
│  │  ├─ Header.jsx
│  │  ├─ LoadingBars.jsx
│  │  ├─ Logo.jsx
│  │  ├─ Modal.jsx
│  │  ├─ Note.jsx
│  │  ├─ OrderForm
│  │  │  ├─ CustomizeArea.jsx
│  │  │  ├─ Option.jsx
│  │  │  └─ OrderForm.jsx
│  │  ├─ PageHeader.jsx
│  │  ├─ PageContainer.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  ├─ QueryStatusFallback.jsx
│  │  ├─ SectionContainer.jsx
│  │  ├─ ServingsControl.jsx
│  │  ├─ StatusView.jsx
│  │  ├─ StoreStatusBadge .jsx
│  │  ├─ StyledDayPicker.jsx
│  │  ├─ StyledHotToast.jsx
│  │  ├─ StyledNavLink.jsx
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
