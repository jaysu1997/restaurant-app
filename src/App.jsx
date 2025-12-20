import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import MenuManage from "./pages/MenuManage";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { OrderProvider } from "./context/OrderContext";
import Order from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import "react-day-picker/style.css";
import Dashboard from "./pages/Dashboard";
import { SettingsProvider } from "./context/SettingsContext";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ui-old/ProtectedRoute";
import Account from "./pages/Account";
import ScrollToTop from "./components/ScrollToTop";
import Staff from "./pages/Staff";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 2,
      retryDelay: 3000,
      networkMode: "offlineFirst",
    },
    mutations: {
      retry: false,
      networkMode: "offlineFirst",
    },
  },
});

// 有一些error handle，可能需要修正，尤其是edge function中沒有明確回覆錯誤原因的部分

// select元件或許可以設計成一個共用的樣式，然後其他在使用rest props覆蓋過去就好

// 可能有好幾個使用SectionContainer的元件都需要檢查一下欄位之間的距離，或許可以統一設定form的gap為0.4rem，目前好像是個別設定的

// react.lazy 是否需要?

// 相同的驗證正則，或許可以寫成utils(email、phone、positive int)

// 還有一些css中有使用中文作為data-set，好像改成英文會好一點，id可能也是?但如果需要引用到偽元素中，則繼續使用中文

// 後續可能需要把元件和函式以及檔案和資料夾都需要重構(styled元件命名需要再檢查修正，很多是臨時命名而已，還有可以統一的樣式就拆解，現在購物車的程式碼多到爆)

// 還有error boundary的fallback ui要設計,以及404的ui應該更需要更改
// error的按鈕ui需要更改，主要建議行為，返回首頁使用primary button，次要功能則使用text button(重新整理)，然後有些功能可能根本不需要用到action button
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

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
          <Route path="/signin" element={<SignIn />} />
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
