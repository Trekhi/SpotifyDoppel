import React, { useState } from "react";
import axios from "axios";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const token = localStorage.getItem('spotifyAccessToken'); // Obtiene el token de acceso

    // Función para manejar la búsqueda
    const searchSongs = async (e) => {
        e.preventDefault();

        if (!token) {
            console.error("Token de acceso no encontrado");
            return;
        }

        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    q: query, // El valor que el usuario escribió en la barra de búsqueda
                    type: "track", // Buscar canciones (tracks)
                    limit: 10, // Limita el número de resultados a 10 (puedes cambiarlo)
                },
            });
            setResults(response.data.tracks.items); // Guarda los resultados en el estado
        } catch (error) {
            console.error("Error al buscar canciones:", error);
        }
    };

    return (
        <div>
            <form onSubmit={searchSongs}>
                <input
                    type="text"
                    placeholder="Buscar canciones..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Actualiza el valor de la búsqueda
                />
                <button type="submit">Buscar</button>
            </form>

            {/* Muestra los resultados de la búsqueda */}
            <div>
                {results.length === 0 ? (
                    <p>No se encontraron resultados</p>
                ) : (
                    <ul>
                        {results.map((song, index) => (
                            <li key={index}>
                                <img src={song.album.images[0]?.url} alt={song.name} style={{ width: '50px', height: '50px', marginRight: '20px' }} />
                                <div>
                                    <p><strong>{song.name}</strong> - {song.artists[0].name}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
