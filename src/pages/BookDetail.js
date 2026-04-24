import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );

        setBook(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const toggleFavorite = () => {
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  if (loading) return <h2 className="status">Loading...</h2>;

  const info = book.volumeInfo;

  const imageUrl =
    info.imageLinks?.extraLarge ||
    info.imageLinks?.large ||
    info.imageLinks?.medium ||
    info.imageLinks?.thumbnail ||
    "";

  return (
    <div className="detail-page">
      {imageUrl ? (
        <img src={imageUrl} alt={info.title} />
      ) : (
        <div className="no-image">No Image Available</div>
      )}

      <h1>{info.title}</h1>

      <h3>{info.authors?.join(", ") || "Unknown Author"}</h3>

      <p
        dangerouslySetInnerHTML={{
          __html: info.description || "No description available"
        }}
      />

      <button onClick={toggleFavorite}>
        {favorites.includes(id)
          ? "Remove from Favorites ❤️"
          : "Add to Favorites 🤍"}
      </button>
    </div>
  );
}

export default BookDetail;