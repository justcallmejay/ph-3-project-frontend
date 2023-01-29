import React, { useState } from 'react';
import '../css/Cart.css'

function CartList( { yAxis, cart, onHandleDelete, onHandleUpdate, produce } ) {

    const [hover, setHover] = useState(false)
    const itemTotal = cart.price * cart.quantity

    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    function handleDelete(item) {
        // produce.filter(food => { 
        //     if (food.produce === item.produce) {
                // console.log('item matches')
                    // const updateQuantity = food.quantity + cart.quantity
                fetch(`${process.env.REACT_APP_API_URL}/delete/${item.id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(item => onHandleDelete(item))
                // fetch(`${process.env.REACT_APP_API_URL}/update/${food.id}`, {
                //         method: "PATCH",
                //         headers: {"Content-Type" : "application/json"},
                //         body: JSON.stringify({
                //             quantity: updateQuantity
                //         })
                //             })
                //             .then(res => res.json())
                //             .then(res => onHandleUpdate(res))
                // }
            }
            // )}

    return(
        <div className='cart-list-container' 
        style={{ transform: `translateY(${yAxis}px)`}}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        >
                <img className='cart-image' 
                    src={cart.image} 
                    alt={cart.produce} 
                />
            <div className='cart-data'>
                <h6>{cart.produce}</h6>
                <a>Quantity: {cart.quantity}</a>
                <a>Price: {cart.price}</a>
                <a>Total: {itemTotal.toFixed(2)}</a>
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