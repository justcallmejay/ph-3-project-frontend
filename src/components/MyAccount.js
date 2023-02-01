import React, { useState } from 'react';
import '../css/MyAccount.css'

function MyAccount( { userCart, userPurchase } ) {

    // console.log(userPurchase)

    const [display, setDisplay] = useState(0)
    const displayItems = 600

    
    function displayMore() {
        if (display !== 0 )
        setDisplay((display + displayItems))
    }
    console.log((userCart.length / 5) * displayItems)
    
    function displayLess() {
        if (Math.abs(display) < (userCart.length / 8) * displayItems) {
            return setDisplay((display - displayItems));
        }
    }

    const consoleArray = userCart.map(cart => {
        return cart.produce.produce
    })

    console.log(consoleArray)

    return (
        <div className="myaccount">
            <div className='myacc-container'>
                <div className='acc-info-container'>
                    <div className='acc-info-label'>
                        <h2>Info:</h2>
                    </div>
                    <div className='input-container'>
                        <div className='acc-input-label'>
                            <h3>Name: </h3>
                            <h3>Phone:</h3>
                            <h3>CC: </h3>
                            <h6>Exp: </h6>
                        </div>
                        <div className='acc-input-container'>
                            <h3>John Smith</h3>
                            <h3>2020202202</h3>
                            <h3>23432423423423</h3>
                            <h6>23/22</h6>
                        </div>
                    </div>
                    </div>
                        <div className='acc-cart-container'>
                            {userCart.length > 0 ? 
                            <>
                            <div className="acc-cart-label">
                                <h3>Your Cart:</h3>
                            </div>
                            <div className="acc-toggle-container">
                                <button className="toggle-btns" onClick={displayMore}>Left</button>
                                    <div className='acc-cart-display-container'>
                                        {userCart.map(cart =>
                                        <div className='myacc-card' key={cart.id} style={{ transform : `translateX(${display}px)`}}>
                                            <img className="myacc-img" src={cart.produce.image}/>
                                            <h3>{cart.produce.produce}</h3>
                                            <a>AMT: {cart.quantity}</a>  | <a>{cart.produce.price}</a>
                                        </div>
                                    )}
                                    </div>
                                <button className="toggle-btns" onClick={displayLess}>Right</button>
                            </div>
                                    </>
                                : 
                                  <div className='empty-cart'>
                                    <h3>There is nothing in your cart</h3>
                                  </div>
                            }
                        </div>
                <div className=''>
                    
                </div>
             <div className="purchase-history-container">
                <div className='purchase-label'>
                    <h3>Your purchase:</h3>
                </div>
                <div className="purchase-list-container">

                            {/* {userPurchase.length > 0 ?
                        <>
                    {userPurchase.map(paid => 
                    <div className='purchase-container'>
                        <div className="purchased-name">
                            <h3>{paid.produce}</h3>
                        </div>
                        <div className="purchase-quantity">
                            <div>Amount: {paid.quantity}</div>

                        </div>
                        <div className='purchased-total'>
                            <div>Total: {paid.total}</div>
                        </div>
                    </div>
                        )}
                        </> */}
                        {/* :  */}
                        <div className="empty-purchase">
                            <h3>You haven't made a purchase</h3>
                        </div>
                {/* } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;