## AboutUs.js

import React from 'react';
import '../css/AboutUs.css'

function AboutUs() {
    return(
        <div className="about-us">
            <div className="about-container">
            <section>Food Waste Stats:</section>
            <p>According to the U.S. Department of Agriculture, around 30-40 percent of food is wasted each year.</p>
            </div>
        </div>
    )
}

export default AboutUs;

## AcountInfo.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Error from './Error'
import '../css/AccountInfo.css'
import '../css/Error.css'

function AccountInfo( { account, formData, setFormData, handleAddAccount, error, setError, errorDisplay, setErrorDisplay, toggleError } ) {

    let history = useHistory();
    const onlyNumbersRegExp = /^\d+$/
    
    const [checkAgree, setCheckAgree] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [existingAcc, setExistingAcc] = useState(true)
    const number = [formData.areacode, formData.threedigits, formData.fourdigits].join('')
    const ccNumber = [formData.fstdigits, formData.snddigits, formData.thddigits, formData.fthdigits].join('')
    const ccCode = [formData.expmon, formData.expyr, formData.code].join('')

    console.log(ccCode)
    
    function handleChange(e) {
        const {name, value} = e.target;
        
        setFormData(info => {
            return {
                ...info, 
                [name]: value
            }
        })
    }

    function toggleSearchExistingInfo() {
        setExistingAcc(!existingAcc)
    }
    
    function toggleDisplay() {
        setToggle(!toggle)
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        // const existingName = account.map(person => {return person.name})
        // const existingCard = account.map(card => {return String(card.credit_card)})
        // const inputExistingName = (name) => name === formData.name
        // const inputExistingCard = (card) => card === ccNumber
        const searchAcc = account.find(acc => (acc.name === formData.name && String(acc.credit_card) === ccNumber && ([acc.exp_mon, acc.exp_yr, acc.code].join('')) === ccCode))

        if (existingAcc === false) {
            if (searchAcc)  {
            // if (existingName.some(inputExistingName) && existingCard.some(inputExistingCard)) {
            account.map(acc => {
                if (acc.name === formData.name) {
                    //convert to phone to string
                    let newone = String(acc.phone).slice(0,3)
                    let newtwo = String(acc.phone).slice(3,6)
                    let newthree = String(acc.phone).slice(6,10)
                    //converting back to number
                    formData.areacode = Number(newone)
                    formData.threedigits = Number(newtwo)
                    formData.fourdigits = Number(newthree)
                    history.push('/confirm')
                        }
                    })
                } else (setError("Information not found"))
                setErrorDisplay(!errorDisplay)
            } else {
        if (!formData.name) {
            setError("Complete name")
            setErrorDisplay(!errorDisplay)
        } else if (!formData.areacode || !formData.threedigits || !formData.fourdigits) {
            setError("Fill out phone number")
            setErrorDisplay(!errorDisplay)
        } else if (!onlyNumbersRegExp.test(formData.areacode) || !onlyNumbersRegExp.test(formData.threedigits) || !onlyNumbersRegExp.test(formData.areacode) ||!onlyNumbersRegExp.test(formData.fstdigits) || !onlyNumbersRegExp.test(formData.snddigits) || !onlyNumbersRegExp.test(formData.thddigits) || !onlyNumbersRegExp.test(formData.fthdigits) || !onlyNumbersRegExp.test(formData.expmon) || !onlyNumbersRegExp.test(formData.expyr) || !onlyNumbersRegExp.test(formData.code)) {
            setError("Use only numbers")
            setErrorDisplay(!errorDisplay)
        } else if (formData.expmon > 12) {
            setError("Month cannot be exceed 12")
            setErrorDisplay(!errorDisplay)
        } else if (formData.expyr < 23) {
            setError("Card expired")
            setErrorDisplay(!errorDisplay)
        } else if (formData.areacode.length < 3 || formData.threedigits.length < 3 || formData.fourdigits.length < 4 ) {
            setError("Complete phone number")
            setErrorDisplay(!errorDisplay)
        } else if (!formData.fstdigits || !formData.snddigits || !formData.thddigits || !formData.fthdigits || !formData.expmon || !formData.expyr || !formData.code) {
            setError("Fill out credit card information")
            setErrorDisplay(!errorDisplay) 
        } else if (formData.fstdigits.length < 4 || formData.snddigits.length < 4 || formData.thddigits.length < 4 || formData.fthdigits.length < 4 || formData.expmon.length < 2 || formData.expyr.length < 2 || formData.code.length < 3) {
            setError("Complete credit card information")
            setErrorDisplay(!errorDisplay)
        } else if (searchAcc)
        // (existingName.some(inputExistingName) && existingCard.some(inputExistingCard)) 
        {
            setError("Account already exists")
            setErrorDisplay(!errorDisplay)
        } else if (!checkAgree) {
            setError("Please click agree")
            setErrorDisplay(!errorDisplay)
        } else {
        history.push('/confirm')
        fetch(`${process.env.REACT_APP_API_URL}/order`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                name: formData.name,
                phone: `${formData.areacode}${formData.threedigits}${formData.fourdigits}`,
                credit_card: `${formData.fstdigits}${formData.snddigits}${formData.thddigits}${formData.fthdigits}`,
                exp_mon: formData.expmon,
                exp_yr: formData.expyr,
                code: formData.code
            })
        })
        .then(res => res.json())
        .then(res => handleAddAccount(res))
        }
        console.log(error)
        }
    }

    return (
        <div className='info-container'>
            <div className='info-box'>
                <div className='existing-container'>
                    <input type="checkbox" onChange={toggleSearchExistingInfo}/> 
                    <p>I have shopped here.  (Type your name and credit card.)</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="name-container">
                        <label>Full Name:</label>
                        <input 
                            className="placeholder" name='name' type="text"
                            placeholder='Full Name' value={formData.name} onChange={handleChange}
                            style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                    </div>
                    <div className="phone" >
                        <label>Phone Number:</label>
                        <input className="number" name='areacode' type="text"
                        maxLength="3" placeholder='000' 
                        value={formData.areacode} onChange={handleChange}
                        disabled={ existingAcc ? "" : true}
                        />
                        <input 
                        className="number" name='threedigits' type="text" 
                        maxLength="3" placeholder='123' 
                        value={formData.threedigits} onChange={handleChange}
                        disabled={ existingAcc ? "" : true}
                        />
                        <input className="number" name='fourdigits' type="text"
                        maxLength="4" placeholder='4567' 
                        value={formData.fourdigits} onChange={handleChange}
                        disabled={ existingAcc ? "" : true}
                        />
                    </div>
                    <div className="credit-card">
                        <label>Credit Card:</label>
                        <input className="credit-no" name='fstdigits' type="text"
                        maxLength="4" placeholder='1234' 
                        value={formData.fstdigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                        <input className="credit-no" name='snddigits' type="text" 
                        maxLength="4" placeholder='4567' 
                        value={formData.snddigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                        <input className="credit-no" name='thddigits' 
                        type="text" maxLength="4" placeholder='8901' 
                        value={formData.thddigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                        <input className="credit-no" name='fthdigits' type="text"
                        maxLength="4" placeholder='2345' 
                        value={formData.fthdigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                    </div>
                    <div className="exp-date">
                        <label>Expiration Date:</label>
                        <input className="exp-no" name='expmon' type="text" maxLength="2" 
                        placeholder='00' value={formData.expmon} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />/
                        <input className="exp-no" name='expyr' type="text" maxLength="2"
                        placeholder='00' value={formData.expyr} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }} 
                        />
                        <label>Code:</label>
                        <input className="code-no" name='code' type="text" maxLength="3"
                        placeholder='' value={formData.code} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                    </div>
                    <div className="terms-container">
                        <div className='toa'>
                            <h6>By clicking on checkbox you agree with terms and conditions with Fresh Food Market Place</h6>
                            <input type="checkbox" disabled={ existingAcc ? "" : true} onChange={() => setCheckAgree(!checkAgree)}/>
                        </div>
                            <h6 className="whats-this-link" onClick={toggleDisplay}>What's this?</h6>
                            {toggle ? 
                        <div className="whats-this-container">
                            <div className="whats-this">
                            <p>This checkbox states that all the information provided is accurate.</p>
                        </div>
                         </div>
                         : ""}
                    </div>
                        <button className="acc-btn" id="confirm-next">Next</button>
                </form>
                        <Link to="/checkout"><button className="acc-btn" id="confirm-back">Back</button></Link>
            </div>
                {errorDisplay ? 
                <Error error={error} toggleError={toggleError}/>
                : ""}
                </div>
    )
}

export default AccountInfo;

## Carts.js

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

## CartList.js

import React, { useState } from 'react';
import '../css/Cart.css'

function CartList( { yAxis, carts, onHandleDelete } ) {

    const [hover, setHover] = useState(false)
    const itemTotal = (carts.produce.price * carts.quantity)
    const discountTotal = (carts.produce.discount_price * carts.dsc_quantity)

    // console.log(carts.produce.discount_price)
    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    function handleDelete(item) {
        fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(item => onHandleDelete(item))
    }

    return(
        <div className='cart-list-container' 
        style={{ transform: `translateY(${yAxis}px)`}}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        >
                <img className='cart-image' 
                    src={carts.produce.image} 
                    alt={carts.produce.produce} 
                />
            <div className='cart-data'>
                <h6>{carts.produce.produce}</h6>
                <p>Price: {carts.produce.price}</p>
                <p>Qty: {carts.quantity}</p>
                <p>Total: {itemTotal.toFixed(2)}</p>
                <p>Disc. Qty: {carts.dsc_quantity}</p>
                <p>Disc. Total:{discountTotal.toFixed(2)}</p>
            </div>
                <div className="delete-btn-container">
                    {hover ? 
                    <>
                    <button className='cart-delete-btn' onClick={() => handleDelete(carts)}>Delete</button>
                    </>
                    : ""}
                </div>
        </div>
    )
}

export default CartList;

## Checkout.js

import React from 'react';
import { Link } from 'react-router-dom'
import CheckoutList from './CheckoutList'
import '../css/Checkout.css'

function Checkout( { sum, handleUpdateCart, onHandleDelete, cart, produce } ) {

    return (
        <div className='checkout'>
            <div className='checkout-label'>
                <h1>Your Cart:</h1>
            </div>
            <div className='checkout-container'>
                {cart.length > 0 ? 
                <>
                <div className='checkout-cart'>
                    {cart.map(cart => 
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
                    <Link to="/account-information">
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

## CheckoutList.js

import React, { useState } from 'react';
import '../css/Cart.css'

function CheckoutList( { cart, onHandleDelete, handleUpdateCart } ) {

    const [hover, setHover] = useState(false)

    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    const itemTotal = (cart.produce.price * cart.quantity)
    const discountTotal = (cart.produce.discount_price * cart.dsc_quantity)

    let sumItem = itemTotal + discountTotal

    //Edit inventory quantity
    const [submitEdit, setSubmitEdit] = useState(null)
    const [produceQuantity, setProduceQuantity] = useState(cart.quantity)
    const [dscQuantity, setDscQuantity] = useState(cart.dsc_quantity)
    
    function handleEdit(food) {
        setSubmitEdit(null)
        fetch(`${process.env.REACT_APP_API_URL}/cart/${food.id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                quantity: produceQuantity,
                dsc_quantity: dscQuantity
            })
        })
        .then(res => res.json())
        .then(res => handleUpdateCart(res))
        setSubmitEdit(null);
}

    function handleDelete(item) {
        console.log(item.id)
        fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(item => onHandleDelete(item))
    }

    return(
        <div className="checkout-list" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            // style={{ backgroundColor: cart.id % 2 == 0 ? "red" : "yellow" }}
            >
            <div className='checkout-main-info'>
                <img className="checkout-img" src={cart.produce.image} alt={cart.produce.name}/>
                <h3>{cart.produce.produce}</h3>
            </div>
            <div className="produce-info">
                <div className="co-produce-section">
                    <div className="co-produce-amt">
                    <a>Price: {cart.produce.price}</a>
                        <p>Quantity:</p>
                        {submitEdit === cart.id ?
                        <>
                            <input className="co-edit-num" type="number" min="0" max={cart.produce.quantity}
                            value={produceQuantity} onChange={(e) => setProduceQuantity(e.target.value)}
                            />
                            <button onClick={() => handleEdit(cart)}>OK</button>
                        </> 
                            :    
                            <p>{cart.quantity}</p>}
                    </div>
                    <div className='co-produce-total'>
                        <div>Total: {itemTotal.toFixed(2)}</div>
                    </div>
                </div>
                <div className="co-produce-discount-section">
                    <div className='co-produce-discount-amt'>
                    <a>Price: {cart.produce.discount_price}</a>
                        <p>Disc. Qty:</p>
                        {submitEdit === cart.id ?
                        <>
                            <input className="co-edit-num" type="number" min="0" max={cart.produce.discount_quantity}
                            value={dscQuantity} onChange={(e) => setDscQuantity(e.target.value)}
                            />
                            <button onClick={() => handleEdit(cart)}>OK</button>
                        </> 
                            :    
                            <div>{cart.dsc_quantity}</div>}
                    </div>
                    <div className='co-produce-discount-total'>
                        <a>Disc. Total: {discountTotal.toFixed(2)}</a>
                    </div>
                </div>
                <div className='produce-total'>
                    <div>Total: {sumItem.toFixed(2)}</div>
                </div>
            </div>
            {hover ? 
            <div className='hover-btn'>
                <button className='checkout-edit' onClick={() => setSubmitEdit(cart.id)}>Edit</button>
                <button className='checkout-delete' onClick={() => handleDelete(cart)}>Delete</button> 
            </div>
               : "" }
        </div>
    )
}

export default CheckoutList;

## CheckoutPage.js

import React, { useState, useEffect } from 'react';
import AccountInfo from './AccountInfo';
import Checkout from './Checkout';
import Confirm from './Confirm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const initialStateValue = [{
    name: "",
    areacode: "",
    threedigits: "",
    fourdigits: "",
    fstdigits: "",
    snddigits: "",
    thddigits: "",
    fthdigits: "",
    expmon: "",
    expyr: "",
    code: ""
}]

function CheckoutPage( {
    sum,
    cart,
    setCart,
    produce,
    handleUpdateCart,
    handleUpdateInventory,
    onHandleDelete,
    error,
    setError,
    errorDisplay,
    toggleError,
    setErrorDisplay
}

) {

const [formData, setFormData] = useState(initialStateValue)

const [account, setAccount] = useState([])
   //MOVE THIS TO ACCOUNTINFO: ACCOUNT IS ONLY BEING PASSED INTO
    //gets accounts
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/order`)
        .then(res => res.json())
        .then(res => setAccount(res))
    }, [])
    
    console.log(account)
    
    function handleAddAccount(newAccount) {
        setAccount([...account, newAccount])
    }

    //This does not pass both items in cart
    function handleUpdateProduce(food) {
        console.log(food)
    }

return (
    <div className="checkout-page">
    <BrowserRouter>
        <Switch>
            <Route path="/checkout">
                <Checkout       
                    sum={sum}
                    cart={cart} 
                    produce={produce}
                    handleUpdateCart={handleUpdateCart}
                    onHandleDelete={onHandleDelete}
                />
            </Route>
            <Route path="/account-information">
                <AccountInfo 
                    formData={formData} 
                    setFormData={setFormData}
                    account={account}
                    handleAddAccount={handleAddAccount}
                    error={error}
                    setError={setError}
                    errorDisplay={errorDisplay}
                    setErrorDisplay={setErrorDisplay}
                    toggleError={toggleError}
                    />
            </Route>
            <Route path="/confirm">
                <Confirm
                    cart={cart} 
                    setCart={setCart}
                    sum={sum}
                    formData={formData} 
                    account={account}
                    handleUpdateInventory={handleUpdateInventory}
                    handleUpdateProduce={handleUpdateProduce}
                    />
            </Route>
        </Switch>
    </BrowserRouter>
    </div>
    )
}

export default CheckoutPage;

## Confirm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/Confirm.css'

function Confirm( { formData, sum, account, handleUpdateInventory, cart, setCart, handleUpdateProduce } ) {

    const [transactionComplete, setTransactionComplete] = useState(true)
    const ccInfo = [formData.fstdigits, formData.snddigits, formData.thddigits]
    const ccNumber = [formData.fstdigits, formData.snddigits, formData.thddigits, formData.fthdigits].join('')
    
    const date = new Date().toDateString();

    const maskCreditCard = ccInfo.map(card => {
        return card.replace(/[0-9]/g, "*").match(/.{1,4}/g).join("");
});

    // console.log(account)
    function toggleTransaction(){
        setTransactionComplete(action => !action)
    }

    // console.log(findInventory)

    function addIdToCart() {
        // const newArray = []
        setCart([])
        const existingName = account.map(person => {return person.name})
        const existingCard = account.map(card => {return String(card.credit_card)})
        const typedName = (name) => name === formData.name
        const typedCard = (card) => card === ccNumber
        if (existingName.some(typedName) && existingCard.some(typedCard)) {

        const addId = account.find(person => (person.name === formData.name && String(person.credit_card) === ccNumber))
                  
        cart.forEach(acc => {
                // console.log(acc.id)
                fetch(`${process.env.REACT_APP_API_URL}/account/${acc.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        order_id: addId.id,
                        purchased_at: date
                    })
                })
                .then(res => res.json())
                .then(res => handleUpdateInventory(res));
                // console.log(newArray)
                const subtractQuantity = acc.produce.quantity - acc.quantity
                const subtractDscQuantity = acc.produce.discount_quantity - acc.dsc_quantity
                fetch(`${process.env.REACT_APP_API_URL}/produce/${acc.produce_id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        quantity: subtractQuantity,
                        discount_quantity: subtractDscQuantity,
                    })
                })
                .then(res => res.json())
                .then(res => handleUpdateProduce(res))
            })
            toggleTransaction()
        // const newArrayOrders = orders.concat(newArray)
        // setOrders(newArrayOrders)
        // console.log(newArrayOrders)
    }}


    return(
        <div className='confirm'>
            {transactionComplete ? 
            <div className='confirm-container'>
                <h2>Information</h2>
                <div className='confirm-info'>
                    <h3>Name: {formData.name}</h3>
                    <h3>Phone: ({formData.areacode}) {formData.threedigits}-{formData.fourdigits}</h3>
                    <h3>Card Info: {maskCreditCard[0]} {maskCreditCard[1]} {maskCreditCard[2]} {formData.fthdigits}</h3>
                    <h3>Expires: {formData.expmon} / {formData.expyr}</h3>
                </div>
                <div className='receipt-container'>
                    <h3>Receipt:</h3>
                    {cart.map(item => 
                    <div className='receipt' key={item.id}>
                        <p>{item.produce.produce}</p>
                        <p>Amt: {item.quantity}</p>
                        <p>Price: {item.produce.price}</p>
                        <p>Totpl: {item.total}</p>
                    </div>
                        )}
                </div>
                <div className='submit-sum'><h3>Total: {sum.toFixed(2)}</h3></div>
                <div className='confirm-btns'>
                <Link to="/account-information">
                    <button className="acc-btn" id="confirm-back">Back</button>
                    </Link>
                <button className="acc-btn" id="onfirm-next" onClick={addIdToCart}>Submit</button>
                </div>
            </div>
        : <div className='success-container'>
            <div className='success'>
            <h3>Transaction Complete! You may now return </h3><Link to='/shop'><p>here</p></Link>
            </div>
            </div>}
        </div> 
        )
    }

export default Confirm;

## Error.js

import React from 'react';

function Error( { error, toggleError } ) {

    return (
            <div className="error-msg">
                <div className="error-msg-container">
                    <div className="error">
                        <div className="error-quote">Error: {error}</div>
                    </div>
                        <div className="error-btn-container">
                            <button className='error-btn' onClick={toggleError}>Ok</button>
                        </div>
                </div>
            </div>
    )
}

export default Error;

## Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css'

function Home() {
    return(
    <div className='home'>
        <div className="bar-top">
        <div className='home-container'>
            <h1>Welcome to Fresh Take</h1>
            <section>Fresh Take is a small business local store that aims to reduce wasted food.  We strive to stand out in the fresh produce market by taking the extra time to sort our fruits and vegetables by time and sell produce that have sat on the shelf for longer.</section>
            <Link to='/shop'><h4>Start Shopping Here</h4></Link>
        </div>
        <div className="bar-bottom"></div>
            </div>
    </div>
    );
}

export default Home;

## MyAccount.js

import React, { useState } from 'react';
import Error from './Error'
import '../css/MyAccount.css'
import '../css/Error.css'

function MyAccount( { orders, cart, error, setError, errorDisplay, setErrorDisplay, toggleError } ) {

    const [display, setDisplay] = useState(0)
    const displayItems = 600
    console.log(error)

    // console.log(cart.length / 4)

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
    
    function displayLess() {
        if (Math.abs(display) < (cart.length / 5 * displayItems)) {
            setDisplay((display - displayItems));
        }
    }

    // console.log(Math.abs(display))

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
        const searchAcc = orders.find(person => (String(person.order.credit_card) === user.credit_card && person.order.name === user.name))
        if (searchAcc) {
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
                        {myAccount.filter((acc) => acc.purchased_at === act).map((aco) => {
                            return (
                                <div className='purchased-order-container' key={aco.id}>
                                <div className="purchased-name">
                                    <h4>{aco.produce.produce}</h4>
                                </div>
                                <div className="purchase-quantity">
                                    <div>Amount: {aco.quantity}</div>
                                </div>
                                <div className='purchased-total'>
                                    <div>Total: {aco.total.toFixed(2)}</div>
                                </div>
                                {aco.dsc_quantity > 0 ? 
                                <>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Qty: {aco.dsc_quantity}</div>
                                    </div>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Total: {aco.dsc_total}</div>
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

## Navbar.js

import React from "react";
import { NavLink } from "react-router-dom";
import '../css/Navbar.css'

function Navbar() {

    const linkStyles = {
        display: "inline-block",
        width: "100px",
        height: "40px",
        padding: "12px",
        margin: " 10px 15px 10px 10px",
        float: "right",
        position: "relative",
        textDecoration: "none",
        color: "white",
        fontSize: "16px"
    }
    
    const activeLink = {
        textDecoration: "underline",
        color: "white"
    }

    return(
        <div className="navbar">
            <NavLink
            to='/about'
            exact style={linkStyles}
            activeStyle={activeLink}
            >About Us
            </NavLink>

            <NavLink
            to='/checkout'
            exact style={linkStyles}
            activeStyle={activeLink}
            >Checkout
            </NavLink>
            
            <NavLink
            to='/my-account'
            exact style={linkStyles}
            activeStyle={activeLink}
            >My Account
            </NavLink>
            
            <NavLink
            to='/shop'
            exact style={linkStyles}
            activeStyle={activeLink}
            >Shop
            </NavLink>
        </div>
    )
}

export default Navbar;

## Produce.js

import React, { useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { sum, onHandleDelete, handleUpdateCart, produce, filterFood, setFilterFood, cart, setCart } ) {

    const [searchFood, setSearchFood] = useState("")
    const [toggleDisplay, setToggleDisplay] = useState(true)

    const filterProduce = produce.filter(food => {
        if (filterFood === "") return true

        return food.kind === filterFood
    })
    
    const search = filterProduce.filter(food => {
        return food.produce.toUpperCase().includes(searchFood.toUpperCase())
    })

    function toggleBtn() {
        setToggleDisplay(!toggleDisplay)
    }

    function handleAddtoCart(item) {
        setCart([...cart, item])
    }

    const [yAxis, setyAxis] = useState(0)
    const addToAxis = 0
    
    // console.log(yAxis)
    
    function animateAddCart() {
        setyAxis((yAxis + addToAxis))
    }

    return(
        <div className='produce'>
            <div className='produce-container'>
                <div className="search-container">
                    <Search 
                        setSearchFood={setSearchFood} 
                        toggleBtn={toggleBtn}
                        filterFood={filterFood} 
                        setFilterFood={setFilterFood}
                    />
                </div>
                <div className="shopper-container">

                {toggleDisplay ?
                <div className='produce-items'>
                    {search.map(item =>
                    <ProduceCard
                        item={item} 
                        key={item.id} 
                        cart={cart} 
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                        animateAddCart={animateAddCart}
                        />
                    )}
                 </div>
                 : 
                 <div className='produce-column'>
                    {search.map(item => 
                    <ProduceList 
                        item={item} 
                        key={item.id} 
                        cart={cart}
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                    />)}
                </div>
                }
                <div className='cart-container'>
                <Cart 
                    sum={sum}
                    cart={cart}
                    onHandleDelete={onHandleDelete}
                    yAxis={yAxis}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Produce;

## ProduceCard.js

import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { item, handleAddtoCart, handleUpdateCart, animateAddCart, cart } ) {

    const [check, setCheck] = useState(false)
    const [quantityCount, setQuantityCount] = useState(0)
    const [quantityDiscountCount, setQuantityDiscountCount] = useState(0)

    function addToCart(food) {
        let dscQuantity = ""
        let dscTotal = ""     

        if (food.quantity === null || food.discount_quantity === null) {
            alert('there is no more in stock') 
        } else {
            if (quantityCount !== 0 || quantityDiscountCount !== 0) {
                const existingItem = cart.map(carts => {return carts.produce_id})
                const currentItem = (card) => card === food.id
            if (existingItem.some(currentItem) === true) {
                const qtyNum = cart.find(item => item.produce_id === food.id)
                    if (qtyNum.quantity + parseInt(quantityCount) > item.quantity || qtyNum.dsc_quantity + parseInt(quantityDiscountCount) > item.discount_quantity) {
                         alert('Not enough in stock');
                         setQuantityCount(0);
                         setQuantityDiscountCount(0);
                     } else { 
                        if (check === true) {
                            dscQuantity = parseInt(quantityDiscountCount) + qtyNum.dsc_quantity;
                            dscTotal = qtyNum.produce.discount_price * parseInt(quantityDiscountCount, 10)
                        }
                        const updateQuantity = (qtyNum.quantity + parseInt(quantityCount, 10))
                        const updateTotal = qtyNum.produce.price * updateQuantity
                        fetch(`${process.env.REACT_APP_API_URL}/cart/${qtyNum.id}`, {
                            method: "PATCH",
                            headers: {"Content-Type" : "application/json"},
                            body: JSON.stringify({
                                quantity: updateQuantity,
                                total: updateTotal,
                                dsc_quantity: dscQuantity,
                                dsc_total: dscTotal
                            })
                        })
                .then(res => res.json())
                .then(addFood => handleUpdateCart(addFood));
                setQuantityCount(0)
                setQuantityDiscountCount(0)
                }
            } else {
                if (check === true ) {
                    dscQuantity = quantityDiscountCount;
                    dscTotal = (item.price * parseInt(quantityDiscountCount, 10))
                } else {
                    dscQuantity = 0
                    dscTotal = 0
                }
                const itemTotal = (food.price * quantityCount).toFixed(2)
                fetch(`${process.env.REACT_APP_API_URL}/carts`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    produce_id: food.id,
                    order_id: "",
                    quantity: quantityCount,
                    total: itemTotal,
                    dsc_quantity: dscQuantity,
                    dsc_total: dscTotal
                })
            })
            .then(res => res.json())
            .then(addFood => handleAddtoCart(addFood));
            setQuantityCount(0)
            setQuantityDiscountCount(0)
                }
            }
        else 
            alert('select the amount')
            }
        }

    return(
        <div className='card'>
            <img src={item.image} alt={item.produce}/>
            <h3>{item.produce}</h3>
            {item.quantity > 0 ? 
            <>
            <a>Price: {item.price}</a>
            {/* <div>Quantity: {item.quantity}</div> */}
             </>
            : <h4>Sold Out</h4>
            }
            {item.discount > 0 ? 
            <>
            <div>Discount Price: {item.discount_price}</div>
            {/* <div>Discount Quantity: {item.discount_quantity}</div> */}
            <div className='discount-container'>
                <div className='discount-label-card'>
                    <h4>Buy Discount</h4>
                </div>
                <div className='discount-checkbox-card'>
                    <input className='produce-card-checkbox' type='checkbox' onChange={() => setCheck(!check)}/>
                        {check ? <>
                            <input
                                className="quantity-num-card" type="number" 
                                keypress="false" max={item.discount_quantity} min="0" maxLength="2"
                                value={quantityDiscountCount} onChange={(e) => setQuantityDiscountCount(e.target.value)}
                            /> </> : "" }
                    </div>
                </div>
            </>
            : <h4>Sold Out</h4>}
            <div className='order-card'>

            <input 
                value={quantityCount} 
                className="quantity-num-card" 
                keypress="false"
                type="number"
                min="0"
                maxLength="3"
                max={item.quantity}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            {/* <input type="checkbox"/>Order Discounted Produce */}
            <button className="add-cart-btn" onClick={() => {addToCart(item); animateAddCart()}}>Add to Cart</button>
            </div>
        </div>
    ) 
}

export default ProduceCard;

## ProduceList.js

import React, { useState } from 'react';
import '../css/ProduceList.css'

function ProduceList( { item, cart, handleAddtoCart, handleUpdateCart } ) {

    const [quantityCount, setQuantityCount] = useState(0)
    const [check, setCheck] = useState(false)
    const [quantityDiscountCount, setQuantityDiscountCount] = useState(0)

    function addToCart(food) {
        let dscQuantity = ""
        let dscTotal = ""     

        if (food.quantity === null || food.discount_quantity === null) {
            alert('there is no more in stock') 
        } else {
            if (quantityCount !== 0 || quantityDiscountCount !== 0) {
                const existingItem = cart.map(carts => {return carts.produce_id})
                const currentItem = (card) => card === food.id
            if (existingItem.some(currentItem) === true) {
                const qtyNum = cart.find(item => item.produce_id === food.id)
                    if (qtyNum.quantity + parseInt(quantityCount) > item.quantity || qtyNum.dsc_quantity + parseInt(quantityDiscountCount) > item.discount_quantity) {
                         alert('Not enough in stock');
                         setQuantityCount(0);
                         setQuantityDiscountCount(0);
                     } else { 
                        if (check === true) {
                            dscQuantity = parseInt(quantityDiscountCount) + qtyNum.dsc_quantity;
                            dscTotal = qtyNum.produce.discount_price * parseInt(quantityDiscountCount, 10)
                        }
                        const updateQuantity = (qtyNum.quantity + parseInt(quantityCount, 10))
                        const updateTotal = qtyNum.produce.price * updateQuantity
                        fetch(`${process.env.REACT_APP_API_URL}/cart/${qtyNum.id}`, {
                            method: "PATCH",
                            headers: {"Content-Type" : "application/json"},
                            body: JSON.stringify({
                                quantity: updateQuantity,
                                total: updateTotal,
                                dsc_quantity: dscQuantity,
                                dsc_total: dscTotal
                            })
                        })
                .then(res => res.json())
                .then(addFood => handleUpdateCart(addFood));
                setQuantityCount(0)
                setQuantityDiscountCount(0)
                }
            } else {
                if (check === true ) {
                    dscQuantity = quantityDiscountCount;
                    dscTotal = (item.price * parseInt(quantityDiscountCount, 10))
                } else {
                    dscQuantity = 0
                    dscTotal = 0
                }
                const itemTotal = (food.price * quantityCount).toFixed(2)
                fetch(`${process.env.REACT_APP_API_URL}/carts`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    produce_id: food.id,
                    order_id: "",
                    quantity: quantityCount,
                    total: itemTotal,
                    dsc_quantity: dscQuantity,
                    dsc_total: dscTotal
                })
            })
            .then(res => res.json())
            .then(addFood => handleAddtoCart(addFood));
            setQuantityCount(0)
            setQuantityDiscountCount(0)
                }
            }
        else 
            alert('select the amount')
            }
        }


    return(
        <div className='list'>
            <img className="wrapper" src={item.image} alt={item.produce}/>
            <div>{item.produce}</div>
            {item.quantity > 0 ? 
            <>
            <div>Price: {item.price}</div>
            {/* <div>Quantity: {item.quantity}</div>  */}
            </>
            :
            <h4>Sold Out</h4>}
            {item.discount > 0 ? 
            <>
            <div>Discount Price: {item.discount_price}</div>
            {/* <div>Discount Quantity: {item.discount_quantity}</div> */}
            <div className='discount-container-list'>
                <div className='discount-label'>
                    <h4>Buy Discount</h4>
                </div>
                <div className='discount-action'>
                    <input type='checkbox' onChange={() => setCheck(!check)}/>
                        {check ? <>
                            <input
                                className="quantity-num-card"
                                type="number" 
                                value={quantityDiscountCount}
                                keypress="false"
                                min="0"
                                max={item.discount_quantity}
                                maxLength="2"
                                onChange={(e) => setQuantityDiscountCount(e.target.value)}
                            />
                        </> : "" }
                </div>
            </div>
            </>
            : <h4>Sold Out</h4>}
            <input 
                className="quantity-num-list" 
                type="number" 
                min="0"
                max={item.quantity}
                keypress="false" 
                value={quantityCount}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            <button className="add-cart-btn-list" onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
    )
}

export default ProduceList;

## Search.js

import React, { useState } from 'react';
import '../css/Produce.css'

function Search( { setSearchFood, filterFood, setFilterFood, toggleBtn } ) {

const [currentSearch, setCurrentSearch] = useState('')

function findFood() {
    setSearchFood(currentSearch);
    setCurrentSearch('')
}

function onChangeValue(e) {
    setFilterFood(e.target.value)
}

return(
    <div className='searchbar'>
        <input type="text" placeholder='Type Here' value={currentSearch} onChange={(e) => setCurrentSearch(e.target.value)}/>
        <button className="search-btn" onClick={findFood}>Search</button>
        {/* <select onChange={(e) => setFilterFood(e.target.value)}>
            <option value=''>Filter</option>
            <option value='fruit'>Fruit</option>
            <option value='vegetable'>Vegetables</option>
        </select> */}
        <button className="toggle" onClick={toggleBtn}>View</button>
        <input type="radio" value="" checked={filterFood === ""} onChange={onChangeValue}/>All
        <input type="radio" value="fruit" checked={filterFood === "fruit"} onChange={onChangeValue}/>Fruit
        <input type="radio" value="vegetable" checked={filterFood === "vegetable"} onChange={onChangeValue}/>Vegetable

    </div>
    )
}

export default Search;

## Shop.js

import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AboutUs from './AboutUs';
import CheckoutPage from './CheckoutPage';
import MyAccount from './MyAccount';
import Navbar from './Navbar';
import Produce from './Produce';
import '../index.css'

function Shop() {

    const [filterFood, setFilterFood] = useState('')
    const [orders, setOrders] = useState([])
    const [produce, setProduce] = useState([])
    const [cart, setCart] = useState([])
    
    // useEffect(() => {
    //     orders.map(inCart => {
    //         if (inCart.order_id === null) {
    //             return inCart
    //         }}
    //         )}
    // , [])
            
            
    //gets all purchased items
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/purchased`)
        .then(res => res.json())
        .then(res => setOrders(res))
    }, [cart])
    // Orders works, but it isn't console logged in orders.  If you were to go to MyAccount, it will display multiple items despite the console log returning only one.
    console.log(orders)
    
    //gets produce
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/produce`)
        .then(res => res.json())
        .then(res => setProduce(res))
        // }
    }, [])
    
    console.log(produce)
    // console.log(cart)
    
    function handleUpdateCart(item) {
        const updateCart = cart.map(food => {
            if (food.id === item.id) {
                return item
            } else {
                return food
            }
        })
        setCart(updateCart)
    }
    
    function onHandleDelete(item) {
        const deleteItem = cart.filter(cart => cart.id !== item.id)
        setCart(deleteItem)
    }

    function handleUpdateInventory(food) {
        return setOrders([...orders, food])
    }
    
    //PREVENT DRY
    const sumItem = cart.map(item => {
        if (item.order_id === null) {
        return (item.produce.price * item.quantity)
        } else {
            return 0
        }
    })

    
    const cost = sumItem.reduce((a, b) => a + b, 0)
    
    const dscItem = cart.map(item => {
        if (item.order_id === null) {
            // console.log(item)
            return (item.produce.discount_price * item.dsc_quantity)
        } 
        else {
            return 0
        }
    })
    
    const discountTotal = dscItem.reduce((a, b) => a + b, 0)
    
    const sum = discountTotal + cost
    

    const [error, setError] = useState("")
    const [errorDisplay, setErrorDisplay] = useState(false)
    function toggleError() {
        setErrorDisplay(!errorDisplay)
    }

    // console.log(error)

    return(
        <div className='shop'>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route path="/shop">
                        <Produce
                            sum={sum}
                            produce={produce}
                            setProduce={setProduce}
                            cart={cart}
                            setCart={setCart}
                            handleUpdateCart={handleUpdateCart}
                            filterFood={filterFood}
                            setFilterFood={setFilterFood}
                            onHandleDelete={onHandleDelete}
                        />
                    </Route>
                    <Route path='/my-account'>
                        <MyAccount
                            orders={orders} 
                            cart={cart}
                            error={error}
                            setError={setError}
                            errorDisplay={errorDisplay}
                            setErrorDisplay={setErrorDisplay}
                            toggleError={toggleError}
                            />
                    </Route>
                    <Route path="/checkout">
                        <CheckoutPage 
                            setOrders={setOrders}
                            orders={orders}
                            sum={sum}
                            cart={cart}
                            setCart={setCart}
                            produce={produce}
                            handleUpdateCart={handleUpdateCart}
                            onHandleDelete={onHandleDelete}
                            error={error}
                            setError={setError}
                            errorDisplay={errorDisplay}
                            toggleError={toggleError}
                            setErrorDisplay={setErrorDisplay}
                            handleUpdateInventory={handleUpdateInventory}
                        />
                    </Route>
                    <Route path='/about'>
                        <AboutUs/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Shop;

## AccountInfo.js

        fetch(`${process.env.REACT_APP_API_URL}/order/find=${ccNumber}`)
        .then(res => res.json())
        .then(shopper => setFindUser(shopper))
        if (findUser === null) {
            console.log('not found')
        } else {
            console.log(findUser)
        }
        // const existingName = account.map(person => {return person.name})
        // const existingCard = account.map(card => {return String(card.credit_card)})
        // const inputExistingName = (name) => name === formData.name
        // const inputExistingCard = (card) => card === ccNumber
        // const searchAcc = account.find(acc => (acc.name === formData.name && String(acc.credit_card) === ccNumber && ([acc.exp_mon, acc.exp_yr, acc.code].join('')) === ccCode))

        // if (existingAcc === true) {
        //     if (searchAcc)  {
        //     // if (existingName.some(inputExistingName) && existingCard.some(inputExistingCard)) {
        //     account.map(acc => {
        //         if (acc.name === formData.name) {
        //             //convert to phone to string
        //             let newone = String(acc.phone).slice(0,3)
        //             let newtwo = String(acc.phone).slice(3,6)
        //             let newthree = String(acc.phone).slice(6,10)
        //             //converting back to number
        //             formData.areacode = Number(newone)
        //             formData.threedigits = Number(newtwo)
        //             formData.fourdigits = Number(newthree)
        //             history.push('/confirm')
        //                 }
        //             })
        //         } else (setError("Information not found"))
        //         setErrorDisplay(!errorDisplay)
        //     } else {
        // if (!formData.name) {
        //     setError("Complete name")
        //     setErrorDisplay(!errorDisplay)
        // } else if (!formData.areacode || !formData.threedigits || !formData.fourdigits) {
        //     setError("Fill out phone number")
        //     setErrorDisplay(!errorDisplay)
        // } else if (!onlyNumbersRegExp.test(formData.areacode) || !onlyNumbersRegExp.test(formData.threedigits) || !onlyNumbersRegExp.test(formData.areacode) ||!onlyNumbersRegExp.test(formData.fstdigits) || !onlyNumbersRegExp.test(formData.snddigits) || !onlyNumbersRegExp.test(formData.thddigits) || !onlyNumbersRegExp.test(formData.fthdigits) || !onlyNumbersRegExp.test(formData.expmon) || !onlyNumbersRegExp.test(formData.expyr) || !onlyNumbersRegExp.test(formData.code)) {
        //     setError("Use only numbers")
        //     setErrorDisplay(!errorDisplay)
        // } else if (formData.expmon > 12) {
        //     setError("Month cannot be exceed 12")
        //     setErrorDisplay(!errorDisplay)
        // } else if (formData.expyr < 23) {
        //     setError("Card expired")
        //     setErrorDisplay(!errorDisplay)
        // } else if (formData.areacode.length < 3 || formData.threedigits.length < 3 || formData.fourdigits.length < 4 ) {
        //     setError("Complete phone number")
        //     setErrorDisplay(!errorDisplay)
        // } else if (!formData.fstdigits || !formData.snddigits || !formData.thddigits || !formData.fthdigits || !formData.expmon || !formData.expyr || !formData.code) {
        //     setError("Fill out credit card information")
        //     setErrorDisplay(!errorDisplay) 
        // } else if (formData.fstdigits.length < 4 || formData.snddigits.length < 4 || formData.thddigits.length < 4 || formData.fthdigits.length < 4 || formData.expmon.length < 2 || formData.expyr.length < 2 || formData.code.length < 3) {
        //     setError("Complete credit card information")
        //     setErrorDisplay(!errorDisplay)
        // } else if (findUser !== null)
        // // (existingName.some(inputExistingName) && existingCard.some(inputExistingCard)) 
        // {
        //     setError("Account already exists")
        //     setErrorDisplay(!errorDisplay)
        // } else if (!checkAgree) {
        //     setError("Please click agree")
        //     setErrorDisplay(!errorDisplay)
        // } else {
        // history.push('/confirm')
        // fetch(`${process.env.REACT_APP_API_URL}/order`, {
        //     method: "POST",
        //     headers: {"Content-Type" : "application/json"},
        //     body: JSON.stringify({
        //         name: formData.name,
        //         phone: `${formData.areacode}${formData.threedigits}${formData.fourdigits}`,
        //         credit_card: `${formData.fstdigits}${formData.snddigits}${formData.thddigits}${formData.fthdigits}`,
        //         exp_mon: formData.expmon,
        //         exp_yr: formData.expyr,
        //         code: formData.code
        //     })
        // })
        // .then(res => res.json())
        // .then(res => handleAddAccount(res))
        // }
        // console.log(error)
        // }

## accountinfo 

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Error from './Error'
import '../css/AccountInfo.css'
import '../css/Error.css'

function AccountInfo( { findUser, setFindUser, formData, setFormData, handleAddAccount, error, setError, errorDisplay, setErrorDisplay, toggleError } ) {

    let history = useHistory();
    const onlyNumbersRegExp = /^\d+$/
    
    const [checkAgree, setCheckAgree] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [existingAcc, setExistingAcc] = useState(false)
    const number = [formData.areacode, formData.threedigits, formData.fourdigits].join('')
    const ccNumber = [formData.fstdigits, formData.snddigits, formData.thddigits, formData.fthdigits].join('')
    const ccCode = [formData.expmon, formData.expyr, formData.code].join('')

    console.log(findUser)
    console.log(ccCode)
    
    function handleChange(e) {
        const {name, value} = e.target;
        
        setFormData(info => {
            return {
                ...info, 
                [name]: value
            }
        })
    }

    function toggleSearchExistingInfo() {
        setExistingAcc(!existingAcc)
    }
    
    function toggleDisplay() {
        setToggle(!toggle)
    }
    
    function handleSubmit(e) {
        e.preventDefault();
//User does not input name
        if (!formData.name) {
            setError("Complete name")
            setErrorDisplay(!errorDisplay)
//User does not input phone number
        } else if (!formData.areacode || !formData.threedigits || !formData.fourdigits) {
            setError("Fill out phone number")
            setErrorDisplay(!errorDisplay)
            //User does not fill out credit card into
        } else if (!formData.fstdigits || !formData.snddigits || !formData.thddigits || !formData.fthdigits || !formData.expmon || !formData.expyr || !formData.code) {
            setError("Fill out credit card information")
            setErrorDisplay(!errorDisplay) 
//User input letters in number only fields
        } else if (!onlyNumbersRegExp.test(formData.areacode) || !onlyNumbersRegExp.test(formData.threedigits) || !onlyNumbersRegExp.test(formData.areacode) ||!onlyNumbersRegExp.test(formData.fstdigits) || !onlyNumbersRegExp.test(formData.snddigits) || !onlyNumbersRegExp.test(formData.thddigits) || !onlyNumbersRegExp.test(formData.fthdigits) || !onlyNumbersRegExp.test(formData.expmon) || !onlyNumbersRegExp.test(formData.expyr) || !onlyNumbersRegExp.test(formData.code)) {
            setError("Use only numbers")
            setErrorDisplay(!errorDisplay)
//User input month greater than 12
        } else if (formData.expmon > 12) {
            setError("Month cannot be exceed 12")
            setErrorDisplay(!errorDisplay)
//User input year before 2023
        } else if (formData.expyr < 23) {
            setError("Card expired")
            setErrorDisplay(!errorDisplay)
//User incomplete phone number
        } else if (formData.areacode.length < 3 || formData.threedigits.length < 3 || formData.fourdigits.length < 4 ) {
            setError("Complete phone number")
            setErrorDisplay(!errorDisplay)
//User does not complete credit card info
        } else if (formData.fstdigits.length < 4 || formData.snddigits.length < 4 || formData.thddigits.length < 4 || formData.fthdigits.length < 4 || formData.expmon.length < 2 || formData.expyr.length < 2 || formData.code.length < 3) {
            setError("Complete credit card information")
            setErrorDisplay(!errorDisplay)
//User doesn't check agree checkbox
        } else if (!checkAgree) {
            setError("Please click agree")
            setErrorDisplay(!errorDisplay)
//User DOES fill out info
        } else if (formData.name !== "" && ccNumber !== "") {
            fetch(`${process.env.REACT_APP_API_URL}/order/find=${ccNumber}`)
                .then(res => res.json())
                .then(shopper => { 
                    // console.log(shopper.credit_card)
                    console.log(ccNumber)
//NEW IF/ELSE BLOCK
//Query returns null
                if (shopper === null) {
                    console.log('Account created')
                    setError("")
                    history.push('/confirm')
                    fetch(`${process.env.REACT_APP_API_URL}/order`, {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify({
                            name: formData.name,
                            phone: `${formData.areacode}${formData.threedigits}${formData.fourdigits}`,
                            credit_card: `${formData.fstdigits}${formData.snddigits}${formData.thddigits}${formData.fthdigits}`,
                            exp_mon: formData.expmon,
                            exp_yr: formData.expyr,
                            code: formData.code
                        })
                    })
                    .then(res => res.json())
                    .then(res => handleAddAccount(res))
        }
        //User clicks on checkbox stating that user has shopped before
                            else if (existingAcc === true) {
        //Information matches
                                    if (shopper.name === formData.name && ccNumber === String(shopper.credit_card) && formData.exp_mon === String(shopper.exp_mon && formData.exp_yr === String(shopper.exp_yr && formData.code === String(shopper.code)))) {
                                        let newone = String(shopper.phone).slice(0,3)
                                        let newtwo = String(shopper.phone).slice(3,6)
                                        let newthree = String(shopper.phone).slice(6,10)
                                        formData.areacode = Number(newone)
                                        formData.threedigits = Number(newtwo)
                                        formData.fourdigits = Number(newthree)
                                        history.push('/confirm')
        //Information does not match
                                    } else { 
                                        (setError("Information not found"))
                                        setErrorDisplay(!errorDisplay)
                                    } 
                                }
//User account already exists
                    else if (String(shopper.credit_card) === ccNumber) {
                        console.log('found')
                        setError("Account already exists")
                        setErrorDisplay(!errorDisplay)
                    } 
                    })
                } 
            }
    

    return (
        <div className='info-container'>
            <div className='info-box'>
                <div className='existing-container'>
                    <input type="checkbox" onChange={toggleSearchExistingInfo}/> 
                    <p>I have shopped here.  (Type your name and credit card.)</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="name-container">
                        <label>Full Name:</label>
                        <input 
                            className="placeholder" name='name' type="text"
                            placeholder='Full Name' value={formData.name} onChange={handleChange}
                            style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : "" }}
                        />
                    </div>
                    <div className="phone" >
                        <label>Phone Number:</label>
                        <input className="number" name='areacode' type="text"
                        maxLength="3" placeholder='000' 
                        value={formData.areacode} onChange={handleChange}
                        disabled={ existingAcc ? true : ""}
                        />
                        <input 
                        className="number" name='threedigits' type="text" 
                        maxLength="3" placeholder='123' 
                        value={formData.threedigits} onChange={handleChange}
                        disabled={ existingAcc ? true : ""}
                        />
                        <input className="number" name='fourdigits' type="text"
                        maxLength="4" placeholder='4567' 
                        value={formData.fourdigits} onChange={handleChange}
                        disabled={ existingAcc ? true : ""}
                        />
                    </div>
                    <div className="credit-card">
                        <label>Credit Card:</label>
                        <input className="credit-no" name='fstdigits' type="text"
                        maxLength="4" placeholder='1234' 
                        value={formData.fstdigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : "" }}
                        />
                        <input className="credit-no" name='snddigits' type="text" 
                        maxLength="4" placeholder='4567' 
                        value={formData.snddigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : "" }}
                        />
                        <input className="credit-no" name='thddigits' 
                        type="text" maxLength="4" placeholder='8901' 
                        value={formData.thddigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : "" }}
                        />
                        <input className="credit-no" name='fthdigits' type="text"
                        maxLength="4" placeholder='2345' 
                        value={formData.fthdigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : "" }}
                        />
                    </div>
                    <div className="exp-date">
                        <label>Expiration Date:</label>
                        <input className="exp-no" name='expmon' type="text" maxLength="2" 
                        placeholder='00' value={formData.expmon} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : ""}}
                        />/
                        <input className="exp-no" name='expyr' type="text" maxLength="2"
                        placeholder='00' value={formData.expyr} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : "" }} 
                        />
                        <label>Code:</label>
                        <input className="code-no" name='code' type="text" maxLength="3"
                        placeholder='' value={formData.code} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "green" : "" }}
                        />
                    </div>
                    <div className="terms-container">
                        <div className='toa'>
                            <h6>By clicking on checkbox you agree with terms and conditions with Fresh Food Market Place</h6>
                            <input type="checkbox" disabled={ existingAcc ? true : ""} onChange={() => setCheckAgree(!checkAgree)}/>
                        </div>
                            <h6 className="whats-this-link" onClick={toggleDisplay}>What's this?</h6>
                            {toggle ? 
                        <div className="whats-this-container">
                            <div className="whats-this">
                            <p>This checkbox states that all the information provided is accurate.</p>
                        </div>
                         </div>
                         : ""}
                    </div>
                        <button className="acc-btn" id="confirm-next">Next</button>
                </form>
                        <Link to="/checkout"><button className="acc-btn" id="confirm-back">Back</button></Link>
            </div>
                {errorDisplay ? 
                <Error error={error} toggleError={toggleError}/>
                : ""}
                </div>
    )
}

