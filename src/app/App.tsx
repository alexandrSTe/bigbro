import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Events from '../pages/events/Events';
import Students from '../pages/students/Students';
import './App.scss';

const App: React.FC = () => {
  return (
    <>
      <header>
        <Link to="/events">Events</Link>
        <Link to="/students">Students</Link>
      </header>
      <Routes>
        <Route path="/events" element={<Events />} />
        <Route path="/students" element={<Students />} />
        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>
    </>
  );
};

export default App;
