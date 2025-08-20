import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Callback() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      // Burada backend'ine gönderip access token alman lazım.
      console.log("Spotify auth code:", code);
      // ör: fetch("/api/auth/spotify", { method:"POST", body: JSON.stringify({ code }) })
    }
  }, [location]);

  return (
    <div style={{ color: "white" }}>
      Spotify giriş işlemi tamamlaniyor...
    </div>
  );
}

export default Callback;
