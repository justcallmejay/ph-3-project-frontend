<!-- import React, { useState } from 'react';
import '../css/ProduceCard.css'

function ProduceCard( { sear, userCart, handleAddtoCart, onHandleChange, handleUpdateCart, animateAddCart } ) {

    const [quantityCount, setQuantityCount] = useState(0)

    // console.log(userCart)
    
    function addToCart(item) {
        const updateFood = userCart.filter(food => {
            if (food.produce !== item.produce) {
            console.log(item)
            } else {
                console.log(food)
            }
            handleAddtoCart(updateFood)
        })

        // userCart.filter(food => {
        //     if (food.produce === item.produce) {
        //         console.log('in basket')
        //         console.log(food)
        //         fetch(`${process.env.REACT_APP_API_URL}/cart/${food.id}`, {
        //             method: "PATCH",
        //             headers: {"Content-Type" : "application/json"},
        //             body: JSON.stringify({
        //                 quantity: quantityCount
        //             })
        //         })
        //         .then(res => res.json())
        //         .then(res => handleUpdateCart(res));
        //     }
        // })


        // let cartId = ''
        // let currentCartQuantity = ''
        // // const searchItem = (acc) => acc === item.produce
        // // const searchCart = userCart.map(food => {
        // //     cartId = food.id;
        //     currentCartQuantity = parseInt(filterItem.quantity, 10);
        // //     return food.produce; 
            
        // // })
        
        // // if (searchCart.some(searchItem) === true) {
        //     const sumTotal = currentCartQuantity + parseInt(quantityCount, 10)
        // //     console.log('hi')
        // //     console.log(cartId)

            //chanage onHandleChange with a different one; that's why it adds a card into the screen//
        // } else {
        //     console.log('bye')
        // }
        
        
        // if (!food.includes(item) 
        // && userCart.length === 1; the app will create empty string of keys for account into at accountinfo component
        // && quantityCount !== 0 
        // && item.quantity >= quantityCount
        // ) {
            // console.log(item)
        //     const sumPurchase = item.price * quantityCount
        //     const updateQuantity = item.quantity - quantityCount
        //     fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        //         method: "POST",
        //         headers: {"Content-Type" : "application/json"},
        //         body: JSON.stringify({
        //             // name: '',
        //             // phone: '',
        //             // discount: false,
        //             // discount_cost: "",
        //             // discount_quantity: "",
        //             // card: '',
        //             // card_exp: '',
        //             // code: ''
        //             //cart : [{
        //             produce : item.produce,
        //             image: item.image, 
        //             quantity: quantityCount,
        //             price: item.price,
        //             total: sumPurchase,
        //             purchase: false,
        //         // }]
        //         })
        // })
        //     .then(res => res.json())
        //     .then(res => handleAddtoCart(res));
        //     setQuantityCount(0);
        //     //return 
        //     fetch(`${process.env.REACT_APP_API_URL}/produce/${item.id}`, {
        //         method: "PATCH",
        //         headers: {"Content-Type" : "application/json"},
        //         body: JSON.stringify({
        //             quantity: updateQuantity
        //         })
        //     })
        //         .then(res => res.json())
        //         .then(res => onHandleChange(res))

    // } else if (userCart.includes(item.produce)) {
    //     console.log('hi')
        // fetch(`${process.env.REACT_APP_API_URL}/cart/${item.id}`, {
        //     method: "PATCH",
        //     headers: {"Content-Type" : "application/json"},
        //     body: JSON.stringify({
        //         quantity: updateQuantity
        //     })
        // })
        //     .then(res => res.json())
        //     .then(res => onHandleChange(res));
        //     setQuantityCount(0);
        // fetch(`${process.env.REACT_APP_API_URL}/produce/${item.id}`, {
        //     method: "PATCH",
        //     headers: {"Content-Type" : "application/json"},
        //     body: JSON.stringify({
        //         quantity: updateCartQuantity
        //     })
        // })
        //     .then(res => res.json())
        //     .then(res => onHandleChange(res))
    // }

    //  else if (quantityCount <= 0) {
    //     alert('There is nothing in the cart')
    // } else if (quantityCount > item.quantity) {
    //     alert("Bro we're poor")
    // }
    //     })
    }

    return(
        <div className='card'>
            <img src={sear.image} alt={sear.produce}/>
            <h3>{sear.produce}</h3>
            {sear.quantity > 0 ? 
            <>
            <a>Price: {sear.price}</a>
            <div>Quantity: {sear.quantity}</div>
             </>
            : <h4>Sold Out</h4>
            }
            {sear.discount > 0 ? 
            <>
            <div>Discount Price: {sear.discount_price}</div>
            <div>Discount Quantity: {sear.discount_quantity}</div>
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
                max={sear.quantity}
                onChange={(e) => setQuantityCount(e.target.value)}
            />
            {/* <input type="checkbox"/>Order Discounted Produce */}
            <button className="add-cart-btn" onClick={() => addToCart(sear)}>Add to Cart</button>
            </div>
        </div>
    ) 
}

export default ProduceCard; -->