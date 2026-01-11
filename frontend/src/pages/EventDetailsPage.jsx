import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;
const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const onEditClick = () => {
    navigate(`/edit-event/${id}`);
  };

  const onDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    const res = await fetch(`${baseUrl}/api/events/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      navigate("/");
    } else {
      alert("Failed to delete event");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!event) return <h2>Event not found</h2>;

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <div className="details-grid">
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
      </div>

      <div className="organizer-section">
        <h3>Organizer Information</h3>
        <p>
          <strong>Name:</strong> {event.organizer.name}
        </p>
        <p>
          <strong>Email:</strong> {event.organizer.contactEmail}
        </p>
        <p>
          <strong>Phone:</strong> {event.organizer.contactPhone}
        </p>
      </div>

      <div className="actions">
        <button onClick={onEditClick} className="edit-btn">
          Edit Event
        </button>
        <button onClick={onDeleteClick} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
