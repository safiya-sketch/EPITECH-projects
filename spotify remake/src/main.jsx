import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import App from './components/Acceuil'; 
import Albums from './components/Albums';
import Artist from './components/artists/Artist';
import './acceuil.css';
import Album from './components/Album';

createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/albums" element={<Albums />} /> 
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
