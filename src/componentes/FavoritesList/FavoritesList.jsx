import React from 'react';
import Movie from '../Movie/Movie';  
import './FavoritesList.css'

const FavoritesList = ({ favorites, onAddToWatchLater, onAddToFavorites, urlImage }) => {
  return (
    <div className="favorites-list">
      <h2>FAVORITOS</h2>
      <div>
        {favorites.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            onAddToWatchLater={onAddToWatchLater}
            onAddToFavorites={onAddToFavorites}
            urlImage={urlImage}  
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;


