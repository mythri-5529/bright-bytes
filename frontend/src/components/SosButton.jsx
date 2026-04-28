import React, { useState } from 'react';
import { Phone, X, AlertTriangle, Shield, Mic, Video } from 'lucide-react';

function SosButton() {
  const [active, setActive] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const triggerSos = () => {
    setActive(true);
    // In a real app, this would trigger WebSocket events to the backend
    // and start recording audio/video or tracking live location
    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        // Execute real SOS
      }
    }, 1000);
  };

  const cancelSos = () => {
    setActive(false);
    setCountdown(5);
  };

  return (
    <>
      {/* Floating SOS Trigger Button */}
      {!active && (
        <button 
          onClick={triggerSos}
          className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center z-[2000] animate-pulse-fast transition-transform hover:scale-105 active:scale-95"
        >
          <AlertTriangle className="w-8 h-8 text-white" />
        </button>
      )}

      {/* SOS Active Overlay */}
      {active && (
        <div className="fixed inset-0 z-[3000] bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-sm glass-panel bg-dark-900/50 border-red-500/30 p-8 flex flex-col items-center">
            
            <div className="w-24 h-24 rounded-full bg-red-600/20 flex items-center justify-center mb-6 animate-pulse">
              <Shield className="w-12 h-12 text-red-500" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Emergency Mode</h2>
            
            {countdown > 0 ? (
              <>
                <p className="text-red-400 mb-6 font-medium">Alerting contacts in {countdown}s...</p>
                <div className="w-full bg-dark-800 rounded-full h-2 mb-8 overflow-hidden">
                  <div 
                    className="bg-red-500 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(countdown / 5) * 100}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-red-400 mb-6 font-medium flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Live Location Shared
                </p>
                <div className="flex gap-4 mb-8">
                  <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
                    <Mic className="w-6 h-6 text-primary-500 mb-1" />
                    <span className="text-xs text-slate-400">Recording</span>
                  </div>
                  <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
                    <Video className="w-6 h-6 text-primary-500 mb-1" />
                    <span className="text-xs text-slate-400">Streaming</span>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-3 w-full">
              <button 
                className="w-full bg-dark-800 hover:bg-dark-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 border border-dark-600"
              >
                <Phone className="w-5 h-5 text-green-500" />
                Simulate Fake Call
              </button>
              
              <button 
                onClick={cancelSos}
                className="w-full bg-transparent hover:bg-red-900/30 text-slate-300 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel Emergency
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default SosButton;
