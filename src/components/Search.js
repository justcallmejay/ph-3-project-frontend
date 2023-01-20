import React, { useState } from 'react';
import '../css/Produce.css'

function Search( { setSearchFood, setFilterFood, toggleBtn } ) {

const [currentSearch, setCurrentSearch] = useState('')

function findFood() {
    setSearchFood(currentSearch);
    setCurrentSearch('')
}



return(
    <div className='searchbar'>
        <input type="text" placeholder='Type Here' value={currentSearch} onChange={(e) => setCurrentSearch(e.target.value)}/>
        <button className="search-btn" onClick={findFood}>Search</button>
        {/* <select onChange={(e) => setFilterFood(e.target.value)}>
            <option value=''>Filter</option>
            <option value='fruit'>Fruit</option>
            <option value='vegetable'>Vegetables</option>
        </select> */}
        <button className="toggle" onClick={toggleBtn}>View</button>
    </div>
    )
}

export default Search;