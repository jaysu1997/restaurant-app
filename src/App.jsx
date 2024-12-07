import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyles";
import AppLayout from "./ui/AppLayout";

import "mac-scrollbar/dist/mac-scrollbar.css";

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

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />

      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: "scroll",
            clickScrolling: true,
            dragScrolling: true,
            autoHideDelay: 1000,
          },
        }}
        style={{ height: "100vh" }}
      >
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
      </OverlayScrollbarsComponent>

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
