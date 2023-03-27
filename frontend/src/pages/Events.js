import { Fragment } from "react";
import { Link } from "react-router-dom";

const Events = () => {
    const DUMMY_DATA = [
        {id: 'event1', title: 'Jakarta Music Fest'},
        {id: 'event2', title: 'Surakarta Soundrenaline'}
    ]

    return <Fragment>
        <ul>
        {DUMMY_DATA.map(data => <li key={data.id}>
            <Link to={data.id}>{data.title}</Link>
        </li>)}
        </ul>
    </Fragment>;
}

export default Events;