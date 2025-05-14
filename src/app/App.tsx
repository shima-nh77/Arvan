import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toastStyle.css";
import { cookieManager } from "../utility/cookieManager";

function App() {
  const handleLogout = () => {
    cookieManager?.removeToken();
    window.location.href = "/login";
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: async (error: any) => {
            if (error?.request?.status === 401) {
              handleLogout();
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: async (error: any) => {
            if (error?.request?.status === 401) {
              handleLogout();
            }
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 3,
          },
        },
      })
  );
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
