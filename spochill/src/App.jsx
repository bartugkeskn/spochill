import { useState } from "react";
import './index.css';
import LiveWallpaper from "./components/LiveWallpaper";
import Player from "./components/Player";

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
  const [isPlaying, setIsPlaying] = useState(true);

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

  return (
    <div className="app-container">
      {/* Arkaplan */}
      <LiveWallpaper
        currentWallpaper={currentWallpaper}
        wallpapers={wallpapers}
      />

      {/* Player overlay (şu an örnek, senin player state’in eklenmeli) */}
      <div className="player-overlay">
        <iframe
          src="https://open.spotify.com/embed/track"
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title="Spotify Player"
        ></iframe>
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
