'use client';

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanyardWS } from 'use-lanyard';

const DISCORD_ID = '1010986151374499890';

function getImageUrl(image: string | undefined, appId?: string | number) {
  if (!image) return null;
  if (image.startsWith('https://') || image.startsWith('http://')) return image;
  if (image.startsWith('mp:')) return `https://media.discordapp.net/${image.slice(3)}`;
  if (appId) return `https://cdn.discordapp.com/app-assets/${appId}/${image}.png`;
  return null;
}

function formatElapsed(start?: number, now = Date.now()) {
  if (!start) return null;
  const diff = Math.max(0, now - start);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function Presence() {
  const presence = useLanyardWS(DISCORD_ID);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const activities = useMemo(() => {
    if (!presence) return [];

    const spotifyActivity = presence.spotify?.song
      ? {
          name: 'Spotify',
          details: presence.spotify.song,
          state: presence.spotify.artist,
          timestamps: {
            start: presence.spotify.timestamps?.start,
          },
          album: presence.spotify.album,
          imageUrl: presence.spotify.album_art_url,
          type: 2,
          source: 'spotify',
        }
      : null;

    const otherActivities = Array.isArray(presence.activities)
      ? presence.activities.filter((act: any) => act.name?.toLowerCase() !== 'spotify')
      : [];

    return spotifyActivity ? [spotifyActivity, ...otherActivities] : otherActivities;
  }, [presence]);

  if (!presence || !activities.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {activities.map((activity: any, index: number) => {
        const imageUrl =
          activity.imageUrl ||
          getImageUrl(activity.assets?.large_image, activity.application_id) ||
          getImageUrl(activity.assets?.small_image, activity.application_id) ||
          getImageUrl(presence.discord_user.avatar, presence.discord_user.id);

        const statusLabel = activity.type === 0
          ? 'Playing'
          : activity.type === 2
            ? 'Listening'
            : activity.name || 'Active';

        const elapsed = formatElapsed(activity.timestamps?.start, now);

        return (
          <div
            key={`${activity.source || activity.id || activity.name}-${index}`}
            className="flex-1 min-w-[240px] max-w-[calc(50%-0.75rem)] rounded-2xl border border-[#2f3136] bg-[#202225] p-4 shadow-[0_1px_0_rgba(4,5,6,0.3)] text-white"
          >
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#b9bbbe]">
              <span>{statusLabel}</span>
              {elapsed && <span className="text-green-400">{elapsed}</span>}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-3xl bg-[#36393f]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={activity.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-[#b9bbbe]">
                    🎮
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">
                  {activity.name}
                </div>
                <div className="mt-1 text-xs text-[#b9bbbe] truncate">
                  {activity.details || 'No details'}
                </div>
                {activity.state && (
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8e9297]">
                    {activity.state}
                  </div>
                )}
                {activity.source === 'spotify' && activity.album && (
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8e9297]">
                    {activity.album}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Presence;