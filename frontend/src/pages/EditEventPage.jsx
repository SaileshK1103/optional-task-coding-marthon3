import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;
const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const res = await fetch(`${baseUrl}/api/events/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }
      );
      const data = await res.json();
      if (res.ok) {
        
        setTitle(data.title);
        setDate(new Date(data.date).toISOString().split("T")[0]);
        setLocation(data.location);
        setName(data.organizer.name);
        setEmail(data.organizer.contactEmail);
        setPhone(data.organizer.contactPhone);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const updatedEvent = {
      title,
      date,
      location,
      organizer: { name, contactEmail: email, contactPhone: phone },
    };

    const res = await fetch(`${baseUrl}/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    });

    if (res.ok) {
      navigate(`/events/${id}`);
    } else {
      alert("Failed to update event");
    }
  };

  return (
    <div className="edit-event-container">
      <form onSubmit={handleUpdate} className="edit-form">
        <h2>Edit Event: {title}</h2>

        <div className="form-group">
          <label>Event Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <h3 className="section-title">Organizer Details</h3>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="actions">
          <button type="submit" className="edit-btn">
            Update Event
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="delete-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventPage;