export default AccountInfo;













## myaccount

import React, { useState } from 'react';
import Error from './Error'
import '../css/MyAccount.css'
import '../css/Error.css'

function MyAccount( { orders, cart, error, setError, errorDisplay, setErrorDisplay, toggleError } ) {

    const [display, setDisplay] = useState(0)
    const displayItems = 600
    console.log(error)

    // console.log(cart.length / 4)

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
    
    function displayLess() {
        if (Math.abs(display) < (cart.length / 5 * displayItems)) {
            setDisplay((display - displayItems));
        }
    }

    // console.log(Math.abs(display))

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
        fetch(`${process.env.REACT_APP_API_URL}/order/find=${user.credit_card}`)
        .then(res => res.json())
        .then(res => setMyInfo(res))
        if (myInfo !== []) {
        console.log(myInfo.id)
            fetch(`${process.env.REACT_APP_API_URL}/cart/${myInfo.id}`)
            .then(res => res.json())
            .then(res => setMyAccount(res));
        } else {
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
                        {myAccount.filter((acc) => acc.purchased_at === act).map((aco) => {
                            return (
                                <div className='purchased-order-container' key={aco.id}>
                                <div className="purchased-name">
                                    <h4>{aco.produce.produce}</h4>
                                </div>
                                <div className="purchase-quantity">
                                    <div>Amount: {aco.quantity}</div>
                                </div>
                                <div className='purchased-total'>
                                    <div>Total: {aco.total.toFixed(2)}</div>
                                </div>
                                {aco.dsc_quantity > 0 ? 
                                <>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Qty: {aco.dsc_quantity}</div>
                                    </div>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Total: {aco.dsc_total}</div>
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

## Confirm 

import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/Confirm.css'

function Confirm( { formData, sum, account, handleUpdateInventory, cart, setCart, handleUpdateProduce, setOrders, orders } ) {

    const [transactionComplete, setTransactionComplete] = useState(true)
    const ccInfo = [formData.fstdigits, formData.snddigits, formData.thddigits]
    const ccNumber = [formData.fstdigits, formData.snddigits, formData.thddigits, formData.fthdigits].join('')
    
    const date = new Date().toDateString();

    const maskCreditCard = ccInfo.map(card => {
        return card.replace(/[0-9]/g, "*").match(/.{1,4}/g).join("");
});

    // console.log(account)
    function toggleTransaction(){
        setTransactionComplete(action => !action)
    }

    // console.log(findInventory)

    function addIdToCart() {
        fetch(`${process.env.REACT_APP_API_URL}/order/find=${ccNumber}`)
        .then(res => res.json())
        .then(account => {
        // const newArray = []
        // setCart([])
        // const existingName = account.map(person => {return person.name})
        // const existingCard = account.map(card => {return String(card.credit_card)})
        // const typedName = (name) => name === formData.name
        // const typedCard = (card) => card === ccNumber
        // if (existingName.some(typedName) && existingCard.some(typedCard)) {

        // const addId = account.find(person => (person.name === formData.name && String(person.credit_card) === ccNumber))
                  
        cart.forEach(acc => {
                // console.log(acc.id)
                fetch(`${process.env.REACT_APP_API_URL}/account/${acc.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        order_id: account.id,
                        purchased_at: date
                    })
                })
                .then(res => res.json())
                .then(res => handleUpdateInventory(res));
                // console.log(newArray)
                const subtractQuantity = acc.produce.quantity - acc.quantity
                const subtractDscQuantity = acc.produce.discount_quantity - acc.dsc_quantity
                fetch(`${process.env.REACT_APP_API_URL}/produce/${acc.produce_id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        quantity: subtractQuantity,
                        discount_quantity: subtractDscQuantity,
                    })
                })
                .then(res => res.json())
                .then(res => handleUpdateProduce(res))
            })
            toggleTransaction()
            setCart([])
        // const newArrayOrders = orders.concat(newArray)
        // setOrders(newArrayOrders)
        // console.log(newArrayOrders)
    // }
})
}


    return(
        <div className='confirm'>
            {transactionComplete ? 
            <div className='confirm-container'>
                <h2>Information</h2>
                <div className='confirm-info'>
                    <h3>Name: {formData.name}</h3>
                    <h3>Phone: ({formData.areacode}) {formData.threedigits}-{formData.fourdigits}</h3>
                    <h3>Card Info: {maskCreditCard[0]} {maskCreditCard[1]} {maskCreditCard[2]} {formData.fthdigits}</h3>
                    <h3>Expires: {formData.expmon} / {formData.expyr}</h3>
                </div>
                <div className='receipt-container'>
                    <h3>Receipt:</h3>
                    {cart.map(item => 
                    <div className='receipt' key={item.id}>
                        <p>{item.produce.produce}</p>
                        <p>Amt: {item.quantity}</p>
                        <p>Price: {item.produce.price}</p>
                        <p>Totpl: {item.total}</p>
                    </div>
                        )}
                </div>
                <div className='submit-sum'><h3>Total: {sum.toFixed(2)}</h3></div>
                <div className='confirm-btns'>
                <Link to="/account-information">
                    <button className="acc-btn" id="confirm-back">Back</button>
                    </Link>
                <button className="acc-btn" id="onfirm-next" onClick={addIdToCart}>Submit</button>
                </div>
            </div>
        : <div className='success-container'>
            <div className='success'>
            <h3>Transaction Complete! You may now return </h3><Link to='/shop'><p>here</p></Link>
            </div>
            </div>}
        </div> 
        )
    }

export default Confirm;

// const [toggleDeleteDisplay, setToggleDeleteDisplay] = useState(false)

// function toggleAlert() {
//     setToggleDeleteDisplay(!toggleDeleteDisplay)
// }

// function toggleBgAlert() {
//     if (toggleDeleteDisplay === true) {
//         setToggleDeleteDisplay(!toggleDeleteDisplay)
//     }
// }

// {toggleDeleteDisplay ?
//     <div className='delete-info-bg'>
//         <div className="delete-info-container">
//             <div className='delete-info'>
//                 <h3>Are you sure you want to go back?  This will erase submitted data from the last page.</h3>
//             </div>
//                 <div className='delete-info-btn-container'>
//                     <Link to="/account-information">
//                     <button className="confirm-btn">Yes</button>
//                     </Link>
//                     <button className="confirm-btn"onClick={toggleAlert}>No</button> 
//                 </div>
//         </div>
//     </div> : ""}

## MyAccount

import React, { useState } from 'react';
import Error from './Error'
import '../css/MyAccount.css'
import '../css/Error.css'

function MyAccount( { cart, error, setError, errorDisplay, setErrorDisplay, toggleError } ) {

    const [display, setDisplay] = useState(0)
    const displayItems = 600
    console.log(error)

    // console.log(cart.length / 4)

    const [user, setUser] = useState({
        name: "",
        credit_card: ""
    })    
    const [myAccount, setMyAccount] = useState([])
    const [myInfo, setMyInfo] = useState([])

    console.log(myAccount)
    
    const dateArray = myAccount.map(acc => {return acc.purchased_at})
    const uniq = [...new Set(dateArray)]
    const userAcc = myAccount.map(acc => {return acc.order.name})
    const uniqUser = [...new Set(userAcc)]
    const userPhone = myAccount.map(acc => {return acc.order.phone})
    const uniqPhone = [...new Set(userPhone)]

    console.log(uniqUser)

    function displayMore() {
        if (display !== 0)
        setDisplay((display + displayItems))
    }
    
    function displayLess() {
        if (Math.abs(display) < (cart.length / 7 * displayItems)) {
            setDisplay((display - displayItems));
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
        if (user.name === "" || user.credit_card === "") {
            setError("Field is blank")
            setErrorDisplay(!errorDisplay)
        } else if (user.name !== "" && user.credit_card !== "") {
        fetch(`${process.env.REACT_APP_API_URL}/order/find=${user.credit_card}`)
        .then(res => res.json())
        .then(res => {
            if (res.name === user.name && String(res.credit_card) === user.credit_card) { 
            fetch(`${process.env.REACT_APP_API_URL}/cart/${res.id}`)
            .then(res => res.json())
            .then(res => setMyAccount(res))
            } else {
                setError('Account does not match')
                setErrorDisplay(!errorDisplay)
            }
        })
            } else {
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
                                <h3>{uniqUser}</h3>
                                <h3>{uniqPhone}</h3>
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
                        {myAccount.filter((acc) => acc.purchased_at === act).map((aco) => {
                            return (
                                <div className='purchased-order-container' key={aco.id}>
                                <div className="purchased-name">
                                    <h4>{aco.produce.produce}</h4>
                                </div>
                                <div className="purchase-quantity">
                                    <div>Amount: {aco.quantity}</div>
                                </div>
                                <div className='purchased-total'>
                                    <div>Total: {aco.total.toFixed(2)}</div>
                                </div>
                                {aco.dsc_quantity > 0 ? 
                                <>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Qty: {aco.dsc_quantity}</div>
                                    </div>
                                    <div className='purchased-dsc-quantity'>
                                        <div>Dsc Total: {aco.dsc_total}</div>
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

## Shop

import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AboutUs from './AboutUs';
import AccountInfo from './AccountInfo';
import Checkout from './Checkout';
import Confirm from './Confirm';
import MyAccount from './MyAccount';
import Navbar from './Navbar';
import Produce from './Produce';
import '../index.css'

function Shop() {

    const [formData, setFormData] = useState({
        name: "",
        areacode: "",
        threedigits: "",
        fourdigits: "",
        fstdigits: "",
        snddigits: "",
        thddigits: "",
        fthdigits: "",
        expmon: "",
        expyr: "",
        code: ""
    })
    const [filterFood, setFilterFood] = useState('')
    const [orders, setOrders] = useState([])
    const [account, setAccount] = useState([])
    const [produce, setProduce] = useState([])
    const [cart, setCart] = useState([])

    const [findUser, setFindUser] = useState([])
        
//     useEffect(() => {
//     orders.map(inCart => {
//         if (inCart.order_id === null) {
//             return inCart
//             }}
//         )}
// , [])

    
    //gets all purchased items
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}/purchased`)
    //     .then(res => res.json())
    //     .then(res => setOrders(res))
    // }, [cart])
    
    //gets accounts
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_URL}/order`)
    //     .then(res => res.json())
    //     .then(res => setAccount(res))
    // }, [])
    
    function handleAddAccount(newAccount) {
        setAccount([...account, newAccount])
    }
    
    //gets produce
    useEffect(() => {
                fetch(`${process.env.REACT_APP_API_URL}/produce`)
                .then(res => res.json())
                .then(res => setProduce(res))
                // }
            }, [])

    function handleUpdateCart(item) {
        const updateCart = cart.map(food => {
            if (food.id === item.id) {
                return item
            } else {
                return food
            }
        })
        setCart(updateCart)
    }
    
    function onHandleDelete(item) {
        const deleteItem = cart.filter(cart => cart.id !== item.id)
        setCart(deleteItem)
    }
    
    function handleUpdateInventory(food) {
        return setOrders([...orders, food])
    }

    //This does not pass both items in cart
    function handleUpdateProduce(food) {
        console.log(food)
    }
    
    //PREVENT DRY
    const sumItem = cart.map(item => {
        if (item.order_id === null) {
        return (item.produce.price * item.quantity)
        } else {
            return 0
        }
    })


    const cost = sumItem.reduce((a, b) => a + b, 0)

    const dscItem = cart.map(item => {
        if (item.order_id === null) {
            // console.log(item)
            return (item.produce.discount_price * item.dsc_quantity)
        } 
        else {
            return 0
        }
    })

    const discountTotal = dscItem.reduce((a, b) => a + b, 0)

    const sum = discountTotal + cost

    console.log(produce)
    // It works, but it isn't console logged in orders.  If you were to go to MyAccount, it will display multiple items despite the console log returning only one.
    // console.log(orders)
    // console.log(cart)

    const [error, setError] = useState("")
    const [errorDisplay, setErrorDisplay] = useState(false)
    function toggleError() {
        setErrorDisplay(!errorDisplay)
    }

    console.log(error)

    return(
        <div className='shop'>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route path="/shop">
                        <Produce
                            sum={sum}
                            produce={produce}
                            setProduce={setProduce}
                            cart={cart}
                            setCart={setCart}
                            handleUpdateCart={handleUpdateCart}
                            filterFood={filterFood}
                            setFilterFood={setFilterFood}
                            onHandleDelete={onHandleDelete}
                            // setOrders={setOrders}
                            // orders={orders}
                        />
                    </Route>
                    <Route path='/my-account'>
                        <MyAccount
                            // orders={orders} 
                            cart={cart}
                            error={error}
                            setError={setError}
                            errorDisplay={errorDisplay}
                            setErrorDisplay={setErrorDisplay}
                            toggleError={toggleError}
                            />
                    </Route>
                    <Route path="/checkout">
                        <Checkout
                            sum={sum}
                            cart={cart} 
                            produce={produce}
                            handleUpdateCart={handleUpdateCart}
                            onHandleDelete={onHandleDelete}
                        />
                    </Route>
                    <Route path="/account-information">
                        <AccountInfo
                            findUser={findUser}
                            setFindUser={setFindUser} 
                            formData={formData} 
                            setFormData={setFormData}
                            handleAddAccount={handleAddAccount}
                            error={error}
                            setError={setError}
                            errorDisplay={errorDisplay}
                            setErrorDisplay={setErrorDisplay}
                            toggleError={toggleError}
                            />
                    </Route>
                    <Route path="/confirm">
                        <Confirm
                            findUser={findUser}
                            setCart={setCart}
                            formData={formData} 
                            cart={cart} 
                            account={account}
                            sum={sum}
                            handleUpdateInventory={handleUpdateInventory}
                            handleUpdateProduce={handleUpdateProduce}
                            produce={produce}
                            setProduce={setProduce}
                            // orders={orders}
                            // setOrders={setOrders}
                            />
                    </Route>
                    <Route path='/about'>
                        <AboutUs/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Shop;

## Produce

import React, { useState } from 'react';
import Search from './Search';
import Cart from './Cart';
import ProduceCard from './ProduceCard';
import ProduceList from './ProduceList';
import '../css/Produce.css'

function Produce( { sum, onHandleDelete, handleUpdateCart, produce, filterFood, setFilterFood, cart, setCart } ) {

    const [searchFood, setSearchFood] = useState("")
    const [toggleDisplay, setToggleDisplay] = useState(true)

    const filterProduce = produce.filter(food => {
        if (filterFood === "") return true

        return food.kind === filterFood
    })
    
    const search = filterProduce.filter(food => {
        return food.produce.toUpperCase().includes(searchFood.toUpperCase())
    })

    function toggleBtn() {
        setToggleDisplay(!toggleDisplay)
    }

    function handleAddtoCart(item) {
        setCart([...cart, item])
    }

    const [yAxis, setyAxis] = useState(0)
    const addToAxis = 0
    
    // console.log(yAxis)
    
    function animateAddCart() {
        setyAxis((yAxis + addToAxis))
    }

    return(
        <div className='produce'>
            <div className='produce-container'>
                <div className="search-container">
                    <Search 
                        setSearchFood={setSearchFood} 
                        toggleBtn={toggleBtn}
                        filterFood={filterFood} 
                        setFilterFood={setFilterFood}
                    />
                </div>
                <div className="shopper-container">

                {toggleDisplay ?
                <div className='produce-items'>
                    {search.map(item =>
                    <ProduceCard
                        item={item} 
                        key={item.id} 
                        cart={cart} 
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                        animateAddCart={animateAddCart}
                        />
                    )}
                 </div>
                 : 
                 <div className='produce-column'>
                    {search.map(item => 
                    <ProduceList 
                        item={item} 
                        key={item.id} 
                        cart={cart}
                        handleAddtoCart={handleAddtoCart}
                        handleUpdateCart={handleUpdateCart}
                    />)}
                </div>
                }
                <div className='cart-container'>
                <Cart 
                    sum={sum}
                    cart={cart}
                    onHandleDelete={onHandleDelete}
                    yAxis={yAxis}
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Produce;

## Checkoutpage.js

import React, { useState, useEffect } from 'react';
import AccountInfo from './AccountInfo';
import Checkout from './Checkout';
import Confirm from './Confirm';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const initialStateValue = [{
    name: "",
    areacode: "",
    threedigits: "",
    fourdigits: "",
    fstdigits: "",
    snddigits: "",
    thddigits: "",
    fthdigits: "",
    expmon: "",
    expyr: "",
    code: ""
}]

function CheckoutPage( {
    sum,
    cart,
    setCart,
    produce,
    handleUpdateCart,
    handleUpdateInventory,
    onHandleDelete,
    error,
    setError,
    errorDisplay,
    toggleError,
    setErrorDisplay
}

) {

const [formData, setFormData] = useState(initialStateValue)

const [account, setAccount] = useState([])
   //MOVE THIS TO ACCOUNTINFO: ACCOUNT IS ONLY BEING PASSED INTO
    //gets accounts
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/order`)
        .then(res => res.json())
        .then(res => setAccount(res))
    }, [])
    
    console.log(account)
    
    function handleAddAccount(newAccount) {
        setAccount([...account, newAccount])
    }

    //This does not pass both items in cart
    function handleUpdateProduce(food) {
        console.log(food)
    }

return (
    <div className="checkout-page">
    <BrowserRouter>
        <Switch>
            <Route path="/checkout">
                <Checkout       
                    sum={sum}
                    cart={cart} 
                    produce={produce}
                    handleUpdateCart={handleUpdateCart}
                    onHandleDelete={onHandleDelete}
                />
            </Route>
            <Route path="/account-information">
                <AccountInfo 
                    formData={formData} 
                    setFormData={setFormData}
                    account={account}
                    handleAddAccount={handleAddAccount}
                    error={error}
                    setError={setError}
                    errorDisplay={errorDisplay}
                    setErrorDisplay={setErrorDisplay}
                    toggleError={toggleError}
                    />
            </Route>
            <Route path="/confirm">
                <Confirm
                    cart={cart} 
                    setCart={setCart}
                    sum={sum}
                    formData={formData} 
                    account={account}
                    handleUpdateInventory={handleUpdateInventory}
                    handleUpdateProduce={handleUpdateProduce}
                    />
            </Route>
        </Switch>
    </BrowserRouter>
    </div>
    )
}

export default CheckoutPage;