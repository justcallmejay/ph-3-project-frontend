import React, { useState } from 'react';

function Search( { setSearchFood } ) {

const [currentSearch, setCurrentSearch] = useState('')

function findFood() {
    setSearchFood(currentSearch)
}

return(
    <div className='searchbar'>
        <input type="text" placeholder='Type Here' value={currentSearch} onChange={(e) => setCurrentSearch(e.target.value)}/>
        <button onClick={findFood}>Search</button>
    </div>
    )
}

export default Search;