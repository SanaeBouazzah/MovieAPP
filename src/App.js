import {React, useEffect, useState} from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'


const movie1 = { 
  Poster: "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjI",
  Title: "Italian Spiderman",
  Type: "movie",
  Year: "2007",
  imdbID: "tt2705436",
}
const API_URL = 'http://www.omdbapi.com?apikey=6a0254a';
export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(()=>{
    searchMovies('Spiderman')
  }, []);
  return (
    <div className='app'>
      <h1>BestMovies</h1>
      <p className='para'>Enjoy exclusive Amazon Originals as well as popular movies</p>
      <div className='search'>
        <input  placeholder='Search for movie'
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <img src={SearchIcon} alt="search" 
        onClick={() => searchMovies(searchTerm)}/>
      </div>

      {movies?.length > 0
      ?
      (<div className='container'>
        {movies.map((movie)=> (
          <MovieCard movie={movie}/>
        ))}
      </div>)
      : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )
      }
    </div>
  )
}
