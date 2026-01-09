import { useEffect, useState } from "react";
import EventListing from "./EventListing";

const EventListings = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-list">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        events.map((event) => <EventListing key={event.id} event={event} />)
      )}
    </div>
  );
};

export default EventListings;
