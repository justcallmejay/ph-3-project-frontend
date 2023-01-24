import React from 'react';
import { Link } from 'react-router-dom'
import CartList from './CartList'
import '../css/Cart.css'

function Cart( { produce, setProduce, userCart, setUserCart } ) {

    // const [sum, setSum] = useState(0)

    const sumItem = userCart.map(item => {
        return item.total
    })

    console.log(sumItem)

    const cost = sumItem.reduce((a, b) => a + b, 0)

    console.log(cost)

    function onHandleDelete(item) {
        const deleteItem = userCart.filter(cart => item.id !== cart.id)
        setUserCart(deleteItem)
    }

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
                <div className='cart-conatiner-2'>

                <h3>Your cart:</h3>
                {userCart.map(cart => 
                <CartList 
                    cart={cart}
                    produce={produce}
                    key={cart.id}
                    onHandleDelete={onHandleDelete}
                    onHandleUpdate={onHandleUpdate}
                />
                
                )}
            </div>
            <div className="total">
                <h1>Total: {cost}</h1>
                <Link to='/checkout'>
                    <button className="checkout-btn">Checkout</button>
                </Link>
                </div>
            </div>
        </>
    )
}

export default Cart;