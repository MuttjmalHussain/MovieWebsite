import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Loading from './components/Loading';
import MovieCard from './components/MovieCard';
import { fetchMovies, searchMovies } from '../api/movieApp';
import { useDebounce } from 'use-debounce';
const App = () => {
  const [search,setSearch] = useState('');
  const [movies,setMovies] = useState([]);
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [debouncedSearch] = useDebounce(search,500)
  
  useEffect(()=>{
    debouncedSearch?findMovies():getMovies();
    
  },[debouncedSearch])
  const getMovies = async ()=>{
    setLoading(true)
    const data = await fetchMovies();
    if(data && data.results){
    setMovies(data.results)
    }
    setLoading(false)
  }
 const findMovies = async () => {
  setLoading(true);
  setErrorMessage(null);
  try {
    const data = await searchMovies({ query: search });
    if (data && data.results) {
      setMovies(data.results);
    } else {
      setErrorMessage('No results found.');
      setMovies([]);
    }
  } catch (error) {
    console.error('Search error:', error);
    setErrorMessage('Error fetching movies. Please try again later.');
    setMovies([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header className="wrapper ">
          <img src="./hero.png" alt="Hero image" />
          <h1>Find<span className='text-gradient'> Movies </span>You'll Enjoy Without the Hastle</h1>
        </header>
        <Search search={search} setSearch={setSearch} />
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All movies</h2>

          {loading?(
            <Loading />
          ):errorMessage? (
          <p className='text-red-600' >{errorMessage}</p>):
          (
            <ul>
              { movies.map((movie)=>(<MovieCard key={movie.id} movie={movie} />))}

            </ul>
          )
}
        </section>
      </div>
    </main>
  )
} 

export default App