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
    const [inventory, setInventory] = useState([])
    const [produce, setProduce] = useState([])
    
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/purchase`)
        .then(res => res.json())
        .then(res => setInventory(res))
    }, [])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`)
        .then(res => res.json())
        .then(cart => setUserCart(cart))
    }, [])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/order`)
        .then(res => res.json())
        .then(res => setAccount(res))
    }, [])
    
    function handleAddAccount(newAccount) {
        setAccount([...account, newAccount])
    }
    
    console.log(userCart)
    console.log(inventory)
    console.log(account)
    console.log(produce)
    // console.log(account)
    
    
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
        const deleteItem = inventory.filter(cart => cart.id !== item.id)
        setInventory(deleteItem)
    }
    
    // function handleUpdateCart(item) {
    //     const updateCart = inventory.map(food => {
    //         if (food.id === item.id) {
    //             return item
    //         } else {
    //             return food
    //         }
    //     })
    //     setUserCart(updateCart)
    // }

    //this does not work at confirm page; returns no match for all
    //edit: change userCart.map to
    function handleUpdateUserCart(item) {
        setUserCart([...userCart, item])
    }

    function handleUpdateProduce(food) {
        const updateProduce = produce.map(item => {
            if (item.id === food.id) {
                return food
            } else {
                return item
            }
        })
        setProduce(updateProduce)
    }
    
    //PREVENT DRY
    const sumItem = inventory.map(item => {
        if (item.order_id === null) {
        return (item.produce.price * item.quantity)
        } else {
            return 0
        }
    })

    const cost = sumItem.reduce((a, b) => a + b, 0)

    const discountArray = inventory.map(item => {
        if (item.order_id === null) {
            console.log(item)
            return (item.produce.discount_price * item.dsc_quantity)
        } 
        else {
            return 0
        }
    })

    const discountTotal = discountArray.reduce((a, b) => a + b, 0)

    const sum = discountTotal + cost
    
    // const timeElapsed = Date.now();
    // const date = new Date(timeElapsed);
    // const localeString = date.toLocaleDateString();
    // console.log(date)
    // console.log(localeString)
    // console.log(timeElapsed)


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
                            inventory={inventory}
                            setInventory={setInventory}
                            // userCart={userCart} 
                            // setUserCart={setUserCart}
                            onHandleChange={onHandleChange}
                            filterFood={filterFood}
                            setFilterFood={setFilterFood}
                            onHandleDelete={onHandleDelete}
                        />
                    </Route>
                    <Route path='/my-account'>
                        <MyAccount
                            userCart={userCart} 
                            inventory={inventory}
                            />
                    </Route>
                    <Route path="/checkout">
                        <Checkout
                            sum={sum}
                            inventory={inventory} 
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
                            handleAddAccount={handleAddAccount}
                            />
                    </Route>
                    <Route path="/confirm">
                        <Confirm
                            setInventory={setInventory}
                            formData={formData} 
                            inventory={inventory} 
                            account={account}
                            sum={sum}
                            handleUpdateUserCart={handleUpdateUserCart}
                            />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Shop;
