// All Imports

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import Favorites from "./pages/Favorites";
import "./App.css";

// Functions
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;