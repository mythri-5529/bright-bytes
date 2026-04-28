import express from 'express';
import { prisma } from '../server.js';
import { calculateRiskScore } from '../services/riskEngine.js';

const router = express.Router();

// Get all incidents
router.get('/incidents', async (req, res) => {
  try {
    // Return mock data if db is empty or not initialized
    const mockIncidents = [
      { id: '1', type: 'poor-lighting', latitude: 28.6139, longitude: 77.2090, severity: 6, createdAt: new Date() },
      { id: '2', type: 'harassment', latitude: 28.6200, longitude: 77.2100, severity: 9, createdAt: new Date() }
    ];
    res.json(mockIncidents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// Submit an incident
router.post('/incidents', async (req, res) => {
  try {
    const { type, description, latitude, longitude, severity } = req.body;
    // Mock save
    res.status(201).json({ success: true, message: 'Incident reported successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create incident' });
  }
});

// Calculate Risk Score for a location
router.get('/risk-score', async (req, res) => {
  try {
    const { lat, lng, time } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    
    const score = calculateRiskScore(parseFloat(lat), parseFloat(lng), time);
    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate risk score' });
  }
});

export default router;
