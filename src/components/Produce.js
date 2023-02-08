import React, { useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { sum, onHandleDelete, handleUpdateCart, produce, setProduce, filterFood, setFilterFood, inventory, setInventory } ) {

    const [searchFood, setSearchFood] = useState("")
    const [toggleDisplay, setToggleDisplay] = useState(true)

    const filterProduce = produce.filter(food => {
        if (filterFood === '') return true;

        return food.kind === filterFood
    })
    
    const search = filterProduce.filter(food => {
        return food.produce.toUpperCase().includes(searchFood.toUpperCase())
    })

    function toggleBtn() {
        setToggleDisplay(!toggleDisplay)
    }

    function handleAddtoCart(item) {
        setInventory([...inventory, item])
    }

    const [yAxis, setyAxis] = useState(0)
    const addToAxis = 0
    
    // console.log(yAxis)
    
    function animateAddCart() {
        setyAxis((yAxis + addToAxis))
    }

    return(
        <div className='produce'>
            <div className='produce-container'>
                <div className="search-container">
                    <Search 
                        setSearchFood={setSearchFood} 
                        toggleBtn={toggleBtn}
                        filterFood={filterFood} 
                        setFilterFood={setFilterFood}
                    />
                </div>
                <div className="shopper-container">

                {toggleDisplay ?
                <div className='produce-items'>
                    {search.map(item =>
                    <ProduceCard
                        animateAddCart={animateAddCart}
                        item={item} 
                        key={item.id} 
                        inventory={inventory} 
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                        />
                    )}
                 </div>
                 : 
                 <div className='produce-column'>
                    {search.map(item => 
                    <ProduceList 
                        item={item} 
                        key={item.id} 
                        inventory={inventory}
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                    />)}
                </div>
                }
                <div className='cart-container'>
                <Cart 
                    sum={sum}
                    inventory={inventory}
                    setInventory={setInventory}
                    produce={produce}
                    setProduce={setProduce}
                    onHandleDelete={onHandleDelete}
                    yAxis={yAxis}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Produce;