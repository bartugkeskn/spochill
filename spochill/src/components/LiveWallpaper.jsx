import React from "react";

const LiveWallpaper = ({ currentWallpaper, wallpapers }) => {
  const wallpaperUrl = wallpapers[currentWallpaper] || wallpapers[0]; // güvenlik için fallback

  return (
    <video
      key={currentWallpaper}
      className="live-wallpaper"
      autoPlay
      loop
      muted
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        zIndex: -1,
      }}
    >
      <source src={wallpaperUrl} type="video/mp4" />
    </video>
  );
};

export default LiveWallpaper;
