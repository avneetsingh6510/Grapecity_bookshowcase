import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function Favorites() {
  const [books, setBooks] = useState([]);

  const favoriteIds =
    JSON.parse(localStorage.getItem("favorites")) || [];

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const responses = await Promise.all(
          favoriteIds.map((id) =>
            axios.get(
              `https://www.googleapis.com/books/v1/volumes/${id}`
            )
          )
        );

        setBooks(responses.map((res) => res.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (favoriteIds.length) {
      fetchFavorites();
    }
  }, []);

  return (
    <div className="container">
      <h1>❤️ Favorite Books</h1>

      {books.length === 0 ? (
        <h3>No favorite books added yet.</h3>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;