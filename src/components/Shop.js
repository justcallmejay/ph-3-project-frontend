import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Produce from './Produce';
import Navbar from './Navbar';
import Checkout from './Checkout';
import AccountInfo from './AccountInfo';
import Confirm from './Confirm';

const initialStateForm = {
    name : "",
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
}

function Shop() {

    const [formData, setFormData] = useState(initialStateForm)
    const [userCart, setUserCart] = useState([])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`)
        .then(res => res.json())
        .then(res => setUserCart(res))
    }, [])

    console.log(userCart)

    return(
        <div className='shop'>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route path="/shop">
                        <Produce 
                            userCart={userCart} 
                            setUserCart={setUserCart}
                        />
                    </Route>
                    <Route path="/checkout">
                        <Checkout userCart={userCart}/>
                    </Route>
                    <Route path="/account-information">
                        <AccountInfo 
                            formData={formData} 
                            setFormData={setFormData} 
                            initialStateForm={initialStateForm}
                            />
                    </Route>
                    <Route path="/confirm">
                        <Confirm formData={formData} userCart={userCart}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Shop;