import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/Confirm.css'

function Confirm( { formData, sum, handleUpdateInventory, cart, setCart, handleUpdateProduce } ) {


    console.log(cart)

    const [transactionComplete, setTransactionComplete] = useState(true)
    const ccInfo = [formData.fstdigits, formData.snddigits, formData.thddigits]
    const ccNumber = [formData.fstdigits, formData.snddigits, formData.thddigits, formData.fthdigits].join('')
    
    const date = new Date().toDateString();

    const maskCreditCard = ccInfo.map(card => {
        return card.replace(/[0-9]/g, "*").match(/.{1,4}/g).join("");
});

    function toggleTransaction(){
        setTransactionComplete(action => !action)
    }

    function addIdToCart() {
        fetch(`${process.env.REACT_APP_API_URL}/order/find=${ccNumber}`)
        .then(res => res.json())
        .then(account => {
        cart.forEach(acc => {
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
})
}


    return(
        <div className='confirm'>
            {transactionComplete ? 
            <div className='confirm-container'>
                <div className="info-label">
                    <h2>Information</h2>
                </div>
                <div className='confirm-info'>
                    <h3>Name: {formData.name}</h3>
                    <h3>Phone: ({formData.areacode}) {formData.threedigits}-{formData.fourdigits}</h3>
                    <h3>Card Info: {maskCreditCard[0]} {maskCreditCard[1]} {maskCreditCard[2]} {formData.fthdigits}</h3>
                    <h3>Expires: {formData.expmon} / {formData.expyr}</h3>
                </div>
                <div className='receipt-container'>
                    <h3>Receipt:</h3>
                    {cart.map(item => 
                    <>
                    <div className='receipt' key={item.id}>
                        <p>{item.produce.produce}</p>
                        <p>Amt: {item.quantity}</p>
                        <p>Price: {item.produce.price}</p>
                        <p>Total: {item.total.toFixed(2)}</p>
                    </div>
                    {item.dsc_quantity > 0 ? 
                <div className='discount-receipt'>
                        <p>Amt: {item.dsc_quantity}</p>
                        <p>Price: {item.produce.discount_price}</p>
                        <p>Total: {item.dsc_total.toFixed(2)}</p>
                </div>
                 : ""}
                    </>
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
