/* ------------ Important ------------ */
import React from 'react'
//import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
          <Route index element={<Home />} />
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
    </div>
  );
}