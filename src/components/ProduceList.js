import React, { useState } from 'react';
import '../css/ProduceList.css'

function ProduceList( { item, inventory, handleAddtoCart, onHandleChange, handleUpdateCart } ) {

    const [quantityCount, setQuantityCount] = useState(0)
    const [check, setCheck] = useState(false)
    const [quantityDiscountCount, setQuantityDiscountCount] = useState(0)

    function addToCart(food) {
        if (quantityCount !== 0 || quantityDiscountCount !== 0) {
                //.some is used to ensure that if the usercart array does contain item it will run PATCH; 
        //using map will trigger else statement because it will iterate everything in cart
        //SOLUTION: replace userCart with inventory
        const existingItem = inventory.map(cart => {return cart.produce_id})
        const currentItem = (inventory) => inventory === food.id
        let dscQuantity = ""
        let dscTotal = ""
        
        if (existingItem.some(currentItem) === true) {
            inventory.map(cart => {
                if (cart.produce.produce === item.produce) {
                    if (check === true) {
                        console.log('check')
                        dscQuantity = parseInt(quantityDiscountCount) + cart.dsc_quantity;
                        dscTotal = cart.produce.discount_price * parseInt(quantityDiscountCount, 10)
                    } else {
                        console.log('unchecked')
                        dscQuantity = cart.dsc_quantity
                        dscTotal = cart.produce.discount_price * parseInt(cart.dsc_quantity, 10)
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
        <div className='list'>
            <img className="wrapper" src={item.image} alt={item.produce}/>
            <div>{item.produce}</div>
            {item.quantity > 0 ? 
            <>
            <div>Price: {item.price}</div>
            <div>Quantity: {item.quantity}</div> 
            </>
            :
            <h4>Sold Out</h4>}
            {item.discount > 0 ? 
            <>
            <div>Discount Price: {item.discount_price}</div>
            <div>Discount Quantity: {item.discount_quantity}</div>
            <div className='discount-container-list'>
                <div className='discount-label'>
                    <h4>Buy Discount</h4>
                </div>
                <div className='discount-action'>
                    <input type='checkbox' onChange={() => setCheck(!check)}/>
                        {check ? <>
                            <input
                                className="quantity-num-card"
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
            </div>
            </>
            : <h4>Sold Out</h4>}
            <input 
                className="quantity-num-list" 
                type="number" 
                min="0"
                max={item.quantity}
                keypress="false" 
                value={quantityCount}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            <button className="add-cart-btn-list" onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
    )
}

export default ProduceList;