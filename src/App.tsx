import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store/index";


export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppRoutes />
      </Provider >
    </BrowserRouter>
  );
};
