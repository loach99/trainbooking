import { configureStore } from "@reduxjs/toolkit";
import sliceChoice from "./sliceChoice";
import sliceGetCity from "./sliceGetCity";
import sliceHeaderTransform from "./sliceHeaderTransform";
import sliceGetRoute from "./sliceGetRoute";
import sliceProgressLine from "./sliceProgressLine";
import sliceFilter from "./sliceFilter";
import sliceGetLastRoutes from "./sliceGetLastRoutes";
import sliceGetSeats from "./sliceGetSeats";
import slicePrice from "./slicePrice";
import sliceOrder from "./sliceOrder";
import slicePostOrder from "./slicePostOrder";
import slicePostSubscribe from "./slicePostSubscribe";
import sliceNotice from "./sliceNotice";
import httpServices from "../services/httpApi";

export const store = configureStore({
  reducer: {
    sliceChoice,
    sliceGetCity,
    sliceHeaderTransform,
    sliceGetRoute,
    sliceProgressLine,
    sliceFilter,
    sliceGetLastRoutes,
    sliceGetSeats,
    slicePrice,
    sliceOrder,
    slicePostOrder,
    slicePostSubscribe,
    sliceNotice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: httpServices,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;