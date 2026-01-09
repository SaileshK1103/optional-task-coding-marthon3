const Event = require('../models/eventModel');
const mongoose = require("mongoose")

// GET / jobs;
const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find({}).sort({ createdAt: -1 });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve events" });
    }
  };

// POST /events
const createEvent= async (req,res) => {
    try {
        const newEvent = await Event.create({ ...req.body});
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: "Failed to create event", error: error.message })
    }
};

module.exports = {
    getAllEvents,
    createEvent
};
