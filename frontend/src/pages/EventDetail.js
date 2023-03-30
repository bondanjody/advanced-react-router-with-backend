import { Fragment, Suspense } from "react";
import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetailPage = () => {
    const { event, events} = useRouteLoaderData('event-detail');
    
    return (
    <Fragment>
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>}>
            <Await resolve={event}>
                {(loadedEvent) => <EventItem event={loadedEvent} />}
            </Await>
        </Suspense>
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>    
    </Fragment>
    );
}

export default EventDetailPage;

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id );

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected events !'}, { status: 500});
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

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

export async function loader({request, params}) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    });
}

export async function action({params, request}) {
    const eventID = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventID, { method: request.method});

    if (!response.ok) {
        throw json({ message: 'Could not delete events !'}, { status: 500});
    }
    return redirect('/events');
}

