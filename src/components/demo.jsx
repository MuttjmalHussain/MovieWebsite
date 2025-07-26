import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Loading from './components/Loading';
import MovieCard from './components/MovieCard';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};
  

const App = () => {
  const [search,setSearch] = useState('');
  const [movies,setMovies] = useState([]);
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const fetchMovies = async(query = '')=>{
    setLoading(true)
    setErrorMessage('')
    try {
        const endpoint = query
        ?`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endpoint,options);
        if(!response.ok){
          throw new Error("oops")
        }
        const data = await response.json();
        if(data.response == 'False'){
          setErrorMessage(data.Error || 'Error fetching movies')
          setMovies([]);
          return;
        }
        setMovies(data.results)
        console.log(data.results)
    } catch (error) {
      console.error( `The error is : ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.')
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    // fetchMovies(search);
  },[search])
  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header className="wrapper ">
          <img src="/hero.png" alt="Hero image" />
          <h1>Find<span className='text-gradient'> Movies </span>You'll Enjoy Without the Hastle</h1>
        </header>
        <Search search={search} setSearch={setSearch} />
        <p className='text-white'>{encodeURIComponent(search)}</p>
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