import "react-day-picker/style.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./components/AppLayout";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Staff from "./pages/Staff";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import MenuManage from "./pages/MenuManage";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { OrderProvider } from "./context/orders/OrderContext";
import { SettingsProvider } from "./context/settings/SettingsContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // retry: 2,
      retry: false,
      retryDelay: 3000,
      networkMode: "offlineFirst",
    },
    mutations: {
      retry: false,
      networkMode: "offlineFirst",
    },
  },
});

// 重構2.0 state

// 列表類的ui，如果有border設計問題，建議都改成& + &解決

// 好像很多svg沒有加上寬高class?還是說因為是使用Button元件一系列的通用設計，所以不用?或許可以一律套用class?

// 不同helpers可能需要整理一下，似乎有點混亂了(尤其是settingsHelpers)，或許可以分成日期時間helper、正則helpers...

// isProcessing

// SEO、lighthouse檢查

// 可能有好幾個使用SectionContainer的元件都需要檢查一下欄位之間的距離，或許可以統一設定form的gap為0.4rem，目前好像是個別設定的

// react.lazy 是否需要?

// 後續可能需要把元件和函式以及檔案和資料夾都需要重構(styled元件命名需要再檢查修正，很多是臨時命名而已，還有可以統一的樣式就拆解，現在購物車的程式碼多到爆)

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <SettingsProvider>
                  <AppLayout />
                </SettingsProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="/menu"
              element={
                <OrderProvider key="create">
                  <Menu />
                </OrderProvider>
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route
              path="/order/:orderId/edit"
              element={
                <OrderProvider key="edit">
                  <Order />
                </OrderProvider>
              }
            />
            <Route path="/menu-manage" element={<MenuManage />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
            <Route
              path="/staff"
              element={
                <ProtectedRoute roles={["店長"]}>
                  <Staff />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={10}
        toastOptions={{
          style: {
            fontSize: "1.6rem",
            width: "32rem",
            maxWidth: "95dvw",
          },
          icon: null,
          success: {
            style: {
              backgroundColor: "#f0fdf4",
              borderLeft: "1rem solid #22c55e",
              borderRadius: "5px",
            },
            duration: 2000,
          },
          error: {
            style: {
              backgroundColor: "#fff1f2",
              borderLeft: "1rem solid #e11d48",
              borderRadius: "5px",
            },
            duration: 3000,
          },
        }}
      />
    </QueryClientProvider>
  );
}
