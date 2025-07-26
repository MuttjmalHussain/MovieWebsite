import React from 'react'

const Search = ({search,setSearch}) => {
  return (
    <div className='search'>
        <div className='text-white'>
            <img src="./search.svg" alt="search" />
            <input type="text" placeholder='Search through thousands of movies' value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
    </div>
  )
}

export default Search