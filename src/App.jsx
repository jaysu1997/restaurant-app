import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import MenuManage from "./pages/MenuManage";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Staff from "./pages/Staff";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { OrderProvider } from "./context/OrderContext";
import Order from "./pages/Order";
import StyledOverlayScrollbars from "./ui/StyledOverlayScrollbars";
import PageNotFound from "./pages/PageNotFound";
import Test from "./pages/Test";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// 或許可以加入自訂餐廳名稱，字體顏色，logo的功能
export default function App() {
  // 全域禁用number input的預設滾輪事件
  useEffect(() => {
    // 當滾輪事件是發生在number input上時，移除焦點
    const handleWheel = (e) => {
      if (
        document.activeElement.type === "number" &&
        document.activeElement === e.target
      ) {
        e.target.blur(); // 移除焦點
        e.preventDefault(); // 阻止滾輪改變 input 值
      }
    };

    // 添加全域滾輪事件監聽
    window.addEventListener("wheel", handleWheel, { passive: false });

    // 清除監聽器
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />

      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <StyledOverlayScrollbars style={{ maxHeight: "100dvh" }}>
                  <AppLayout />
                </StyledOverlayScrollbars>
              }
            >
              <Route index element={<Homepage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<Order />} />
              <Route path="/menu-manage" element={<MenuManage />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/staff" element={<Staff />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>

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
