import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AboutUs from './AboutUs';
import AccountInfo from './AccountInfo';
import Checkout from './Checkout';
import Confirm from './Confirm';
import MyAccount from './MyAccount';
import Navbar from './Navbar';
import Produce from './Produce';
import Footer from './Footer'
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
    const [searchFood, setSearchFood] = useState("")
    
    function handleAddAccount(newAccount) {
        setAccount([...account, newAccount])
    }

    console.log(cart)
    
    //using backend to handle filter
    useEffect(() => {
        if (filterFood !== "") {
            fetch(`${process.env.REACT_APP_API_URL}/produce/${filterFood}`)
            .then(res => res.json())
            .then(filterProduce => setProduce(filterProduce))
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/produce`)
            .then(res => res.json())
            .then(res => setProduce(res))
        }}, [filterFood])

    useEffect(() => {
            fetch(`${process.env.REACT_APP_API_URL}/name/${searchFood}`)
            .then(res => res.json())
            .then(food => setProduce(food))
    }, [searchFood])    

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
        const updateProduceStock = produce.map(pro => {
            if (pro.id === food.id) {
                return food
            } else {
                return pro
            }
        })
        setProduce(updateProduceStock)
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
            return (item.produce.discount_price * item.dsc_quantity)
        } 
        else {
            return 0
        }
    })

    const discountTotal = dscItem.reduce((a, b) => a + b, 0)

    const sum = discountTotal + cost

    console.log(produce)

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
                            searchFood={searchFood}
                            setSearchFood={setSearchFood}
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
                            setCart={setCart}
                            formData={formData} 
                            cart={cart} 
                            account={account}
                            sum={sum}
                            handleUpdateInventory={handleUpdateInventory}
                            handleUpdateProduce={handleUpdateProduce}
                            produce={produce}
                            setProduce={setProduce}
                            />
                    </Route>
                    <Route path='/about'>
                        <AboutUs/>
                    </Route>
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Shop;