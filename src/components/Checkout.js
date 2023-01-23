import React from 'react';
import { Link } from 'react-router-dom'
import CheckoutList from './CheckoutList'
import '../css/Checkout.css'

function Checkout( { userCart } ) {
    return (
        <div className='checkout'>
            <div className='checkout-label'>
                <h1>Your Cart:</h1>
            </div>
            <div className='checkout-container'>

            {userCart.length > 0 ? 
        <div className='checkout-cart'>
            {userCart.map(item => 
            <CheckoutList item={item} key={item.id}/>)}
        <Link to="account-information">
        <a>Total:</a>
            <button>Proceed to Checkout</button>
        </Link>
        </div> 
    : 
        <h1>There is nothing in your cart</h1>
        }
        </div>
    </div>
    )
}

export default Checkout;