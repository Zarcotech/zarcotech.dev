import { NextResponse } from "next/server";
const { getTracks, getData } = require("spotify-url-info")(fetch);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  try {
    const tracks = await getTracks(url);

    const enrichedTracks = await Promise.all(
      tracks.map(async (track: any) => {
        try {
          const artistNames =
            track.artists?.map((a: any) => a.name).join(" ") ||
            track.artist ||
            "";
          const searchQuery = encodeURIComponent(
            `${track.name} ${artistNames}`,
          );

          const response = await fetch(
            `https://halo.zarcotech.dev/api/search?q=${searchQuery}`,
          );
          const data = await response.json();

          const metadata = Array.isArray(data) ? data[0] : data || {};
          const albumNameFallback =
            typeof track.album === "string"
              ? track.album
              : track.album?.name;
          let albumImageFallback =
            metadata?.album_pic ||
            track.album?.images?.[0]?.url ||
            track.images?.[0]?.url ||
            track.album_pic ||
            track.albumImage ||
            null;

          if (!albumImageFallback && track.uri) {
            try {
              const trackData = await getData(track.uri);
              albumImageFallback =
                trackData.visualIdentity?.image?.[0]?.url ||
                trackData.image?.[0]?.url ||
                null;
            } catch {
              // ignore track detail fallback failure
            }
          }

          const albumName =
            metadata?.album ||
            metadata?.album_name ||
            metadata?.albumName ||
            albumNameFallback ||
            track.name ||
            track.title ||
            "unknown";

          return {
            name:
              metadata?.name || track.name || track.title || "unknown",
            artists:
              metadata?.artist ||
              track.artists?.map((a: any) => a.name).join(", ") ||
              track.artist ||
              "unknown",
            albumName,
            albumImage: albumImageFallback,
          };
        } catch {
          let albumImageFallback =
            track.album?.images?.[0]?.url ||
            track.images?.[0]?.url ||
            track.album_pic ||
            track.albumImage ||
            null;

          if (!albumImageFallback && track.uri) {
            try {
              const trackData = await getData(track.uri);
              albumImageFallback =
                trackData.visualIdentity?.image?.[0]?.url ||
                trackData.image?.[0]?.url ||
                null;
            } catch {
              // ignore track detail fallback failure
            }
          }

          return {
            name: track.name || track.title || "unknown",
            artists:
              track.artists?.map((a: any) => a.name).join(", ") ||
              track.artist ||
              "unknown",
            albumName:
              typeof track.album === "string"
                ? track.album
                : track.album?.name ||
              track.name ||
              track.title ||
              "unknown",
            albumImage: albumImageFallback,
          };
        }
      }),
    );

    return NextResponse.json({ tracks: enrichedTracks });
  } catch (error) {
    return NextResponse.json(
      { error: "failed" },
      { status: 500 },
    );
  }
}
