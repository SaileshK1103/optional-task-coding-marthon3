import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEventPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      date,
      location,
      organizer: { name, contactEmail: email, contactPhone: phone },
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (res.ok) {
      navigate("/");
    } else {
      alert("Failed to add event");
    }
  };

  return (
    <div className="edit-event-container">
      {" "}
      <form onSubmit={submitForm} className="edit-form">
        <h2>Add a New Event</h2>

        <div className="form-group">
          <label>Event Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <h3 className="section-title">Organizer Details</h3>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="actions">
          <button type="submit" className="edit-btn">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventPage;
