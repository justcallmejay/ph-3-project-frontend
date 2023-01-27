import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AccountInfo from './AccountInfo';
import Checkout from './Checkout';
import Confirm from './Confirm';
import MyAccount from './MyAccount';
import Navbar from './Navbar';
import Produce from './Produce';
import '../index.css'

// const initialStateForm = {
//     name : "",
//     areacode: "",
//     threedigits: "",
//     fourdigits: "",
//     fstdigits: "",
//     snddigits: "",
//     thddigits: "",
//     fthdigits: "",
//     expmon: "",
//     expyr: "",
//     code: ""
// }

function Shop() {

    const [formData, setFormData] = useState([])
    const [filterFood, setFilterFood] = useState('')
    
    const [userCart, setUserCart] = useState([])
    const [userPurchase, setUserPurchase] = useState([])
    
    useEffect(() => {
        // userCart.map(cart => {
        // if (cart.purchase === false) {
        fetch(`${process.env.REACT_APP_API_URL}/cart`)
        .then(res => res.json())
        .then(res => setUserCart(res))
        // } else
        // fetch(`${process.env.REACT_APP_API_URL}/purchase`)
        // .then(res => res.json())
        // .then(res => setUserPurchase(res))
    // })
    }, [])

    console.log(userPurchase)
    
    
    const [produce, setProduce] = useState([])
    console.log(produce)
    console.log(userCart)
    
    useEffect(() => {
        if (filterFood !== '') {
        fetch(`${process.env.REACT_APP_API_URL}/produce/*`)
        .then(res => res.json())
        .then(res => setProduce(res))
        } else {
        fetch(`${process.env.REACT_APP_API_URL}/produce`)
        .then(res => res.json())
        .then(res => setProduce(res))
        }
    }, [])

    function onHandleChange(item) {
        const reviseInventory = produce.map(food => {
            if (food.id === item.id) {
                return item
            } else {
                return food
            }
        })
        setProduce(reviseInventory)
    }

    return(
        <div className='shop'>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route path="/shop">
                        <Produce 
                            produce={produce}
                            setProduce={setProduce}
                            userCart={userCart} 
                            setUserCart={setUserCart}
                            onHandleChange={onHandleChange}
                            filterFood={filterFood}
                            setFilterFood={setFilterFood}
                        />
                    </Route>
                    <Route path='/my-account'>
                        <MyAccount 
                            userCart={userCart}
                            userPurchase={userPurchase}
                            />
                    </Route>
                    <Route path="/checkout">
                        <Checkout 
                            userCart={userCart} 
                            produce={produce}
                            onHandleChange={onHandleChange}
                        />
                    </Route>
                    <Route path="/account-information">
                        <AccountInfo 
                            formData={formData} 
                            setFormData={setFormData} 
                            // initialStateForm={initialStateForm}
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