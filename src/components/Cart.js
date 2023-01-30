import React from 'react';
import { Link } from 'react-router-dom'
import CartList from './CartList'
import '../css/Cart.css'

function Cart( { yAxis, produce, setProduce, userCart, setUserCart, onHandleDelete } ) {

    // const [sum, setSum] = useState(0)

    console.log(userCart)

    const sumItem = userCart.map(item => {
        return item.total
    })

    // console.log(sumItem)

    const cost = sumItem.reduce((a, b) => a + b, 0)

    // console.log(cost)

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
                <CartList 
                    cart={cart}
                    produce={produce}
                    key={cart.id}
                    onHandleDelete={onHandleDelete}
                    onHandleUpdate={onHandleUpdate}
                    yAxis={yAxis}
                />
                )}
            </div>
            <div className="total">
                <h1>Total: {cost.toFixed(2)}</h1>
                <Link to='/checkout'>
                    <button className="checkout-btn">Checkout</button>
                </Link>
                </div>
            </div>
        </>
    )
}

export default Cart;