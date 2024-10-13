import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SpotifyPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    const token = localStorage.getItem('spotifyAccessToken'); // Obtiene el token de acceso

    useEffect(() => {
        if (!token) {
            console.error("Token de acceso no encontrado.");
            return;
        }

        axios
            .get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: `Bearer ${token}`, // Pasa el token como header
                },
            })
            .then(response => {
                setPlaylists(response.data.items); // Guarda las playlists en el estado
            })
            .catch(error => console.error('Error obteniendo las playlists:', error));
    }, [token]);

    return (
        <div>
            <h1>Tus Playlists</h1>
            {playlists.length === 0 ? (
                <p>Cargando playlists...</p>
            ) : (
                <ul>
                    {playlists.map((playlist, index) => (
                        <li key={index}>
                            <img src={playlist.images[0]?.url} alt={playlist.name} style={{ width: '50px', height: '50px', marginRight: '20px' }} />
                            <p><strong>{playlist.name}</strong></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
