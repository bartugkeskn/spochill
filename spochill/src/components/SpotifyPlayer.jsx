import { useState, useEffect } from "react";
import axios from "axios";
import "./SpotifyPlayer.css";

export default function SpotifyPlayer({ token }) {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrack(response.data?.item || null);
      } catch (err) {
        setTrack(null);
        console.error(err.response?.data || err.message);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 5000); // 5 saniyede bir güncelle
    return () => clearInterval(interval);
  }, [token]);

  if (!track) return <div className="spotify-player">Çalan şarkı yok</div>;

  return (
    <div className="spotify-player">
      <img src={track.album.images[0].url} alt={track.name} />
      <div className="spotify-track-info">
        <p className="spotify-track-name">{track.name}</p>
        <p className="spotify-track-artists">{track.artists.map(a => a.name).join(", ")}</p>
      </div>
    </div>
  );
}
