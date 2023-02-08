import React from 'react';
import { Link } from 'react-router-dom'
import CheckoutList from './CheckoutList'
import '../css/Checkout.css'

function Checkout( { sum, handleUpdateCart, onHandleDelete, inventory, produce } ) {

    return (
        <div className='checkout'>
            <div className='checkout-label'>
                <h1>Your Cart:</h1>
            </div>
            <div className='checkout-container'>
                {inventory.length > 0 ? 
                <>
                <div className='checkout-cart'>
                    {inventory.map(cart =>  
                    <CheckoutList 
                        cart={cart} 
                        key={cart.id} 
                        produce={produce}
                        handleUpdateCart={handleUpdateCart}
                        onHandleDelete={onHandleDelete}
                        />)}
            </div> 
                <h1 className="checkout-total">Total: {
                sum.toFixed(2)}</h1>
                    <Link to="account-information">
                    <button className="proceed-btn">
                        Proceed to Checkout</button>
                    </Link>
                        </>
            :   
                <div className='checkout-empty'>
                    <h1 className='empty'>There is nothing in your cart</h1>
                </div>
                }
            </div>
        </div>
    )
}

export default Checkout;