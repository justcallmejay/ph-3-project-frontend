import React from 'react';
import { Link } from 'react-router-dom'
import CartList from './CartList'
import '../css/Cart.css'

function Cart( { yAxis, onHandleDelete, sum, cart } ) {

    return(
        <>
            <div className='cart'>
                <h2 className="cart-title">Your cart:</h2>
                <div className='cart-container-thing'>

                {cart.map(carts => 
                carts.order_id === null ?
                <CartList 
                    carts={carts}
                    key={carts.id}
                    onHandleDelete={onHandleDelete}
                    // yAxis={yAxis}
                />
                    : "" 
                )}
            </div>
            <div className="total">
                <h1>Total: 
                    {sum.toFixed(2)}</h1>
                <Link to='/checkout'>
                    <button className="checkout-btn">Checkout</button>
                </Link>
                </div>
            </div>
        </>
    )
}

export default Cart;