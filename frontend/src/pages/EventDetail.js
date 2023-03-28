import { Fragment } from "react";
import { useRouteLoaderData, json } from "react-router-dom";
import EventItem from '../components/EventItem';

const EventDetail = () => {
    const data = useRouteLoaderData('event-detail');

    return <Fragment>
        <EventItem event={data.event} />
    </Fragment>;
}

export default EventDetail;

export async function loader({request, params}) {
    const id = params.eventID;

    const response = await fetch('http://localhost:8080/events/' + id );

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected events !'}, { status: 500});
    } else {
        return response;
    }
}