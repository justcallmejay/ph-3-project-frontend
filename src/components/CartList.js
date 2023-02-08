import React, { useState } from 'react';
import '../css/Cart.css'

function CartList( { yAxis, cart, onHandleDelete, onHandleUpdate } ) {

    const [hover, setHover] = useState(false)
    const itemTotal = (cart.produce.price * cart.quantity)
    const discountTotal = (cart.produce.discount_price * cart.dsc_quantity)

    // console.log(cart.produce.discount_price)
    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    function handleDelete(item) {
        fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(item => onHandleDelete(item))
    }


    return(
        <div className='cart-list-container' 
        style={{ transform: `translateY(${yAxis}px)`}}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        >
                <img className='cart-image' 
                    src={cart.produce.image} 
                    alt={cart.produce.produce} 
                />
            <div className='cart-data'>
                <h6>{cart.produce.produce}</h6>
                <p>Price: {cart.produce.price}</p>
                <p>Qty: {cart.quantity}</p>
                <p>Total: {itemTotal.toFixed(2)}</p>
                <p>Disc. Qty: {cart.dsc_quantity}</p>
                <p>Disc. Total:{discountTotal.toFixed(2)}</p>
            </div>
                {hover ? 
                <>
                <button className='checkout-delete' onClick={() => handleDelete(cart)}>Delete</button>
                </>
                : ""}
        </div>
    )
}

export default CartList;