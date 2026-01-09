import { Link } from "react-router-dom";

const EventListing = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-date">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="event-location">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="event-organizer">
          <strong>Organizer:</strong> {event.organizer.name}
        </p>
      </div>
      <Link to={`/events/${event.id}`} className="view-details-btn">
        View Details
      </Link>
    </div>
  );
};

export default EventListing;
