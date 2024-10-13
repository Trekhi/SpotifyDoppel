import { useEffect, useState } from 'react';
import axios from 'axios';

function SpotifyPlaylist() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('spotifyAccessToken'); 

  const playlistId = '1IAVdxXbTZuau2WLiZ1aRW'; 

  useEffect(() => {
    const fetchTracks = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTracks(response.data.items);
        setError(null); // Resetea el error en caso de éxito
      } catch (error) {
        console.error('Error fetching Spotify playlist:', error);
        setError('Error al cargar la lista de reproducción');
      }
    };

    fetchTracks();
  }, [token, playlistId]);

  return (
    <div>
      <h1>Canciones de la Playlist</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tracks.length === 0 ? (
        <p>Cargando canciones...</p>
      ) : (
        <ul>
          {tracks.map((trackItem) => (
            <li key={trackItem.track.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <img
                src={trackItem.track.album.images[0]?.url}
                alt={trackItem.track.name}
                style={{ width: '50px', height: '50px', marginRight: '20px' }}
              />
              <div>
                <p><strong>{trackItem.track.name}</strong> - {trackItem.track.artists[0].name}</p>
                <p>{trackItem.track.album.name}</p> {/* Muestra el nombre del álbum */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SpotifyPlaylist;
