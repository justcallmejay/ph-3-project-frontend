import React, { useState } from 'react';
import '../css/MyAccount.css'

function MyAccount( { userCart, inventory } ) {

    // console.log(userPurchase)

    const [display, setDisplay] = useState(0)
    const displayItems = 600

    const [user, setUser] = useState({
        name: "",
        credit_card: ""
    })
    
    // const [toggleInfo, setToggleInfo] = useState(false)
    const [myAccount, setMyAccount] = useState([])
    const [myInfo, setMyInfo] = useState([])

    console.log(myInfo)
    
    function displayMore() {
        if (display !== 0 )
        setDisplay((display + displayItems))
    }
    console.log((userCart.length / 5) * displayItems)
    
    let sum = 0
    function displayLess() {
        sum = sum + 1
        if (sum < (inventory.length / 4)) {
            return setDisplay((display - displayItems));
        }
    }
    console.log(sum)

    function handleChange(e) {
        const { name, value } = e.target;

        setUser(info => {
            return {
            ...info, 
            [name]: value
            }
        })
    }

    function gatherInfo() {
        userCart.map(cart => {
            // console.log(cart.order.credit_card)
            if (cart.order.credit_card === undefined) {
                alert('cannot find shopper')
            } else if (cart.order.name === user.name && cart.order.credit_card === Number(user.credit_card)) {
            // setToggleInfo(toggleInfo => !toggleInfo);
            fetch(`${process.env.REACT_APP_API_URL}/cart/${cart.order_id}`)
            .then(res => res.json())
            .then(res => setMyAccount(res));
            fetch(`${process.env.REACT_APP_API_URL}/order/${cart.order_id}`)
            .then(res => res.json())
            .then(res => setMyInfo(res))
            } else {
                alert('no match')
                }
            })
        }

    // const consoleArray = userCart.map(cart => {
    //     return cart.produce.produce
    // })

    console.log(myAccount)

    return (
        <div className="myaccount">
            <div className='myacc-container'>
                <div className='acc-info-container'>
                    <div className='acc-info-label'>
                        <h2>Info:</h2>
                    </div>
                        {myAccount.length !== 0 ? 
                        <div className='input-container'>
                            <div className='acc-input-label'>
                                <h3>Name: </h3>
                                <h3>Phone:</h3>
                            </div>
                            <div className='acc-input-container'>
                                <h3>{myInfo.name}</h3>
                                <h3>{myInfo.phone}</h3>
                            </div>
                        </div>
                        :
                        <div className="input-acc">
                            <div className="input-acc-label">
                                <h4>Shopped here before?  Enter info below</h4>
                            </div>
                            <div className='input-basic-field-container'>
                                <div className="input-basic-field">
                                    <div className="input-labels">
                                        <label>Name:</label>
                                        <label>CC#:</label>
                                    </div>
                                <div className="input-placeholders">
                                    <input className="enter-info-field" type="text" placeholder="Name"
                                    name="name" value={user.name} onChange={handleChange} />
                                    <input className="enter-info-field" type="text" placeholder="Phone"
                                    name="credit_card" value={user.credit_card} onChange={handleChange} />
                                </div>
                                    <button className="find-acc-btn" onClick={gatherInfo}>Find</button> 
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                        <div className='acc-cart-container'>
                            {inventory.length > 0 ? 
                            <>
                            <div className="acc-cart-label">
                                <h3>Your Cart:</h3>
                            </div>
                            <div className="acc-toggle-container">
                                <button className="toggle-btns" onClick={displayMore}>Left</button>
                                    <div className='acc-cart-display-container'>
                                        {inventory.map(cart => 
                                        <div className='myacc-card' key={cart.id} style={{ transform : `translateX(${display}px)`}}>
                                            <img className="myacc-img" src={cart.produce.image} alt={cart.produce.produce}/>
                                            <h3>{cart.produce.produce}</h3>
                                            <a>AMT: {cart.quantity} DISC: {cart.dsc_quantity}</a> 
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
                        {myAccount.length !== 0 ?
                        <>
                        {myAccount.map(acc => 
                    <div className='purchase-container' key={acc.id}>
                        <>
                        <div className="purchased-name">
                            <h3>{acc.produce.produce}</h3>
                        </div>
                        <div className="purchase-quantity">
                            <div>Amount: {acc.quantity}</div>
                        </div>
                        <div className='purchased-total'>
                            <div>Total: {null}</div>
                        </div>
                        </>
                    </div>
                        )}
                        </>
                        :
                        <div className="empty-purchase">
                            <h3>You haven't made a purchase</h3>
                        </div>
                }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;