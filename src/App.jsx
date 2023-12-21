 import React, { useEffect, useState } from 'react';
 import axios from 'axios';
 import YouTube from 'react-youtube'; //no llegue a implementarlo
 import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
 import './App.css';
 import Movie from './componentes/Movie/Movie';
 import WatchLaterList from './componentes/WatchLaterList/WatchLaterList';
 import FavoritesList from './componentes/FavoritesList/FavoritesList';
 import SearchBar from './componentes/SearchBar/SearchBar';


 const App = () => {
   const API_URL = 'https://api.themoviedb.org/3';
   const API_KEY = '32c4bb7d81cc7429ec7d575f9b7f5cbc';
   const IMAGE_PATH = 'https://image.tmdb.org/t/p/original' //no llegue a implementarlo
   const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

   const [movies, setMovies] = useState([]);
   const [searchKey, setSearchKey] = useState('');
   const [watchLater, setWatchLater] = useState([]);
   const [favorites, setFavorites] = useState([]);
   const [trailer, setTrailer] = useState(null); //no llegue a implementarlo
   const [movie, setMovie] = useState({ title: 'Loading Movies' });
   const [playing, setPlaying] = useState(false); //no llegue a implementarlo
   const [selectedMovieDetails, setSelectedMovieDetails] = useState(null); //no llegue a implementarlo


 const fetchMovies = async (searchKey) => {
   const type = searchKey ? 'search' : 'discover';
  
   try {
     const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
       params: {
         api_key: API_KEY,
         query: searchKey,
       },
     });

     setMovies(results);

     if (results.length > 0) {
       const firstMovieId = results[0].id;
       await fetchAndSetMovieDetails(firstMovieId);
     }
   } catch (error) {
     console.error('Error fetching movies:', error);
     setMovies([]);
   }
 };

 const fetchAndSetMovieDetails = async (movieId) => {
   try {
     const movieDetails = await fetchMovie(movieId);
     setSelectedMovieDetails(movieDetails);
   } catch (error) {
     console.error('Error fetching movie details:', error);
   }
 };

   const fetchMovie = async (id) => {
     try {
       const { data } = await axios.get(`${API_URL}/movie/${id}`, {
         params: {
           api_key: API_KEY,
           append_to_response: 'videos',
         },
       });

       return data;
     } catch (error) {
       throw error;
     }
   };

   const addToWatchLater = (movie) => {
     setWatchLater((prev) => [...prev, movie]);
   };

   const addToFavorites = (movie) => {
     setFavorites((prev) => [...prev, movie]);
   };

 const selectmovie = async (movie) => {
   await fetchAndSetMovieDetails(movie.id);
   fetchMovie(movie.id);
   setMovie(movie);
   window.scrollTo(0, 0);
 };

   const handleSearch = (searchQuery) => {
     setSearchKey(searchQuery);
     fetchMovies(searchQuery);
   };

   useEffect(() => {
     fetchMovies();
   }, []);

return (
  <Router>
    <div>
      <header>
        <h2>Películas</h2>
        <Link to="/" className="navigation-link">Inicio</Link>
        <Link to="/watch-later" className="navigation-link">Ver más tarde</Link>
        <Link to="/favorites" className="navigation-link">Favoritos</Link>
        <SearchBar onSearch={handleSearch} />
      </header>

      <Switch>
        <Route path="/" exact>
          {/* Página principal */}
          <div>
            <div div className="movie-gallery">
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
                  movie={movie}
                  onSelectMovie={selectmovie}
                  onAddToWatchLater={addToWatchLater}
                  onAddToFavorites={addToFavorites}
                  urlImage={URL_IMAGE}
                />
              ))}
            </div>
          </div>
        </Route>
        <Route path="/watch-later">
          {/* Página de ver mas tarde */}
          <WatchLaterList watchLater={watchLater} onAddToWatchLater={addToWatchLater} onAddToFavorites={addToFavorites} urlImage={URL_IMAGE} />
        </Route>
        <Route path="/favorites">
          {/* Página de Favoritos */}
          <FavoritesList favorites={favorites} onAddToWatchLater={addToWatchLater} onAddToFavorites={addToFavorites} urlImage={URL_IMAGE} />
        </Route>
      </Switch>
    </div>
  </Router>
);
};

export default App;
