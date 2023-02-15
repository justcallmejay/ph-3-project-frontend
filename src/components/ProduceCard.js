import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { item, handleAddtoCart, handleUpdateCart, animateAddCart, cart } ) {

    const [check, setCheck] = useState(false)
    const [quantityCount, setQuantityCount] = useState(0)
    const [quantityDiscountCount, setQuantityDiscountCount] = useState(0)

    function addToCart(food) {
        let dscQuantity = ""
        let dscTotal = ""     

        if (food.quantity === null || food.discount_quantity === null) {
            alert('there is no more in stock') 
        } else {
            if (quantityCount !== 0 || quantityDiscountCount !== 0) {
                const existingItem = cart.map(carts => {return carts.produce_id})
                const currentItem = (card) => card === food.id
            if (existingItem.some(currentItem) === true) {
                const qtyNum = cart.find(item => item.produce_id === food.id)
                    if (qtyNum.quantity + parseInt(quantityCount) > item.quantity || qtyNum.dsc_quantity + parseInt(quantityDiscountCount) > item.discount_quantity) {
                         alert('Not enough in stock');
                         setQuantityCount(0);
                         setQuantityDiscountCount(0);
                     } else { 
                        if (check === true) {
                            dscQuantity = parseInt(quantityDiscountCount) + qtyNum.dsc_quantity;
                            dscTotal = qtyNum.produce.discount_price * parseInt(quantityDiscountCount, 10)
                        }
                        const updateQuantity = (qtyNum.quantity + parseInt(quantityCount, 10))
                        const updateTotal = qtyNum.produce.price * updateQuantity
                        fetch(`${process.env.REACT_APP_API_URL}/cart/${qtyNum.id}`, {
                            method: "PATCH",
                            headers: {"Content-Type" : "application/json"},
                            body: JSON.stringify({
                                quantity: updateQuantity,
                                total: updateTotal,
                                dsc_quantity: dscQuantity,
                                dsc_total: dscTotal
                            })
                        })
                .then(res => res.json())
                .then(addFood => handleUpdateCart(addFood));
                setQuantityCount(0)
                setQuantityDiscountCount(0)
                }
            } else {
                if (check === true ) {
                    dscQuantity = quantityDiscountCount;
                    dscTotal = (item.price * parseInt(quantityDiscountCount, 10))
                } else {
                    dscQuantity = 0
                    dscTotal = 0
                }
                const itemTotal = (food.price * quantityCount).toFixed(2)
                fetch(`${process.env.REACT_APP_API_URL}/carts`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    produce_id: food.id,
                    order_id: "",
                    quantity: quantityCount,
                    total: itemTotal,
                    dsc_quantity: dscQuantity,
                    dsc_total: dscTotal
                })
            })
            .then(res => res.json())
            .then(addFood => handleAddtoCart(addFood));
            setQuantityCount(0)
            setQuantityDiscountCount(0)
                }
            }
        else 
            alert('select the amount')
            }
        }

    return(
        <div className='card'>
            <img src={item.image} alt={item.produce}/>
            <h3>{item.produce}</h3>
            {item.quantity > 0 ? 
            <>
            <a>Price: {item.price}</a>
            {/* <div>Quantity: {item.quantity}</div> */}
             </>
            : <h4>Sold Out</h4>
            }
            {item.discount > 0 ? 
            <>
            <div>Discount Price: {item.discount_price}</div>
            {/* <div>Discount Quantity: {item.discount_quantity}</div> */}
            <div className='discount-container'>
                <div className='discount-label-card'>
                    <h4>Buy Discount</h4>
                </div>
                <div className='discount-checkbox-card'>
                    <input className='produce-card-checkbox' type='checkbox' onChange={() => setCheck(!check)}/>
                        {check ? <>
                            <input
                                className="quantity-num-card" type="number" 
                                keypress="false" max={item.discount_quantity} min="0" maxLength="2"
                                value={quantityDiscountCount} onChange={(e) => setQuantityDiscountCount(e.target.value)}
                            /> </> : "" }
                    </div>
                </div>
            </>
            : <h4>Sold Out</h4>}
            <div className='order-card'>

            <input 
                value={quantityCount} 
                className="quantity-num-card" 
                keypress="false"
                type="number"
                min="0"
                maxLength="3"
                max={item.quantity}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            {/* <input type="checkbox"/>Order Discounted Produce */}
            <button className="add-cart-btn" onClick={() => {addToCart(item); animateAddCart()}}>Add to Cart</button>
            </div>
        </div>
    ) 
}

export default ProduceCard;