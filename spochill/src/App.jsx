import { useState, useEffect } from "react";
import "./index.css";
import LiveWallpaper from "./components/LiveWallpaper";

function App() {
  const wallpaperCategories = {
    Landscape: ["/live-wallpapers/landscape1.mp4", "/live-wallpapers/landscape2.mp4"],
    Space: ["/live-wallpapers/space1.mp4", "/live-wallpapers/space2.mp4", "/live-wallpapers/space3.mp4"],
    Cyberpunk: ["/live-wallpapers/cyberpunk1.mp4", "/live-wallpapers/cyberpunk2.mp4"],
  };

  const [currentCategory, setCurrentCategory] = useState("Landscape");
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [spotifyToken, setSpotifyToken] = useState(null);

  // URL'den token yakala
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    if (token) {
      localStorage.setItem("spotifyToken", token);
      setSpotifyToken(token);
      window.history.replaceState({}, document.title, "/"); // URL temizle
    } else {
      const storedToken = localStorage.getItem("spotifyToken");
      if (storedToken) setSpotifyToken(storedToken);
    }
  }, []);

  const wallpapers = wallpaperCategories[currentCategory];
  const wallpapersCount = wallpapers.length;

  const nextWallpaper = () => setCurrentWallpaper((prev) => (prev + 1) % wallpapersCount);
  const prevWallpaper = () => setCurrentWallpaper((prev) => (prev - 1 + wallpapersCount) % wallpapersCount);
  const selectCategory = (category) => {
    setCurrentCategory(category);
    setCurrentWallpaper(0);
    setIsCategoryOpen(false);
  };

  const handleSpotifyLogin = () => {
    // Backend login endpoint
    window.location.href = "http://localhost:8888/login";
  };

  return (
    <div className="app-container">
      <LiveWallpaper currentWallpaper={currentWallpaper} wallpapers={wallpapers} />

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

      <div className="wallpaper-buttons">
        <button className="button" onClick={prevWallpaper}>◀</button>
        <button className="button" onClick={() => setIsCategoryOpen(true)}>Kategori</button>
        <button className="button" onClick={nextWallpaper}>▶</button>
      </div>

      {isCategoryOpen && (
        <div className="category-modal-backdrop" onClick={() => setIsCategoryOpen(false)}>
          <div className="category-modal-content" onClick={(e) => e.stopPropagation()}>
            {Object.keys(wallpaperCategories).map((category) => (
              <button key={category} onClick={() => selectCategory(category)}>{category}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
