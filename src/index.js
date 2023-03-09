import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import  Dictionary  from "./components/Dictionary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CssVarsProvider>
    <Provider store={store}>
      <Dictionary />
    </Provider>
  </CssVarsProvider>
);
