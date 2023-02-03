import React from 'react';
import { Link } from 'react-router-dom'
import CartList from './CartList'
import '../css/Cart.css'

function Cart( { yAxis, produce, setProduce, userCart, onHandleDelete, sum } ) {

    function onHandleUpdate(item) {
        const updateInventory = produce.map(food => {
            if (food.id === item.id) {
                return item
            } else 
            return food
        })
        setProduce(updateInventory)
    }

    return(
        <>
            <div className='cart'>
                <h3 className="cart-title">Your cart:</h3>
                <div className='cart-container-thing'>

                {userCart.map(cart => 
                cart.order_id !== null ?
                <CartList 
                    cart={cart}
                    produce={produce}
                    key={cart.id}
                    onHandleDelete={onHandleDelete}
                    onHandleUpdate={onHandleUpdate}
                    yAxis={yAxis}
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