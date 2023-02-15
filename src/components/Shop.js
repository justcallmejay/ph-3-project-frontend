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
    const [cart, setCart] = useState([])
    const [produce, setProduce] = useState([])

    
    //gets all ordered and non-ordered items
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`)
        .then(res => res.json())
        .then(res => setOrders(res))
    }, [cart])
    
    console.log('render 1')
    //gets accounts
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/order`)
        .then(res => res.json())
        .then(res => setAccount(res))
    }, [])
    
    function handleAddAccount(newAccount) {
        setAccount([...account, newAccount])
    }
    
    //gets produce
    useEffect(() => {
        // if (filterFood !== '') {
            //     fetch(`${process.env.REACT_APP_API_URL}/produce/${filterFood}`)
            //     .then(res => res.json())
            //     .then(res => setProduce(res))
            // } else {
                fetch(`${process.env.REACT_APP_API_URL}/produce`)
                .then(res => res.json())
                .then(res => setProduce(res))
                // }
            }, [])

            
    useEffect(() => {
    const addToCart = orders.map(inCart => {
    if (inCart.order_id === null) {
        return inCart
        } 
    })
        setCart(addToCart)
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
        const updateOrder = orders.map(item => {
            if (item.id === food.id) {
                return food
            } else {
                return item
            }
        })
        setCart(updateOrder)
    }

    //This does not pass both items in cart
    function handleUpdateProduce(food) {
        console.log(food)
        // const updateProduce = produce.map(item => {
        //     if (item.id === food.id) {
        //         return food
        //     } else {
        //         return item
        //     }
        // })
        // const newArrObj = produce.concat(updateProduce)
        // setProduce(newArrObj)
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

    const discountArray = cart.map(item => {
        if (item.order_id === null) {
            // console.log(item)
            return (item.produce.discount_price * item.dsc_quantity)
        } 
        else {
            return 0
        }
    })

    const discountTotal = discountArray.reduce((a, b) => a + b, 0)

    const sum = discountTotal + cost
    
    // const localeString = date.toLocaleDateString();
    // console.log(localeString)
    // console.log(timeElapsed)

    console.log(produce)
    console.log(orders)
    console.log('render 2')

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
                            setOrders={setOrders}
                            orders={orders}
                        />
                    </Route>
                    <Route path='/my-account'>
                        <MyAccount
                            orders={orders} 
                            cart={cart}
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
                            account={account}
                            handleAddAccount={handleAddAccount}
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
                            orders={orders}
                            setOrders={setOrders}
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
