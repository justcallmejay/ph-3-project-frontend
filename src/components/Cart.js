import React, { useState } from 'react';
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
                <button className="checkout-btn">Checkout</button>
                </div>
            </div>
        </>
    )
}

export default Cart;