import React, { useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { setSearchFood, sum, onHandleDelete, handleUpdateCart, produce, filterFood, setFilterFood, cart, setCart } ) {

    const [toggleDisplay, setToggleDisplay] = useState(true)

    function toggleBtn() {
        setToggleDisplay(!toggleDisplay)
    }

    function handleAddtoCart(item) {
        setCart([...cart, item])
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
                    {/*code below if front end is used for filter*/}
                    {/*search.map(item => */}
                    {produce.map(item =>
                    <ProduceCard
                        item={item} 
                        key={item.id} 
                        cart={cart} 
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                        />
                    )}
                 </div>
                 : 
                 <div className='produce-column'>
                    {/*code below if front end is used for filter*/}
                    {/*search.map(item => */}
                    {produce.map(item => 
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
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Produce;