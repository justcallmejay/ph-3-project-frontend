import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { item, userCart, handleAddtoCart, handleUpdateCart, animateAddCart } ) {

    const [check, setCheck] = useState(false)
    const [quantityCount, setQuantityCount] = useState(0)
    const [quantityDiscountCount, setQuantityDiscountCount] = useState(0)
    // console.log(quantityDiscountCount)
    // console.log(check)

    // const find = userCart.map(cart => {
    //     return cart.produce.produce
    // })
    // console.log(find)
    
    function addToCart(food) {
        const existingItem = userCart.map(cart => {return cart.produce_id})
        const currentItem = (inventory) => inventory === food.id
        let dscQuantity = ""
        let dscTotal = ""
        
        if (existingItem.some(currentItem) === true) {  
            userCart.map(cart => {
                if (cart.produce.produce === item.produce) {
                    if (check === true) {
                        console.log('check')
                        dscQuantity = quantityDiscountCount;
                        dscTotal = cart.produce.price * parseInt(quantityDiscountCount, 10)
                    } else {
                        console.log('unchecked')
                        dscQuantity = cart.dsc_quantity
                        dscTotal = cart.produce.price * parseInt(cart.dsc_quantity, 10)
                    }
                const updataQuantity = (cart.quantity + parseInt(quantityCount, 10))
                console.log(updataQuantity)
                const updateTotal = cart.produce.price * updataQuantity
                fetch(`${process.env.REACT_APP_API_URL}/cart/${cart.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        quantity: updataQuantity,
                        total: updateTotal,
                        dsc_quantity: dscQuantity,
                        dsc_total: dscTotal
                    })
                })
                .then(res => res.json())
                .then(addFood => handleUpdateCart(addFood));
                setQuantityCount(0)
                }
            })

            } else {
                if (check === true ) {
                    dscQuantity = quantityDiscountCount;
                    dscTotal = (item.price * parseInt(quantityDiscountCount, 10))
                } else {
                    dscQuantity = 0
                    dscTotal = 0
                }
                console.log(food.id)
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
            }
        }
    
    // function addDscToCart() {
    //     let nu
    // }

    return(
        <div className='card'>
            <img src={item.image} alt={item.produce}/>
            <h3>{item.produce}</h3>
            {item.quantity > 0 ? 
            <>
            <a>Price: {item.price}</a>
            <div>Quantity: {item.quantity}</div>
             </>
            : <h4>Sold Out</h4>
            }
            {item.discount > 0 ? 
            <>
            <div>Discount Price: {item.discount_price}</div>
            <div>Discount Quantity: {item.discount_quantity}</div>
            <div className='discount-container'>
            <h4>Buy Discount</h4>
            <input type='checkbox' onChange={() => setCheck(!check)}/>
            {check ? <>
            <input 
                type="number" 
                value={quantityDiscountCount}
                keypress="false"
                min="0"
                max={item.discount_quantity}
                maxLength="2"
                onChange={(e) => setQuantityDiscountCount(e.target.value)}
                />
                </> : "" }
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