import { useState, useEffect } from "react";
import './index.css';
import LiveWallpaper from "./components/LiveWallpaper";

function App() {
  const wallpaperCategories = {
    Landscape: [
      "/live-wallpapers/landscape1.mp4",
      "/live-wallpapers/landscape2.mp4",
    ],
    Space: [
      "/live-wallpapers/space1.mp4",
      "/live-wallpapers/space2.mp4",
      "/live-wallpapers/space3.mp4",
    ],
    Cyberpunk: [
      "/live-wallpapers/cyberpunk1.mp4",
      "/live-wallpapers/cyberpunk2.mp4",
    ],
  };

  const [currentCategory, setCurrentCategory] = useState("Landscape");
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Spotify token state
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    // LocalStorage'dan token kontrolü
    const token = localStorage.getItem("spotifyToken");
    if (token) setSpotifyToken(token);
  }, []);

  const wallpapers = wallpaperCategories[currentCategory];
  const wallpapersCount = wallpapers.length;

  const nextWallpaper = () => {
    setCurrentWallpaper((prev) => (prev + 1) % wallpapersCount);
  };

  const prevWallpaper = () => {
    setCurrentWallpaper((prev) => (prev - 1 + wallpapersCount) % wallpapersCount);
  };

  const selectCategory = (category) => {
    setCurrentCategory(category);
    setCurrentWallpaper(0);
    setIsCategoryOpen(false);
  };

  const handleSpotifyLogin = () => {
    const clientId = "39de6d0a3b564b70960490de0de7b3bb"; // Kendi client ID
    const redirectUri = "https://spochill.vercel.app/"; // Canlı URL
    const scopes = "user-read-playback-state user-modify-playback-state user-read-currently-playing";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.open(authUrl, "_blank", "width=500,height=600");
  };

  return (
    <div className="app-container">
      {/* Arkaplan */}
      <LiveWallpaper
        currentWallpaper={currentWallpaper}
        wallpapers={wallpapers}
      />

      {/* Player overlay */}
      <div className="player-overlay">
        {!spotifyToken ? (
          <button onClick={handleSpotifyLogin} className="spotify-login-btn">
            Login with Spotify
          </button>
        ) : (
          <iframe
            src="https://open.spotify.com/embed/track/TRACK_ID" // Buraya istediğin track ID
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Spotify Player"
          ></iframe>
        )}
      </div>

      {/* Wallpaper kontrol butonları */}
      <div className="wallpaper-buttons">
        <button className="button" onClick={prevWallpaper}>◀</button>
        <button className="button" onClick={() => setIsCategoryOpen(true)}>Kategori</button>
        <button className="button" onClick={nextWallpaper}>▶</button>
      </div>

      {/* Kategori Modal */}
      {isCategoryOpen && (
        <div className="category-modal-backdrop" onClick={() => setIsCategoryOpen(false)}>
          <div className="category-modal-content" onClick={(e) => e.stopPropagation()}>
            {Object.keys(wallpaperCategories).map((category) => (
              <button key={category} onClick={() => selectCategory(category)}>
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
