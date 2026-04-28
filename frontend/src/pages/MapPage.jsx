import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Search, Clock, Navigation as NavigationIcon, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

// Simulated risk areas
const mockRiskAreas = [
  { id: 1, lat: 28.6139, lng: 77.2090, score: 85, type: 'poor-lighting' }, // High risk
  { id: 2, lat: 28.6250, lng: 77.2150, score: 60, type: 'harassment-history' }, // Moderate
  { id: 3, lat: 28.6000, lng: 77.2000, score: 20, type: 'safe' } // Safe
];

function HeatmapOverlay({ time }) {
  // In a real app, this would fetch updated risk scores based on `time`
  return (
    <>
      {mockRiskAreas.map((area) => {
        let color = '#22c55e'; // Green
        if (area.score > 75) color = '#ef4444'; // Red
        else if (area.score > 50) color = '#eab308'; // Yellow

        return (
          <CircleMarker
            key={area.id}
            center={[area.lat, area.lng]}
            radius={area.score / 2}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.3,
              weight: 0
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <p className="font-bold text-slate-800">Risk Score: {area.score}</p>
                <p className="text-sm text-slate-600">{area.type}</p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}

function MapPage() {
  const [time, setTime] = useState('22:00'); // 10 PM by default
  const [position, setPosition] = useState([28.6139, 77.2090]); // New Delhi center

  return (
    <div className="h-full w-full relative bg-dark-900">
      {/* Top Search & Filter Bar */}
      <div className="absolute top-4 left-4 right-4 md:left-8 md:right-auto md:w-96 z-[1000] space-y-3">
        <div className="glass-panel flex items-center p-3 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search destination..."
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500"
          />
        </div>
        
        <div className="glass-panel p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium">Predictive Time</span>
            </div>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="bg-dark-700 text-white border-none rounded px-2 py-1 text-sm outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-primary-600 hover:bg-primary-500 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2">
              <NavigationIcon className="w-4 h-4" />
              Safe Route
            </button>
          </div>
        </div>
      </div>

      <MapContainer 
        center={position} 
        zoom={13} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <HeatmapOverlay time={time} />
      </MapContainer>
    </div>
  );
}

export default MapPage;
