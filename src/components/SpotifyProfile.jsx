// /src/components/SpotifyProfile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function SpotifyProfile() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('spotifyAccessToken');

  useEffect(() => {
    if (!token) return;

    axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching Spotify data:', error));
  }, [token]);

  return profile ? (
    <div>
      <h1>{profile.display_name}</h1>
      <img src={profile.images[0]?.url} alt="Profile" />
    </div>
  ) : (
    <p>Cargando...</p>
  );
}

export default SpotifyProfile;
