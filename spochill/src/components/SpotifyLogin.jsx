import React from "react";

const clientId = "S39de6d0a3b564b70960490de0de7b3bb";
const redirectUri = "https://senin-vercel-projeni.vercel.app/callback";
const scopes = "user-read-playback-state user-modify-playback-state user-read-currently-playing";

const SpotifyLogin = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

  return (
    <button onClick={() => window.location.href = authUrl}>
      Login with Spotify
    </button>
  );
};

export default SpotifyLogin;
