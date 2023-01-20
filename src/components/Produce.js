import React, { useEffect, useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { produce, setUserCart, userCart } ) {

    const [filterFood, setFilterFood] = useState('')

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}/produce/${filterFood}`)
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    // })

    const [searchFood, setSearchFood] = useState("")
    
    const search = produce.filter(food => {
        return food.produce.toUpperCase().includes(searchFood.toUpperCase())
    })
    
    const [toggleDisplay, setToggleDisplay] = useState(true)

    function toggleBtn() {
        setToggleDisplay(!toggleDisplay)
    }

    function handleAddtoCart(item) {
        const newItem = userCart.map(car => {
            if (car.id === item.id) {
                return item
            } else {
                return car
            }
        })
        setUserCart(newItem)
    }

    return(
        <div className='produce'>
            <div className='produce-container'>
                <Search setSearchFood={setSearchFood} toggleBtn={toggleBtn} setFilterFood={setFilterFood}/>
                <div className='cart-container'>
                <Cart userCart={userCart}/>
                </div>
                {toggleDisplay ?
                <div className='produce-items'>
                    {search.map(sear =>
                    <ProduceCard sear={sear} key={sear.id} userCart={userCart} setUserCart={setUserCart} handleAddtoCart={handleAddtoCart}/>)}
                 </div>
                 : 
                 <div className='produce-column'>
                    {search.map(sear => 
                    <ProduceList sear={sear} key={sear.id} userCart={userCart}/>)}
                </div>
                }
            </div>
        </div>
    )
}

export default Produce;