import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import FilterRoute from '../../components/filter-route/FilterRoute';
import LastRoutes from '../../components/last-routes/LastRoutes';
import SearchProgress from '../../components/search-progress/SearchProgress';
import TripDetails from '../../components/trip-details/TripDetails';
import { useAppSelector } from '../../store/hooks';
import './route.css';
import { sliceChoiceState } from '../../store/sliceChoice';
import { sliceGetRouteState } from '../../store/sliceGetRoute';
import { sliceGetSeatsState } from '../../store/sliceGetSeats';
import { slicePostOrderState } from '../../store/slicePostOrder';

export default function ChoiceRoute() {
  const { loading: routeLoading } = useAppSelector(sliceGetRouteState);
  const { loading: seatsLoading } = useAppSelector(sliceGetSeatsState);
  const { route } = useAppSelector(sliceChoiceState);
  const { loading: postLoading } = useAppSelector(slicePostOrderState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!route && location.pathname === '/route/coach') {
      navigate('/route');
    };
  }, [location.pathname, navigate, route]);

  if (routeLoading || seatsLoading || postLoading) {
    return <SearchProgress />
  };

  return (
    <div className='main-route'>
      <div className='left-side'>
        {location.pathname === '/route/passengers' ||
          location.pathname === '/route/payment' ||
          location.pathname === '/route/order' ? <TripDetails /> :
          <>
            <FilterRoute />
            <LastRoutes />
          </>
        }
      </div>
      <div className='right-side'>
        <Outlet />
      </div>
    </div>
  );
};
