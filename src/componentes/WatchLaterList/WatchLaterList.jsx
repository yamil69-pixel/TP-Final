import React from 'react';
import Movie from '../Movie/Movie';
import './WatchLaterList.css';


const WatchLaterList = ({ watchLater, onAddToWatchLater, onAddToFavorites, urlImage }) => {
  return (
    <div className="watch-later-list">
      <h2>VER MAS TARDE </h2>
      <div>
        {watchLater.map((movie) => (
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

export default WatchLaterList;
