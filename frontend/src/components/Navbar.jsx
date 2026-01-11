import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>Event Search</h1>
      <div className="links">
        <Link to="/">Home</Link>

        {user ? (
          // If user is logged in, show these
          <>
            <Link to="/add-event">Add Event</Link>
            <span className="user-greeting">Hi, {user.name}</span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          // If user is NOT logged in, show this
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
