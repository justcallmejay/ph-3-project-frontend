import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { item, handleAddtoCart, handleUpdateCart, animateAddCart, inventory } ) {

    const [check, setCheck] = useState(false)
    const [quantityCount, setQuantityCount] = useState(0)
    const [quantityDiscountCount, setQuantityDiscountCount] = useState(0)
    // console.log(quantityDiscountCount)
    // console.log(check)

    // const find = userCart.map(cart => {
    //     return cart.produce.produce
    // })
    // console.log(find)

    console.log(item)
    console.log(inventory)
    
    function addToCart(food) {
        if (quantityCount !== 0 || quantityDiscountCount !== 0) {
        //.some is used to ensure that if the usercart array does contain item it will run PATCH; 
        //using map will trigger else statement because it will iterate everything in cart
        //SOLUTION: replace userCart with inventory
        const existingItem = inventory.map(cart => {return cart.produce_id})
        const currentItem = (card) => card === food.id
        let dscQuantity = ""
        let dscTotal = ""
        
        if (existingItem.some(currentItem) === true) {
            inventory.map(cart => {
                if (cart.produce.produce === item.produce) {
                        console.log('match')
                    if (check === true) {
                        console.log('check')
                        dscQuantity = parseInt(quantityDiscountCount) + cart.dsc_quantity;
                        dscTotal = cart.produce.discount_price * parseInt(quantityDiscountCount, 10)
                    } else {
                        console.log('unchecked')
                        dscQuantity = cart.dsc_quantity
                        dscTotal = cart.produce.discount_price * parseInt(cart.dsc_quantity, 10)
                    }
                const updateQuantity = (cart.quantity + parseInt(quantityCount, 10))
                // console.log(updataQuantity)
                const updateTotal = cart.produce.price * updateQuantity
                fetch(`${process.env.REACT_APP_API_URL}/cart/${cart.id}`, {
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
            setQuantityDiscountCount(0)
            }
        }
        else 
        alert('select the amount')
    }

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