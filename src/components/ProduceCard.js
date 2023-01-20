import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { sear, userCart, handleAddtoCart })  {

    const [quantityCount, setQuantityCount] = useState(0)

    function addToCart(item) {
        if (!userCart.includes(item)) {
            fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    produce : item.produce,
                    quantity: 1,
                    price: item.price
                })
        })
            .then(res => res.json())
            .then(res => handleAddtoCart(res))
    }
        // } else 
        // {
        //     fetch(`${process.env.REACT_APP_API_URL}/produce/${item.id}`, {
        //         method: "PATCH",
        //         headers: {"Content-Type" : "application/json"},
        //         body: JSON.stringify({
        //             ...item,
        //             quantity: ++item.quantity
        //         })
        // })
        //     .then(res => res.json())
        //     .then(res => handleAddtoCart(res))
        // }
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

            <button onClick={() => addToCart(sear)}>Add to Cart</button>
            <input value={quantityCount} type="quantity" placeholder="" onChange={(e) => setQuantityCount(e.target.value)}/>
            </div>
        </div>
    )
}

export default ProduceCard;