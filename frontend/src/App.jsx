import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import MapPage from './pages/MapPage';
import CommunityPage from './pages/CommunityPage';
import DashboardPage from './pages/DashboardPage';
import SosButton from './components/SosButton';
import AiAssistant from './components/AiAssistant';

function App() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navigation />
      
      <main className="flex-1 relative overflow-hidden">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>

        {/* Global Floating Components */}
        <SosButton />
        <AiAssistant />
      </main>
    </div>
  );
}

export default App;
