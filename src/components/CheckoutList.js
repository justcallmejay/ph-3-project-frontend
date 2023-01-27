import React, { useState } from 'react';
import '../css/Cart.css'

function CheckoutList( { cart, produce, onHandleChange } ) {


    const [hover, setHover] = useState(false)

    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    //Edit inventory quantity
    const [editQuantity, setEditQuantity] = useState(false)
    const [submitEdit, setSubmitEdit] = useState(null)
    const [produceQuantity, setProduceQuantity] = useState(cart.quantity)


    function handleEditQuantity() {
        setEditQuantity(!editQuantity)
        console.log(produceQuantity)
    }
    
    function handleEdit(food) {
        setEditQuantity(null)

    //     fetch(`${process.env.REACT_APP_API_URL}/cart/${food.id}`, {
    //         method: "PATCH",
    //         headers: {"Content-Type" : "application/json"},
    //         body: JSON.stringify({
    //             quantity: produceQuantity
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(res => console.log(res))
    //     setSubmitEdit(null);
    //     {produce.map(item => {
    //         if (item.id === food.id) {
    //         const updateInventory = item.quantity - produceQuantity
    //     fetch(`${process.env.REACT_APP_API_URL}/produce/${item.id}`, {
    //         method: "PATCH",
    //         headers: {"Content-Type" : "application/json"},
    //         body: JSON.stringify({
    //             quantity: updateInventory
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(res => onHandleChange(res))
    //     }
    //  }
    // )}
}

    return(
        <div className="checkout-list" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            // style={{ backgroundColor: cart.id % 2 == 0 ? "red" : "yellow" }}
            >
            <div className='checkout-main-info'>
                <img className="checkout-img" src={cart.image} alt={cart.name}/>
                <h3>{cart.produce}</h3>
            </div>
            <div className="produce-info">
                <a>Quantity: 
                {editQuantity ?
                <>
                    <input 
                        className="co-edit-num" 
                        type="number"
                        min="0"
                        value={produceQuantity} 
                        onChange={(e) => setProduceQuantity(e.target.value)}
                    />
                <button onClick={() => handleEdit(cart)}>OK</button>
                </> 
                    :    
                <div>{cart.quantity}</div>}
                </a>
                <a>Price: {cart.price}</a>
                <a>Total: {cart.total}</a>
            </div>

            <div className='produce-total'>
                <a></a>
                </div>
            {hover ? 
            <div className='hover-btn'>
                <button className='checkout-edit' onClick={handleEditQuantity}>Edit</button>
                <button className='checkout-delete'>Delete</button> 
            </div>
               : "" }
            </div>
    )
}

export default CheckoutList;