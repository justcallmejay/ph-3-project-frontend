import React, { useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { sum, onHandleDelete, handleUpdateCart, produce, filterFood, setFilterFood, cart, setCart, setOrders, orders } ) {

    const [searchFood, setSearchFood] = useState("")
    const [toggleDisplay, setToggleDisplay] = useState(true)

    const filterProduce = produce.filter(food => {
        if (filterFood === "") return true

        return food.kind === filterFood
    })
    
    const search = filterProduce.filter(food => {
        return food.produce.toUpperCase().includes(searchFood.toUpperCase())
    })

    function toggleBtn() {
        setToggleDisplay(!toggleDisplay)
    }

    function handleAddtoCart(item) {
        setCart([...cart, item])
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
                        item={item} 
                        key={item.id} 
                        cart={cart} 
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                        animateAddCart={animateAddCart}
                        />
                    )}
                 </div>
                 : 
                 <div className='produce-column'>
                    {search.map(item => 
                    <ProduceList 
                        item={item} 
                        key={item.id} 
                        cart={cart}
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                    />)}
                </div>
                }
                <div className='cart-container'>
                <Cart 
                    sum={sum}
                    cart={cart}
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