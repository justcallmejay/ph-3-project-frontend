import React, { useState } from 'react';
import '../css/ProduceList.css'

function ProduceList( { sear, userCart, handleAddtoCart, onHandleChange } ) {

    const [quantityCount, setQuantityCount] = useState(0)

    function addToCart(item) {
        if (userCart.includes(item)) {
            console.log('already in cart')
        } else
            // !food.produce.includes(item.produce) && 
            // quantityCount !== 0 
            // && item.quantity >= quantityCount
            // ) {
            console.log(quantityCount)
            console.log(item.price)
            const sumPurchase = item.price * quantityCount
            const updateQuantity = item.quantity - quantityCount
            console.log(sumPurchase)
            fetch(`${process.env.REACT_APP_API_URL}/cart`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    produce : item.produce,
                    image: item.image, 
                    quantity: quantityCount,
                    price: item.price,
                    total: sumPurchase,
                    purchase: false
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
    }
    // else {
    //     console.log(food.id)
    //     fetch(`${process.env.REACT_APP_API_URL}/cart/${food.id}`, {
    //         method: "PATCH",
    //         headers: {"Content-Type" : "application/json"},
    //         body: JSON.stringify({
    //             quantity: item.quantity + quantityCount
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(res => onHandleChange(res))
    // }
// })
// }


    return(
        <div className='list'>
            <img className="wrapper" src={sear.image} alt={sear.produce}/>
            <div>{sear.produce}</div>
            {sear.quantity > 0 ? 
            <>
            <div>Price: {sear.price}</div>
            <div>Quantity: {sear.quantity}</div> 
            </>
            :
            <h4>Sold Out</h4>}
            {sear.discount > 0 ? 
            <>
            <div>Discount: {sear.discount_price}</div>
            <div>Discount Quantity: {sear.discount_quantity}</div> 
            </>
            : ""
            }
            <input 
                className="quantity-num-list" 
                type="number" 
                min="0"
                max={sear.quantity}
                keypress="false" 
                value={quantityCount}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            <button className="add-cart-btn-list" onClick={() => addToCart(sear)}>Add to Cart</button>
        </div>
    )
}

export default ProduceList;