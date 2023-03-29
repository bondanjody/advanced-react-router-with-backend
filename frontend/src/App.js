import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Events, {loader as eventsLoader} from './pages/Events';
import EventDetail, { loader as eventDetailLoader, action as deleteAction } from './pages/EventDetail';
import NewEvent from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import RootLayout from './pages/Root'
import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import { action as manipulateEventAction } from './components/EventForm';

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout />, 
    errorElement: <ErrorPage />, 
    children: [
    {index: true, element: <Home />},
    { path: 'events', 
      element: <EventsRootLayout />, 
      children: [
      { index: true, 
        element: <Events />, 
        loader: eventsLoader },
      { path: ":eventID", 
        id: 'event-detail',
        loader: eventDetailLoader, 
        children: [
        { index: true, element: <EventDetail />, action: deleteAction },
        { path: 'edit', element: <EditEvent />, action: manipulateEventAction},
      ]},
      {path: 'new', element: <NewEvent />, action: manipulateEventAction},
    ]},
  ]},
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;
