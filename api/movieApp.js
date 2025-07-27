    import axios from "axios";
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

    const moviesEndpoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
    const trendingMoviesEndpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    const searchMovieEndpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}`;

    export const img500 = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;

    const apiCall = async (endpoint,params)=>{
        const options={
            method:'GET',
            url:endpoint,
            params:params?params:{}
        }
        try{
            const response = await axios.request(options);
        return response.data;
        }catch(e){
            console.log('Error here is : ',e)
            return;
        }
    }
    export const fetchMovies = ()=>{
        return apiCall(moviesEndpoint)
    }
    export const fetchTrendingMovies = ()=>{
        return apiCall(trendingMoviesEndpoint)
    }
    export const searchMovies = (params) =>{
        return apiCall(searchMovieEndpoint,params);
    }