import React, { useState } from 'react';
import '../css/Cart.css'

function CartList( { cart } ) {

    const [toggle, setToggle] = useState(false)

    return(
        <div className='cart-list-container'>
                <img className='cart-image' src={cart.image} alt={cart.produce}/>
            <div className='cart-data'>
                <h6>{cart.produce}</h6>
                <a>Quantity: {cart.quantity}</a>
                <a>Total: {cart.total}</a>
            </div>
            <div>
                {toggle ? 
            <button>Delete</button> : ""    
            }
            </div>
        </div>
    )
}

export default CartList;