import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import CryptoLanding from "./pages/CryptoLanding";
import Login from "./pages/Login";
import ExchangeLanding from "./pages/ExchangeLanding";
import CryptoDetailsLanding from "./pages/CryptoDetailsLanding";
import { NotFound } from "./components/Layout/NotFound";
import WatchlistLanding from "./pages/WatchlistLanding";
import BalanceLanding from "./pages/BalanceLanding";
import HoldingsLanding from "./pages/HoldingsLanding";
import OrdersLanding from "./pages/OrdersLanding";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <CryptoLanding />,
          },
          {
            path: "details/:id",
            element: <CryptoDetailsLanding />,
          },
          {
            path: "exchange",
            element: <ExchangeLanding />,
          },
          {
            path: "balance",
            element: <BalanceLanding />,
          },
          {
            path: "watchlist",
            element: <WatchlistLanding />,
          },
          {
            path: "holdings",
            element: <HoldingsLanding />,
          },
          {
            path: "orders",
            element: <OrdersLanding />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
