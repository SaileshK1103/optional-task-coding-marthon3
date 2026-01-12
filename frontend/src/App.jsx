import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar";
import AddEventPage from "./pages/AddEventPage";
import AuthPage from "./pages/AuthPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import Home from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {

  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
    setIsChecking(false);
  }, []);
  if (isChecking) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
    return (
      <div className="App">
        <BrowserRouter basename="/optional-task-coding-marthon3">
          <Navbar user={user} onLogout={handleLogout} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/" />} />
              <Route path="/add-event" element={user ? <AddEventPage /> : <Navigate to="/login" />} />
              <Route path="/events/:id" element={user ?<EventDetailsPage /> : <Navigate to="/login" />} />
              <Route path="/edit-event/:id" element={user ? <EditEventPage /> : <Navigate to="/login" />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
