import { Route, Routes } from "react-router-dom";
import HeaderAndFooter from "../pages/HeaderAndFooter";
import Main from "../pages/main/Main";
import ChoiceRoute from "../pages/choice-route/ChoiceRoute";
import ListRoutes from "../pages/list-routes/ListRoutes";
import ListCoaches from "../pages/coaches/ListCoaches";
import ListPassengers from "../pages/list-passengers/ListPassengers";
import Payment from "../pages/payment/Payment";
import Order from "../pages/order/Order";
import SuccessfulOrder from "../pages/successful-order/SuccessfulOrder";

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HeaderAndFooter />}>
        <Route index element={<Main />} />
        <Route path='/route' element={<ChoiceRoute />}>
          <Route index element={<ListRoutes />} />
          <Route path='/route/coach' element={<ListCoaches />} />
          <Route path='/route/passengers' element={<ListPassengers />} />
          <Route path='/route/payment' element={<Payment />} />
          <Route path='/route/order' element={<Order />} />
        </Route>
        <Route path='/success' element={<SuccessfulOrder />} />
      </Route>
    </Routes>
  )
}