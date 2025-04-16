// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Dashboard = () => (
  <div style={{ color: 'white', padding: '2rem' }}>
    <h1>✅ Dashboard works</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;