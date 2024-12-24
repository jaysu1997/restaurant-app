import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyles";
import AppLayout from "./ui/AppLayout";

import Homepage from "./pages/Homepage";
import Order from "./pages/Order";
import Bookings from "./pages/Bookings";
import Menus from "./pages/Menus";
import Inventory from "./pages/Inventory";
import Statistics from "./pages/Statistics";
import Staff from "./pages/Staff";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import StyledOverlayScrollbars from "./ui/StyledOverlayScrollbars";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

// 或許可以加入自訂餐廳名稱，字體顏色，logo的功能
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />

      <StyledOverlayScrollbars style={{ height: "100vh" }} autoHide="scroll">
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/order" element={<Order />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/menus" element={<Menus />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/staff" element={<Staff />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledOverlayScrollbars>

      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "1.6rem",
          },
        }}
      />
    </QueryClientProvider>
  );
}
