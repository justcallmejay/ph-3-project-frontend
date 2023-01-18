import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Produce from './Produce';
import Navbar from './Navbar';
import Checkout from './Checkout'

function Shop() {

    const [produce, setProduce] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/produce`)
        .then(res => res.json())
        .then(res => setProduce(res))
    }, [])

    console.log(produce)

    return(
        <div className='shop'>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route path="/shop">
                        <Produce produce={produce}/>
                    </Route>
                    <Route path="/checkout">
                        <Checkout />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Shop;