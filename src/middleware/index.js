import { ofType } from "redux-observable";
import { catchError, debounceTime, map, of, retry, switchMap, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { searchCity } from "../store/sliceChoice";
import { errorGetCity, requestGetCity, successGetCity } from "../store/sliceGetCity";
import { errorGetLastRoutes, requestGetLastRoutes, successGetLastRoutes } from "../store/sliceGetLastRoutes";
import { getRouteError, getRouteRequest, getRouteSuccess } from "../store/sliceGetRoute";
import { errorGetSeats, requestGetSeats, successGetSeats } from "../store/sliceGetSeats";
import { errorPostOrder, requestPostOrder, successPostOrder } from "../store/slicePostOrder";
import { errorPostSubscribe, requestPostSubscribe, successPostSubscribe } from "../store/slicePostSubscribe";

export const getCitiesEpic = (action$) => action$.pipe(
  ofType(searchCity),
  map(o => o.payload.trim()),
  debounceTime(100),
  map(o => requestGetCity(o)),
  switchMap((o) => {
    return ajax.getJSON(`${process.env.REACT_APP_API_URL}routes/cities?name=${o.payload}`).pipe(
      tap((o) => console.log(o)),
      retry(3),
      map((o) => {
        if (o.error) {
          errorGetCity(o.error)
        } else {
          successGetCity(o)
        }
      }),
      catchError((e) => of(errorGetCity(e)))
    )
  })
);

export const getRoutesEpic = (action$) => action$.pipe(
  ofType(getRouteRequest),
  debounceTime(2000),
  switchMap((o) => {
    return ajax.getJSON(`${process.env.REACT_APP_API_URL}routes?from_city_id=${o.payload.fromCity._id}&to_city_id=${o.payload.toCity._id}`).pipe(
      retry(3),
      map((o) => {
        if (o.error) {
          getRouteError(o.error)
        } else {
          getRouteSuccess(o)
        }
      }),
      catchError((e) => of(getRouteError(e)))
    )
  })
);

export const getLastRoutesEpic = (action$) => action$.pipe(
  ofType(requestGetLastRoutes),
  switchMap(() => {
    return ajax.getJSON(`${process.env.REACT_APP_API_URL}routes/last`).pipe(
      retry(3),
      map((o) => successGetLastRoutes(o)),
      catchError((e) => of(errorGetLastRoutes(e)))
    )
  })
);

export const getSeatsEpic = (action$) => action$.pipe(
  ofType(requestGetSeats),
  switchMap((o) => {
    return ajax.getJSON(`${process.env.REACT_APP_API_URL}routes/${o.payload}/seats`).pipe(
      retry(3),
      map((o) => successGetSeats(o)),
      catchError((e) => of(errorGetSeats(e)))
    )
  })
);

export const postOrderEpic = (action$) => action$.pipe(
  ofType(requestPostOrder),
  switchMap((o) => {
    return ajax({
      url: `${process.env.REACT_APP_API_URL}order`,
      method: 'POST',
      body: JSON.stringify(o)
    }).pipe(
      retry(3),
      map((o) => successPostOrder(o.response.status)),
      catchError((e) => of(errorPostOrder(e)))
    )
  })
);

export const postSubscribe = (action$) => action$.pipe(
  ofType(requestPostSubscribe),
  switchMap((o) => {
    return ajax({
      url: `${process.env.REACT_APP_API_URL}subscribe`,
      method: 'POST',
      body: JSON.stringify(o)
    }).pipe(
      retry(3),
      map((o) => successPostSubscribe(o.response.status)),
      catchError((e) => of(errorPostSubscribe(e)))
    )
  })
);
