import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import Home from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {

    return (
      <div className="App">
        <BrowserRouter basename="/optional-task-coding-marthon3">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-event" element={<AddEventPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/edit-event/:id" element={<EditEventPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
