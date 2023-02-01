import React, { useEffect, useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { onHandleDelete, produce, setProduce, filterFood, setFilterFood, setUserCart, userCart, onHandleChange } ) {

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
        setUserCart([...userCart, item])
    }

    function handleUpdateCart(item) {
        const updateCart = userCart.map(food => {
            if (food.id === item.id) {
                return item
            } else {
                return food
            }
        })
        setUserCart(updateCart)
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
                        userCart={userCart} 
                        handleAddtoCart={handleAddtoCart}
                        onHandleChange={onHandleChange}
                        handleUpdateCart={handleUpdateCart}
                        />
                    )}
                 </div>
                 : 
                 <div className='produce-column'>
                    {search.map(sear => 
                    <ProduceList 
                        sear={sear} 
                        key={sear.id} 
                        userCart={userCart}
                        handleAddtoCart={handleAddtoCart}
                        onHandleChange={onHandleChange}
                    />)}
                </div>
                }
                <div className='cart-container'>
                <Cart 
                    userCart={userCart}
                    setUserCart={setUserCart}
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