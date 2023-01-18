import React, { useState } from 'react';
import Search from './Search'
import Cart from './Cart'
import ProduceCard from './ProduceCard'

function Produce( { produce } ) {

    const [searchFood, setSearchFood] = useState("")
    
    const search = produce.filter(food => {
        return food.name.toUpperCase().includes(searchFood.toUpperCase())
    })
    
    const [toggleDisplay, setToggleDisplay] = useState(true)

    function toggleBtn() {
        setToggleDisplay(!toggleDisplay)
    }

    return(
        <div className='produce'>
            <div className='produce-container'>
                <button onClick={toggleBtn}>View</button>
                <Search setSearchFood={setSearchFood}/>
                <Cart />
                <div className='produce-items'>
                {toggleDisplay ?
                <> 
                    {search.map(sear =>
                    <ProduceCard sear={sear} key={sear.id}/>)}
                </>
                 : 
                 <>
                    {search.map(sear => 
                    <ProduceList sear={sear} key={sear.id}/>)}
                </>
                }
                </div>
            </div>
        </div>
    )
}

export default Produce;