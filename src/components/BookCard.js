import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const info = book.volumeInfo;

  const imageUrl =
    info.imageLinks?.extraLarge ||
    info.imageLinks?.large ||
    info.imageLinks?.medium ||
    info.imageLinks?.thumbnail?.replace("http://", "https://") ||
    null;

  // Skip only when no image exists
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="book-card">
      <img src={imageUrl} alt={info.title} />

      <h3>{info.title}</h3>

      <p>{info.authors?.join(", ") || "Unknown Author"}</p>

      <Link to={`/books/${book.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default BookCard;