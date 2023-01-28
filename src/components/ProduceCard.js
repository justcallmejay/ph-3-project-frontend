import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { item, userCart, handleAddtoCart, onHandleChange, handleUpdateCart, animateAddCart } ) {

    const [quantityCount, setQuantityCount] = useState(0)
    const [quantityDiscountCount, setQuantityDiscountCount] = useState(0)
    const [check, setCheck] = useState(false)

    // console.log(userCart)
    
    function addToCart(item) {
        const updateFood = userCart.filter(food => {
            if (food.produce !== item.produce) {
            console.log(item)
            } else {
                console.log(food)
            }
            handleAddtoCart(updateFood)
        })

    }

    return(
        <div className='card'>
            <img src={item.image} alt={item.produce}/>
            <h3>{item.produce}</h3>
            {item.quantity > 0 ? 
            <>
            <a>Price: {item.price}</a>
            <div>Quantity: {item.quantity}</div>
             </>
            : <h4>Sold Out</h4>
            }
            {item.discount > 0 ? 
            <>
            <div>Discount Price: {item.discount_price}</div>
            <div>Discount Quantity: {item.discount_quantity}</div>
            <div className='discount-container'>
            <h4>Buy Discount</h4>
            <input type='checkbox' onChange={() => setCheck(!check)}/>
            {check ? <>
            <input 
                type="number" 
                value={quantityDiscountCount}
                keypress="false"
                min="0"
                max={item.discount_quantity}
                maxLength="2"
                onChange={(e) => setQuantityDiscountCount(e.target.value)}
                />
                </> : "" }
                </div>
            </>
            : <h4>Sold Out</h4>}
            <div className='order-card'>

            <input 
                value={quantityCount} 
                className="quantity-num-card" 
                keypress="false"
                type="number"
                min="0"
                maxLength="3"
                max={item.quantity}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            {/* <input type="checkbox"/>Order Discounted Produce */}
            <button className="add-cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
        </div>
    ) 
}

export default ProduceCard;