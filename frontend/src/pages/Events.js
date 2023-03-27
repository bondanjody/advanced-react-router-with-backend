import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function Events() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default Events;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    // ...
  } else {
    return response;
  }

  /*
    NOTE :
    Semua kode API bawaan Browser (seperti : localStorage, cookie, dll) dapat dituliskan pada loader().
    Yang tidak bisa dituliskan pada loader() adalah kode React seperti : useState, dll.
  */
}