import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/Confirm.css'

function Confirm( { formData, userCart, account, handleUpdateCart } ) {


    const [toggleDeleteDisplay, setToggleDeleteDisplay] = useState(false)
    const [hideNum, setHideNum] = useState('')
    const ccInfo = [formData.fstdigits, formData.snddigits, formData.thddigits]
    
    const maskCreditCard = ccInfo.map(card => {
        return card.replace(/[0-9]/g, "*").match(/.{1,4}/g).join("");
});

// console.log(account)

    // const orderID = account.filter(acc => {
    //     if (formData.name === acc.name) {
    //         return acc.id
    //     }
    // })
    // console.log(orderID)
    //   console.log(ccInfo)
    //   console.log(maskCreditCard[0])

    function addIdToCart() {
        account.filter(acc => {
            if (formData.name === acc.name)
            userCart.map(cart => {
                if(cart.order_id === null)
            fetch(`${process.env.REACT_APP_API_URL}/update/${cart.id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    order_id: acc.id
                })
            })
            .then(res => res.json())
            .then(add => handleUpdateCart(add))
        })
    })
    }


    function toggleAlert() {
        setToggleDeleteDisplay(!toggleDeleteDisplay)
    }

    function toggleBgAlert() {
        if (toggleDeleteDisplay === true) {
            setToggleDeleteDisplay(!toggleDeleteDisplay)
        }
    }

    function handleDeleteInfo() {
        fetch(`${process.env.REACT_APP_API_URL}/remove`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                name: "",
                phone: "",
                card: "",
                card_exp: "",
                code: ""
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    const arrayTotal = userCart.map(cart => cart.produce.total)
    const sumTotal = arrayTotal.reduce((a, b) => a + b, 0)

    return(
        <div className='confirm' onClick={toggleBgAlert}>
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
                    {userCart.map(item => 
                    <div className='receipt' key={item.id}>
                        <a>{item.produce.produce}</a>
                        <a>Amt: {item.quantity}</a>
                        <a>Price: {item.produce.price}</a>
                        <a>Total: {item.produce.total}</a>
                    </div>
                        )}
                </div>
                <div className='submit-sum'><h3>Total: {sumTotal.toFixed(2)}</h3></div>
                <div className='confirm-btns'>
                {/* <Link to="/account-information"> */}
                    <button className="acc-btn" id="onfirm-back"
                        onClick={toggleAlert}
                        >
                    Back</button>
                    {/* </Link> */}
                <Link to="/shop"><button className="acc-btn" id="onfirm-next" onClick={addIdToCart}>Submit</button></Link>
                </div>
            </div>
            {toggleDeleteDisplay ?
            <div className='delete-info-bg'>
                <div className="delete-info-container">
                    <div className='delete-info'>
                        <h3>Are you sure you want to go back?  This will erase submitted data from the last page.</h3>
                    </div>
                        <div className='delete-info-btn-container'>
                            <Link to="/account-information">
                            <button className="confirm-btn">Yes</button>
                            </Link>
                            <button className="confirm-btn"onClick={toggleAlert}>No</button> 
                        </div>
                </div>
            </div> : ""}
        </div>
        )
    }

export default Confirm;