import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, ShieldAlert, MapPin, Clock } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    author: 'Anonymous User',
    type: 'Safety Warning',
    content: 'The streetlights on MG Road are not working. Avoid walking alone after 9 PM. Have reported it to the municipal corporation.',
    location: 'MG Road, Sector 14',
    time: '2 hours ago',
    upvotes: 45,
    downvotes: 2,
    trustScore: 88,
  },
  {
    id: 2,
    author: 'SafeComm Guide',
    type: 'Safe Route Update',
    content: 'The new pedestrian walkway near Central Park is now fully illuminated and has a constant police patrol. Good alternative for night commutes.',
    location: 'Central Park East',
    time: '5 hours ago',
    upvotes: 120,
    downvotes: 0,
    trustScore: 95,
  }
];

function CommunityPage() {
  const [posts] = useState(mockPosts);

  return (
    <div className="h-full w-full bg-dark-900 overflow-y-auto p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6 pb-24">
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Community Intelligence</h1>
            <p className="text-slate-400">Hyper-local safety updates from trusted users.</p>
          </div>
          <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-primary-500/20">
            <ShieldAlert className="w-5 h-5" />
            Report Incident
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {['All Updates', 'Incidents', 'Safe Zones', 'High Trust Score'].map((filter, i) => (
            <button key={filter} className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium ${i === 0 ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-dark-800 text-slate-300 border border-dark-700 hover:bg-dark-700'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="glass-panel p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-200">{post.author}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-dark-700 text-slate-300">Trust Score: {post.trustScore}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${post.type === 'Safety Warning' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {post.type}
                </span>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                {post.content}
              </p>

              <div className="flex items-center gap-6 pt-2 border-t border-dark-700">
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-green-400 transition text-sm">
                  <ThumbsUp className="w-4 h-4" /> {post.upvotes}
                </button>
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition text-sm">
                  <ThumbsDown className="w-4 h-4" /> {post.downvotes}
                </button>
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-primary-400 transition text-sm ml-auto">
                  <MessageSquare className="w-4 h-4" /> Reply
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CommunityPage;
