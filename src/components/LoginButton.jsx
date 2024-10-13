import React, { useEffect } from 'react';
const clientId = process.env.REACT_APP_CLIENT_ID; // Acceder a la variable de entorno
const redirectUri = 'http://localhost:5173/callback';
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
].join('%20');

const authEndpoint = 'https://accounts.spotify.com/authorize';

function LoginButton() {
  const handleLogin = () => {
    console.log('Iniciando sesión...'); // Para verificar si se llama
    const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;  // Redirige al usuario a la autenticación de Spotify
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.split('&')[0].split('=')[1];
      localStorage.setItem('spotifyAccessToken', token); // Almacena el token en localStorage
      window.location.hash = ''; // Limpia la URL
    }
  }, []);

  return (
    <button onClick={handleLogin}>
      Iniciar sesión con Spotify
    </button>
  );
}

export default LoginButton;
