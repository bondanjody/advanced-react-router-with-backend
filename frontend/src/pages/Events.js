import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function Events() {
  const {events} = useLoaderData();
  // const events = data.events;

  // Pengkondisian untuk error
  // if (data.isError) {
  //   return <p>{data.message}</p>
  // }

  // return <EventsList events={events} />;

  return <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>}>
    <Await resolve={events}>
      {(loadedEvent) => <EventsList events={loadedEvent} />}
    </Await>
  </Suspense>
}

export default Events;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    // return {
    //   isError: true,
    //   message: 'Could not fetch events !'
    // }

    // throw new Response(JSON.stringify({message: 'Could not fetch events !'}), {status: 500});

    throw json({message: 'Could not fetch events !'}, {status: 500});
  } else {
    const resData = await response.json();
    return resData.events;
  }

  /*
    NOTE :
    Semua kode API bawaan Browser (seperti : localStorage, cookie, dll) dapat dituliskan pada loader().
    Yang tidak bisa dituliskan pada loader() adalah kode React seperti : useState, dll.
  */
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}