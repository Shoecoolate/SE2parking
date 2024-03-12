import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Chakra UI
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./lib";

// Redux toolkit
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

// Components
import { Navbar, RootModals } from "./components/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <App />
        <RootModals />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
