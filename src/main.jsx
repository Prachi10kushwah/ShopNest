import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./Context/ShopContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
      <Toaster 
       position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#11231e",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px 18px",
          },
        }}/>
    </ShopContextProvider>
  </BrowserRouter>
);