import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/api/artists/artist.php?id=${id}`).then((res) => res.json()),
      fetch(`http://localhost:8000/api/artists/albums-artist.php?id=${id}`).then((res) => res.json()),
    ])
      .then(([artistData, albumsData]) => {
        setArtist(artistData.artist);
        setAlbums(albumsData.albums || []);
      })
      .catch((err) => console.error("Erreur chargement:", err));
  }, [id]);

  if (!artist) return <div className="text-center text-white">Chargement...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Link 
        to="/" 
        className="fixed top-0 left-4 bg-gray-900 text-white p-6 rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M3 12l9-9 9 9V21H3z"></path>
          <path d="M9 21V12h6v9"></path>
        </svg>
      </Link>
      <br></br>
      <br></br>

      <div className="w-full p-10">
        <div className="bg-gray-800 rounded-lg flex items-center shadow-lg p-6">
          <img src={artist.photo} className="w-32 h-32 rounded-full object-cover mx-4" />
          <div>
            <h1 className="text-3xl font-bold">{artist.name}</h1>
            <br></br>
            <p className="text-lg opacity-80">{artist.description}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Album(s) de {artist.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 overflow-y-auto lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <div key={album.id} className="bg-gray-800/50 shadow-lg rounded-lg p-4 flex flex-col items-center">
                <img src={album.cover} className="w-32 h-32 rounded-lg object-cover mb-2" />
                <p className="text-lg font-semibold text-white text-center">{album.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
