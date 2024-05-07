/* ------------ Important ------------ */
import React from 'react'
import { HashRouter } from 'react-router-dom';
//import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

/* -------------- Pages -------------- */
import Home from './pages/Home';
import TeamPage from './pages/TeamPage';

/* ----------- CSS Styling ----------- */
import './App.css';

/* ------------ Components ----------- */

export default function App() {

  return (
    <div>
      <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team/:id" element={<TeamPage />} />
          </Routes>
      </HashRouter>
    </div>
  );
}