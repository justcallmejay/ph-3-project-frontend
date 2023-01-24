import React, { useState } from 'react';
import '../css/ProduceList.css'

function ProduceList( { sear, userCart, handleAddtoCart, onHandleChange } ) {

    const [quantityCount, setQuantityCount] = useState(0)

    console.log(sear.quantity)

    function addToCart(item) {
        if (!userCart.includes(item) && quantityCount !== 0 && item.quantity >= quantityCount) {
            console.log(quantityCount)
            console.log(item.price)
            const sumPurchase = item.price * quantityCount
            const updateQuantity = item.quantity - quantityCount
            console.log(sumPurchase)
            fetch(`${process.env.REACT_APP_API_URL}/cart`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    id: item.id,
                    produce : item.produce,
                    image: item.image, 
                    quantity: quantityCount,
                    price: item.price,
                    total: sumPurchase
                })
        })
            .then(res => res.json())
            .then(res => handleAddtoCart(res))
            fetch(`${process.env.REACT_APP_API_URL}/produce/${item.id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    quantity: updateQuantity
                })
            })
                .then(res => res.json())
                .then(res => onHandleChange(res))
    } else if (quantityCount <= 0) {
        alert('There is nothing in the cart')
    } else if (quantityCount > item.quantity) {
        alert("Bro we're poor...")
    }
}


    return(
        <div className='list'>
            <img className="wrapper" src={sear.image} alt={sear.produce}/>
            <div>{sear.produce}</div>
            <div>Price: {sear.price}</div>
            <div>Quantity: {sear.quantity}</div>
            <div>Discount: {sear.expiring_price}</div>
            <div>Discount Quantity: {sear.expiring_quantity}</div>
            <input 
                className="quantity-num-list" 
                type="number" 
                min="0" 
                keypress="false" 
                placeholder=""
                value={quantityCount}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            <button className="add-cart-btn-list" onClick={() => addToCart(sear)}>Add to Cart</button>
        </div>
    )
}

export default ProduceList;