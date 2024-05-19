/* ------------ Important ------------ */
import React from 'react'
import { Routes, Route} from 'react-router-dom';

/* -------------- Pages -------------- */
import Home from './pages/Home';
import TeamPage from './pages/TeamPage';

/* ----------- CSS Styling ----------- */
import './App.css';

// Or I can add BrowserRouter, HashRouter is just for github Pages
export default function App() {

  return (
    <div>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/team/:id" element={<TeamPage />} />
      </Routes>
    </div>
  );
}