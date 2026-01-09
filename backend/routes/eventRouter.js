const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEvent,
  deleteEvent
} = require("../controllers/eventControllers");

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvent);
router.get('/:id', getEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
