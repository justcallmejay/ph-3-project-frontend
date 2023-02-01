import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
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
    
    const [userCart, setUserCart] = useState([])
    const [account, setAccount] = useState([])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`)
        .then(res => res.json())
        .then(cart => setUserCart(cart))
    }, [])

    console.log(userCart)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/order`)
        .then(res => res.json())
        .then(res => setAccount(res))
    }, [])

    console.log(account)
    
    const [produce, setProduce] = useState([])
    
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

    function onHandleDelete(item) {
        const deleteItem = userCart.filter(cart => cart.id !== item.id)
        setUserCart(deleteItem)
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
                            onHandleDelete={onHandleDelete}
                        />
                    </Route>
                    <Route path='/my-account'>
                        <MyAccount 
                            userCart={userCart}
                            />
                    </Route>
                    <Route path="/checkout">
                        <Checkout 
                            userCart={userCart} 
                            produce={produce}
                            onHandleChange={onHandleChange}
                            onHandleDelete={onHandleDelete}
                        />
                    </Route>
                    <Route path="/account-information">
                        <AccountInfo 
                            formData={formData} 
                            setFormData={setFormData}
                            account={account}
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