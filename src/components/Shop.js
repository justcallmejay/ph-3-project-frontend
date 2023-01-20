import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Produce from './Produce';
import Navbar from './Navbar';
import Checkout from './Checkout'
import AccountInfo from './AccountInfo';

function Shop() {

    const [produce, setProduce] = useState([])
    const [userCart, setUserCart] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/produce`)
        .then(res => res.json())
        .then(res => setProduce(res))
    }, [])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`)
        .then(res => res.json())
        .then(res => setUserCart(res))
    }, [])

    console.log(produce)
    console.log(userCart)

    return(
        <div className='shop'>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route path="/shop">
                        <Produce produce={produce} userCart={userCart} setUserCart={setUserCart}/>
                    </Route>
                    <Route path="/checkout">
                        <Checkout userCart={userCart}/>
                    </Route>
                    <Route path="/account-information">
                        <AccountInfo />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Shop;