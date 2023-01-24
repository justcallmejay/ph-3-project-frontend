import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { sear, userCart, handleAddtoCart, onHandleChange } ) {

    const [quantityCount, setQuantityCount] = useState(0)

    function addToCart(item) {
        // console.log(quantityCount)
        // console.log(item.price)
        if (!userCart.includes(item) && quantityCount !== 0 && item.quantity >= quantityCount) {
            const sumPurchase = item.price * quantityCount
            const updateQuantity = item.quantity - quantityCount
            fetch(`${process.env.REACT_APP_API_URL}/cart`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    produce : item.produce,
                    image: item.image, 
                    quantity: quantityCount,
                    price: item.price,
                    total: sumPurchase
                })
        })
            .then(res => res.json())
            .then(res => handleAddtoCart(res));
            setQuantityCount(0);
            fetch(`${process.env.REACT_APP_API_URL}/produce/${item.id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    quantity: updateQuantity
                })
            })
                .then(res => res.json())
                .then(res => onHandleChange(res))
    } else if (userCart.includes(item)) {
        alert('hi')
    } else if (quantityCount <= 0) {
        alert('There is nothing in the cart')
    } else if (quantityCount > item.quantity) {
        alert("Bro we're poor")
    }
    }

    return(
        <div className='card'>
            <img src={sear.image} alt={sear.produce}/>
            <h3>{sear.produce}</h3>
            <a>Price: {sear.price}</a>
            <div>Quantity: {sear.quantity}</div>
            {sear.expiring_soon ? 
            <>
            <div>Discount Price: {sear.expiring_price}</div>
            <div>Discount Quantity: {sear.expiring_quantity}</div>
            </>
            : ""}
            <div className='order-card'>

            <input 
                value={quantityCount} 
                className="quantity-num-card" 
                keypress="false"
                type="number"
                min="0"
                placeholder="" 
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            <button className="add-cart-btn" onClick={() => addToCart(sear)}>Add to Cart</button>
            </div>
        </div>
    ) 
}

export default ProduceCard;