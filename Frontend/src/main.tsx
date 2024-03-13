import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </Provider>
);
