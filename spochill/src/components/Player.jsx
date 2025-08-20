const Player = ({ track, isPlaying, onPlayPause }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%", // overlay’in tüm genişliğini kullan
      }}
    >
      {/* Sol: Şarkı bilgisi */}
      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        <strong>{track.title}</strong> Current Playing Song {track.artist}
      </div>

      {/* Sağ: Play/Pause butonu */}
      <button
        onClick={onPlayPause}
        style={{
          marginLeft: "20px",
          padding: "5px 15px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
    </div>
  );
};

export default Player;
