const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEvent,
  deleteEvent,
  updateEvent
} = require("../controllers/eventControllers");

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvent);
router.get('/:id', getEvent);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);

module.exports = router;
