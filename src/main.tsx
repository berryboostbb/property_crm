import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/errorBoundary/index.tsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ToastNotification from "./components/toast/index.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
              <ToastNotification />
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
