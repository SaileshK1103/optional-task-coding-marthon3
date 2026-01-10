const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');

describe('Event API Endpoints', () => {
  let testEventId;

  // Test GET All
  it('should fetch all events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test POST (Create)
  it('should create a new event', async () => {
    const newEvent = {
      title: "API Test Event",
      date: "2026-05-20",
      location: "Helsinki",
      organizer: {
        name: "Tester",
        contactEmail: "test@school.fi",
        contactPhone: "040123456"
      }
    };
    const res = await request(app).post('/api/events').send(newEvent);
    expect(res.statusCode).toEqual(201);
    testEventId = res.body._id; // Save ID for next tests
  });

  it('should update the event title', async () => {
    const updatedData = {
      title: "Updated API Title"
    };
    
    const res = await request(app)
      .put(`/api/events/${testEventId}`)
      .send(updatedData);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe("Updated API Title");
  });

  // Test DELETE
  it('should delete the test event', async () => {
    const res = await request(app).delete(`/api/events/${testEventId}`);
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await mongoose.connection.close(); 
  });
});