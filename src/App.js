/* ------------ Important ------------ */
import React from 'react'
import { HashRouter } from 'react-router-dom';
//import { useState } from 'react';

import { Routes, Route} from 'react-router-dom';

/* -------------- Pages -------------- */
import Home from './pages/Home';
import TeamPage from './pages/TeamPage';

/* ----------- CSS Styling ----------- */
import './App.css';

/* ------------ Components ----------- */

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