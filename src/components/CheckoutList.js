import React, { useState } from 'react';
import '../css/Cart.css'

function CheckoutList( { cart, onHandleDelete, handleUpdateCart } ) {

    const [hover, setHover] = useState(false)

    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    const itemTotal = (cart.produce.price * cart.quantity)
    const discountTotal = (cart.produce.discount_price * cart.dsc_quantity)

    let sumItem = itemTotal + discountTotal

    //Edit inventory quantity
    const [submitEdit, setSubmitEdit] = useState(null)
    const [produceQuantity, setProduceQuantity] = useState(cart.quantity)
    const [dscQuantity, setDscQuantity] = useState(cart.dsc_quantity)

    console.log(cart.total)
    console.log(cart.dsc_total)
    
    function handleEdit(food) {
        setSubmitEdit(null)
        fetch(`${process.env.REACT_APP_API_URL}/cart/${food.id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                quantity: produceQuantity,
                dsc_quantity: dscQuantity
            })
        })
        .then(res => res.json())
        .then(res => handleUpdateCart(res))
        setSubmitEdit(null);
}

    function handleDelete(item) {
        console.log(item.id)
        fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(item => onHandleDelete(item))
    }

    return(
        <div className="checkout-list" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            // style={{ backgroundColor: cart.id % 2 == 0 ? "red" : "yellow" }}
            >
            <div className='checkout-main-info'>
                <img className="checkout-img" src={cart.produce.image} alt={cart.produce.name}/>
                <h3>{cart.produce.produce}</h3>
            </div>
            <div className="produce-info">
                <div className="co-produce-section">
                    <div className="co-produce-amt">
                    <a>Price: {cart.produce.price}</a>
                        <p>Quantity:</p>
                        {submitEdit === cart.id ?
                        <>
                            <input className="co-edit-num" type="number" min="0" max={cart.produce.quantity}
                            value={produceQuantity} onChange={(e) => setProduceQuantity(e.target.value)}
                            />
                            <button onClick={() => handleEdit(cart)}>OK</button>
                        </> 
                            :    
                            <p>{cart.quantity}</p>}
                    </div>
                    <div className='co-produce-total'>
                        <div>Total: {itemTotal.toFixed(2)}</div>
                    </div>
                </div>
                <div className="co-produce-discount-section">
                    <div className='co-produce-discount-amt'>
                    <a>Price: {cart.produce.discount_price}</a>
                        <p>Disc. Qty:</p>
                        {submitEdit === cart.id ?
                        <>
                            <input className="co-edit-num" type="number" min="0" max={cart.produce.discount_quantity}
                            value={dscQuantity} onChange={(e) => setDscQuantity(e.target.value)}
                            />
                            <button onClick={() => handleEdit(cart)}>OK</button>
                        </> 
                            :    
                            <div>{cart.dsc_quantity}</div>}
                    </div>
                    <div className='co-produce-discount-total'>
                        <a>Disc. Total: {discountTotal.toFixed(2)}</a>
                    </div>
                </div>
                <div className='produce-total'>
                    <div>Total: {sumItem.toFixed(2)}</div>
                </div>
            </div>
            {hover ? 
            <div className='hover-btn'>
                <button className='checkout-edit' onClick={() => setSubmitEdit(cart.id)}>Edit</button>
                <button className='checkout-delete' onClick={() => handleDelete(cart)}>Delete</button> 
            </div>
               : "" }
        </div>
    )
}

export default CheckoutList;