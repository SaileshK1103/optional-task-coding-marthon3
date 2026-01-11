const express = require("express");
const {
  getAllEvents,
  createEvent,
  getEvent,
  deleteEvent,
  updateEvent
} = require("../controllers/eventControllers");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllEvents);
router.post("/", protect, createEvent);
router.get('/:id',protect, getEvent);
router.delete('/:id', protect,  deleteEvent);
router.put('/:id', protect, updateEvent);

module.exports = router;
