'use client';

import React, { useState, useEffect } from 'react';

export default function RandSong() {
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDailySong = async () => {
      setLoading(true);
      const playlistUrl = 'https://open.spotify.com/playlist/2Tt2UWicrh5GoQkc7Wz5n7';

      try {
        const response = await fetch(`/api/playlist?url=${playlistUrl}`);
        const data = await response.json();

        if (data.tracks && data.tracks.length > 0) {
          const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
          setSong(data.tracks[dayOfYear % data.tracks.length]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getDailySong();
  }, []);

  return (
    <div className="w-full max-w-sm">
      {loading && <div className="text-gray-400 text-xs">Loading...</div>}
      {song && !loading && (
        <div className="bg-[#18191C] p-3 rounded-lg flex items-center gap-4 text-white shadow-xl border border-[#202225] font-sans">
          {song.albumImage && (
            <img 
              src={song.albumImage} 
              alt="Album Art" 
              className="w-16 h-16 rounded-md object-cover flex-shrink-0 shadow-md" 
            />
          )}
          <div className="flex flex-col min-w-0 justify-center">
            <div className="font-bold text-sm text-[#FFFFFF] truncate">
              {song.name}
            </div>
            <div className="text-xs text-[#B9BBBE] mt-0.5 truncate">
              {song.artists}
            </div>
            <div className="text-[10px] text-[#B9BBBE] mt-1 font-medium uppercase tracking-wider">
              {song.albumName}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}