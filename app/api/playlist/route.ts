import { NextResponse } from "next/server";
const { getTracks } = require("spotify-url-info")(fetch);

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
            track.artists?.map((a: any) => a.name).join(" ") || "";
          const searchQuery = encodeURIComponent(
            `${track.name} ${artistNames}`,
          );

          const response = await fetch(
            `https://halo.zarcotech.dev/api/search?q=${searchQuery}`,
          );
          const data = await response.json();

          const metadata = Array.isArray(data) ? data[0] : data;

          return {
            name: metadata?.name || track.name,
            artists:
              metadata?.artist ||
              track.artists?.map((a: any) => a.name).join(", ") ||
              "unknown",
            albumName: metadata?.album || "unknown",
            albumImage: metadata?.album_pic || null,
          };
        } catch {
          return {
            name: track.name,
            artists:
              track.artists?.map((a: any) => a.name).join(", ") || "unknown",
            albumName: "",
            albumImage: null,
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
