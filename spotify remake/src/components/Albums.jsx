import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Albums = () => {
  const [albumsByGenre, setAlbumsByGenre] = useState([]);

  useEffect(() => {
    const fetchAlbumsByGenre = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/genres.php"); // Utilise le bon endpoint ici
        const data = await response.json();
        setAlbumsByGenre(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des albums par genre :", error);
      }
    };
    fetchAlbumsByGenre();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-8 overflow-auto">
      <Link to="/" 
        className="fixed top-0 left-4 bg-gray-900 text-white p-6 rounded-full shadow-lg transition-all duration-300 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M3 12l9-9 9 9V21H3z"></path>
          <path d="M9 21V12h6v9"></path>
        </svg>
      </Link>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4">Albums par Genre</h2>
        {Object.entries(albumsByGenre).map(([genre, albums], index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">{genre}</h3>
            <div className="flex gap-4 overflow-x-auto max-w-full">
              {albums.map((album, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 min-w-[200px] bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
                >
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-semibold">{album.title}</p>
                  <a href="#" className="text-xs text-gray-400 hover:underline">
                    {album.artist}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
