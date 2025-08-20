import { useState, useEffect } from "react";
import "./index.css";
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
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.replace("#", "?")).get("access_token");
      if (token) {
        localStorage.setItem("spotifyToken", token);
        setSpotifyToken(token);
        window.location.hash = ""; // URL temizle
      }
    }
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
    const clientId = "39de6d0a3b564b70960490de0de7b3bb"; 
    const redirectUri = "https://spochill.vercel.app/"; // Spotify dashboardda eklediğin redirect URI
    const scopes = "user-read-playback-state user-modify-playback-state user-read-currently-playing";
  
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
  
    window.location.href = authUrl; // popup yerine direk yönlendirme
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
          <button onClick={handleSpotifyLogin}>Login with Spotify</button>
        ) : (
          <iframe
            src="https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC"
            width="300"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            title="Spotify Player"
          ></iframe>
        )}
      </div>

      {/* Wallpaper kontrol butonları */}
      <div className="wallpaper-buttons">
        <button className="button" onClick={prevWallpaper}>
          ◀
        </button>
        <button className="button" onClick={() => setIsCategoryOpen(true)}>
          Kategori
        </button>
        <button className="button" onClick={nextWallpaper}>
          ▶
        </button>
      </div>

      {/* Kategori Modal */}
      {isCategoryOpen && (
        <div
          className="category-modal-backdrop"
          onClick={() => setIsCategoryOpen(false)}
        >
          <div
            className="category-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
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
