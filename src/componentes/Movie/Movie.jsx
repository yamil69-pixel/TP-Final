import React, { useState } from 'react';
import './Movie.css';

const Movie = ({ movie, onAddToWatchLater, onAddToFavorites, onSelectMovie, urlImage }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  return (
    <div className="movie-card" onClick={() => onSelectMovie(movie)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={`${urlImage}${movie.poster_path}`} alt={movie.title} className="movie-image" />
      {showDetails && (
        <div className="movie-details">
          <h4>{movie.title}</h4>
          <p>{movie.vote_average}</p>
          <p>{movie.overview}</p>
          <div className="action-buttons">
            <button onClick={() => onAddToWatchLater(movie)} className="action-button">
              Ver más tarde
            </button>
            <button onClick={() => onAddToFavorites(movie)} className="action-button">
              Favorito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;