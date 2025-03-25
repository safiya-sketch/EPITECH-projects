import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/tracks.php");
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sons :", error);
      }
    };
    fetchTracks();
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/artists.php");
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des artistes :", error);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/albums.php");
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des albums :", error);
      }
    };
    fetchAlbums();
  }, []);

  const filteredTracks = tracks.filter((track) =>
    track.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArtists = artists.filter((artist) =>
    artist.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-8 overflow-auto">
      <div className="mb-8">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Musiques</h2>
        <div className="flex gap-4 overflow-x-auto max-w-full">
          {filteredTracks.map((track, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[200px] bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <img
                src={track.cover}
                alt={track.song}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <audio controls className="w-full mb-2">
                <source src={track.mp3} type="audio/mp3" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
              <p className="text-sm font-semibold">{track.song}</p>
              <a href="#" className="text-xs text-gray-400 hover:underline">
                {track.artist}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Artistes</h2>
        <div className="flex gap-4 overflow-x-auto max-w-full">
          {filteredArtists.map((artist, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-[150px] bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition text-center"
            >
              <img
                src={artist.picture}
                alt={artist.artist}
                className="w-32 h-32 object-cover rounded-full mb-2"
              />
              <Link to={`/artist/${artist.id}`} className="text-sm font-semibold hover:underline">
                {artist.artist}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          <Link to="/albums">Albums</Link>
        </h2>
        <div className="flex gap-4 overflow-x-auto max-w-full">
          {filteredAlbums.map((album, index) => (
            <Link
              to={`/album/${album.id}`}
              key={index}
              className="flex-shrink-0 min-w-[200px] bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p className="text-sm font-semibold text-center hover:underline">
                {album.title}
              </p>
              <p className="text-xs text-gray-400 text-center">{album.artist}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
