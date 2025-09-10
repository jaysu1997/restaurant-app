import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./style/GlobalStyles";
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
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 3,
      retryDelay: 3000,
      networkMode: "offlineFirst",
    },
    mutations: {
      retry: false,
      networkMode: "offlineFirst",
    },
  },
});

// 後續可能需要把元件和函式以及檔案和資料夾都需要重構

// 還有error boundary的fallback ui要設計,以及404的ui應該更需要更改
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <SettingsProvider>
                  <OrderProvider>
                    <AppLayout />
                  </OrderProvider>
                </SettingsProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route path="/order-edit/:orderId" element={<Order />} />
            <Route path="/menu-manage" element={<MenuManage />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
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
