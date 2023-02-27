import React, { useState } from 'react';
import '../css/Cart.css'

function CartList( { yAxis, carts, onHandleDelete } ) {

    const [hover, setHover] = useState(false)
    const itemTotal = (carts.produce.price * carts.quantity)
    const discountTotal = (carts.produce.discount_price * carts.dsc_quantity)

    // console.log(carts.produce.discount_price)
    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    function handleDelete(item) {
        fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(item => onHandleDelete(item))
    }

    return(
        <div className='cart-list-container' 
        // style={{ transform: `translateY(${yAxis}px)`}}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        >
                <img className='cart-image' 
                    src={carts.produce.image} 
                    alt={carts.produce.produce} 
                />
            <div className='cart-data'>
                <h6>{carts.produce.produce}</h6>
                <p>Price: {carts.produce.price}</p>
                <p>Qty: {carts.quantity}</p>
                <p>Total: {itemTotal.toFixed(2)}</p>
                <p>Disc. Qty: {carts.dsc_quantity}</p>
                <p>Disc. Total:{discountTotal.toFixed(2)}</p>
            </div>
                <div className="delete-btn-container">
                    {hover ? 
                    <>
                    <button className='cart-delete-btn' onClick={() => handleDelete(carts)}>Delete</button>
                    </>
                    : ""}
                </div>
        </div>
    )
}

export default CartList;