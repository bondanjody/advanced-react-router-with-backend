import { Fragment } from "react";
import { useParams } from "react-router-dom";

const EventDetail = () => {
    const params = useParams();

    return <Fragment>
        <h1>EventDetail</h1>
        <p>{params.eventID}</p>
    </Fragment>;
}

export default EventDetail;