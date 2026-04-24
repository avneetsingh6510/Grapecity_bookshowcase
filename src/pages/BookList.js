import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async (query = "bestseller books") => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=20`
      );

      setBooks(res.data.items || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch books.");
      setLoading(false);
    }
  };

  // Initial load → shows mixed books
  useEffect(() => {
    fetchBooks("popular books fiction self-help novels");
  }, []);

  const handleSearch = () => {
    if (search.trim() === "") {
      fetchBooks("popular books fiction self-help novels");
    } else {
      fetchBooks(search);
    }
  };

  if (loading) return <h2 className="status">Loading...</h2>;
  if (error) return <h2 className="status">{error}</h2>;

  return (
    <div className="container">
      <h1> Book Showcase</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BookList;