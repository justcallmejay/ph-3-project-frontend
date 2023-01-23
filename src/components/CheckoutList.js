import React, { useState } from 'react'; 

function CheckoutList( { item } ) {

    const [hover, setHover] = useState(false)

    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    return(
        <div className="checkout-list" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='checkout-main-info'>
                <h3>{item.produce}</h3>
                <img className="checkout-img" src={item.image} alt={item.name}/>
            </div>
            <div className="produce-info">
                <a>Quantity: {item.quantity}</a>
                <a>Price: {item.price}</a>
                <a>Total: {item.quantity} * {item.price}</a>
            </div>
            <div className='produce-total'>
                <a></a>
                </div>
            {hover ? 
                <button className='checkout-delete'>Delete</button> : ""}
            </div>
    )
}

export default CheckoutList;