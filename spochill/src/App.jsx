import { useState, useEffect } from "react";
import "./index.css";
import LiveWallpaper from "./components/LiveWallpaper";
import SpotifyPlayer from "./components/SpotifyPlayer";

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
  const [spotifyToken, setSpotifyToken] = useState(null);

  // URL'den token al ve localStorage'a kaydet
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      localStorage.setItem("spotifyToken", token);
      setSpotifyToken(token);
      window.history.replaceState({}, document.title, "/");
    } else {
      const savedToken = localStorage.getItem("spotifyToken");
      if (savedToken) setSpotifyToken(savedToken);
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
    window.location.href = "http://127.0.0.1:8888/login"; // Backend login endpoint
  };

  return (
    <div className="app-container">
      <LiveWallpaper
        currentWallpaper={currentWallpaper}
        wallpapers={wallpapers}
      />

      {/* Spotify Player */}
      {spotifyToken ? (
        <SpotifyPlayer token={spotifyToken} />
      ) : (
        <div className="player-overlay">
          <button onClick={handleSpotifyLogin}>Login with Spotify</button>
        </div>
      )}

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
