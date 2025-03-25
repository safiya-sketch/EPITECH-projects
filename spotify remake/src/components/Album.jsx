import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false); 

  useEffect(() => {
    fetch(`http://localhost:8000/api/album.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data.album))
      .catch((err) => console.error("Erreur chargement:", err));
  }, [id]);

  if (!album) return <div className="text-center text-white">Chargement...</div>;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Link to="/" className="fixed left-4 bg-gray-900 text-white p-6 rounded-full shadow-lg transition-all duration-300 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
          <path d="M3 12l9-9 9 9V21H3z"></path>
          <path d="M9 21V12h6v9"></path>
        </svg>
      </Link>

      <div className="w-full p-10 bg-gray-800 rounded-lg flex items-center shadow-lg mb-6 mt-20">
        <img src={album.cover} className="w-32 h-32 rounded-lg object-cover mx-4" alt="Cover" />
        <div>
          <h1 className="text-3xl font-bold">{album.title}</h1>
          <p className="text-lg text-opacity-80">{album.artist}</p>
        </div>
      </div>

      <div className="px-10">
        <p className={`text-lg opacity-80 ${showFullDescription ? "" : "line-clamp-3"}`}>{album.description}</p>
        <button
          onClick={toggleDescription}
          className="text-blue-500 hover:text-blue-700 mt-2"
        >
          {showFullDescription ? "Afficher moins" : "Afficher plus"}
        </button>
      </div>
      <br></br>
    </div>
  );
};

export default Album;
