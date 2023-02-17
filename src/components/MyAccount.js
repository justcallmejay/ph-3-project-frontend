import React, { useState } from 'react';
import Error from './Error'
import '../css/MyAccount.css'
import '../css/Error.css'

function MyAccount( { orders, cart, error, setError, errorDisplay, setErrorDisplay, toggleError } ) {

    const [display, setDisplay] = useState(0)
    const displayItems = 600
    
    const [user, setUser] = useState({
        name: "",
        credit_card: ""
    })    
    const [myAccount, setMyAccount] = useState([])
    const [myInfo, setMyInfo] = useState([])
    
    const dateArray = myAccount.map(acc => {return acc.purchased_at})
    const uniq = [...new Set(dateArray)]

    function displayMore() {
        if (display !== 0)
        setDisplay((display + displayItems))
    }
    // console.log((orders.length / 5) * displayItems)
    
    let sum = 0
    function displayLess() {
        sum = sum + 1
        if (sum < (cart.length / 4)) {
            return setDisplay((display - displayItems));
        }
    }

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
        const existingUser = orders.map(user => { return user.order.name })
        const existingCard = orders.map(user => { return String(user.order.credit_card) })
        const typedName = (name) => name === user.name
        const typedCard = (card) => card === user.credit_card
        if (existingUser.some(typedName) === true && existingCard.some(typedCard) === true) {
        const searchAcc = orders.find(person => (String(person.order.credit_card) === user.credit_card))
        console.log(searchAcc.order.credit_card)
            fetch(`${process.env.REACT_APP_API_URL}/cart/${searchAcc.order_id}`)
            .then(res => res.json())
            .then(res => setMyAccount(res));
            fetch(`${process.env.REACT_APP_API_URL}/order/${searchAcc.order_id}`)
            .then(res => res.json())
            .then(res => setMyInfo(res))
        } else {
            // alert('not found')
            setError("Account does not exist")
            setErrorDisplay(!errorDisplay)
        }
    }

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
                                    <input className="enter-info-field" type="text" placeholder="CC#"
                                    name="credit_card" value={user.credit_card} onChange={handleChange} />
                                </div>
                                    <button className="find-acc-btn" onClick={gatherInfo}>Find</button> 
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                        <div className='acc-cart-container'>
                            {cart.length > 0 ? 
                            <>
                            <div className="acc-cart-label">
                                <h3>Your Cart:</h3>
                            </div>
                            <div className="acc-toggle-container">
                                <button className="toggle-btns" onClick={displayMore}>Left</button>
                                    <div className='acc-cart-display-container'>
                                        {cart.map(cart => 
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
                        {uniq.map((act) => 
                        <>
                            <div className='purchase-container' key={act.id}>
                                <div className='date-container'>
                                    <div className="date">
                                        <h5>{act.slice(0, 10)}</h5>
                                    </div>      
                                </div>
                        {myAccount.filter((acc) => acc.purchased_at === act).map((acc) => {
                            return (
                                <div className='purchased-order-container'>
                                <div className="purchased-name">
                                    <h4>{acc.produce.produce}</h4>
                                </div>
                                <div className="purchase-quantity">
                                    <div>Amount: {acc.quantity}</div>
                                </div>

                                <div className='purchased-total'>
                                    <div>Total: {acc.total.toFixed(2)}</div>
                                </div>
                                {acc.dsc_quantity > 0 ? 
                                <>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Qty: {acc.dsc_quantity}</div>
                                    </div>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Total: {acc.dsc_total}</div>
                                    </div>
                                </>
                                : ""}
                            </div>
                            )
                        })}
                        </div>
                    </>
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
            {errorDisplay ? 
                <Error error={error} toggleError={toggleError}/>
                : ""}
        </div>
    )
}

export default MyAccount;