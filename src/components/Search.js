import React, { useState } from 'react';
import '../css/Produce.css'

function Search( { setSearchFood, filterFood, setFilterFood, toggleBtn } ) {

const [currentSearch, setCurrentSearch] = useState('')

function findFood() {
    setSearchFood(currentSearch);
    setCurrentSearch('')
}

function onChangeValue(e) {
    setFilterFood(e.target.value)
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
        <input type="radio" value="" checked={filterFood === ""} onChange={onChangeValue}/>All
        <input type="radio" value="fruit" checked={filterFood === "fruit"} onChange={onChangeValue}/>Fruit
        <input type="radio" value="vegetable" checked={filterFood === "vegetable"} onChange={onChangeValue}/>Vegetable

    </div>
    )
}

export default Search;