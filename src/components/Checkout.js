import React from 'react';
import CheckoutList from './CheckoutList'
import '../css/Checkout.css'

function Checkout( { userCart } ) {
    return (
        <div className='checkout'>
            <div className='checkout-container'>

            {userCart.length > 0 ? 
        <div className='checkout-cart'>
            {userCart.map(item => 
            <CheckoutList item={item}/>)}
        </div> 
    : 
        <h1>There is nothing in your cart</h1>    
        }
        </div>
    </div>
    )
}

export default Checkout;