import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import CartList from './CartList'
import '../css/Cart.css'

function Cart( { userCart } ) {

    const sumArray = userCart.map(map => {
        return map.total
    })

    // const sum = sumArray.reduce((a, b) => {
    //     return a + b
    // })

    // console.log(sum)

    return(
        <>
            <div className='cart'>
                <div className='cart-conatiner'>

                <h3>Your cart:</h3>
                {userCart.map(cart => 
                <CartList cart={cart}/>)}
            </div>
            <div className="total">
                <h1>Total: {null}</h1>
                <Link to='/checkout'>
                    <button className="checkout-btn">Checkout</button>
                </Link>
                </div>
            </div>
        </>
    )
}

export default Cart;