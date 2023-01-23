import React, { useEffect, useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { setUserCart, userCart } ) {

    const [produce, setProduce] = useState([])
    const [filterFood, setFilterFood] = useState('')
    const [searchFood, setSearchFood] = useState("")
    const [toggleDisplay, setToggleDisplay] = useState(true)
    
    useEffect(() => {
        if (filterFood !== '') {
        fetch(`${process.env.REACT_APP_API_URL}/produce/*`)
        .then(res => res.json())
        .then(res => setProduce(res))
        } else {
        fetch(`${process.env.REACT_APP_API_URL}/produce`)
        .then(res => res.json())
        .then(res => setProduce(res))
        }
    }, [])

    const filterProduce = produce.filter(food => {
        if (filterFood === '') return true;

        return food.kind === filterFood
    })


    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}/produce/${filterFood}`)
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    // })

    
    const search = filterProduce.filter(food => {
        return food.produce.toUpperCase().includes(searchFood.toUpperCase())
    })
    

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
                    {search.map(sear =>
                    <ProduceCard 
                        sear={sear} 
                        key={sear.id} 
                        userCart={userCart} 
                        setUserCart={setUserCart} 
                        handleAddtoCart={handleAddtoCart}
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
                    />)}
                </div>
                }
                <div className='cart-container'>
                <Cart 
                    userCart={userCart}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Produce;