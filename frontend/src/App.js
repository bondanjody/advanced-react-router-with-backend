import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import NewEvent from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import RootLayout from './pages/Root'
import EventsRootLayout from './pages/EventsRoot';

const router = createBrowserRouter([
  {path: '/', element: <RootLayout />, children: [
    {index: true, element: <Home />},
    {path: 'events', element: <EventsRootLayout />, children: [
      {index: true, element: <Events />},
      {path: ':eventID', element: <EventDetail />},
      {path: 'new', element: <NewEvent />},
      {path: ':eventID/edit', element: <EditEvent />},
    ]},
  ]},
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;
