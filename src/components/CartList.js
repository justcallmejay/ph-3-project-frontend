import React, { useState } from 'react';
import '../css/Cart.css'

function CartList( { cart, onHandleDelete, onHandleUpdate, produce } ) {

    const [hover, setHover] = useState(false)

    const [editQuantity, setEditQuantity] = useState(false)
    const [produceQuantity, setProduceQuantity] = useState(cart.quantity)
    const [submitEdit, setSubmitEdit] = useState(null)

    console.log(produce)

    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    function handleDelete(item) {
        produce.filter(food => { 
            if (food.produce === item.produce) {
                console.log('yes')
                    const updateQuantity = food.quantity + cart.quantity
                fetch(`${process.env.REACT_APP_API_URL}/delete/${item.id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(item => onHandleDelete(item))
                fetch(`${process.env.REACT_APP_API_URL}/update/${food.id}`, {
                        method: "PATCH",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify({
                            quantity: updateQuantity
                        })
                            })
                            .then(res => res.json())
                            .then(res => onHandleUpdate(res))
                }
            })
    }

    function handleEditQuantity() {
        setEditQuantity(!editQuantity)
        console.log(produceQuantity)
        setSubmitEdit(null)
    }

    return(
        <div className='cart-list-container'
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        >
                <img className='cart-image' 
                    src={cart.image} 
                    alt={cart.produce} 
                />
            <div className='cart-data'>
                <h6>{cart.produce}</h6>

                <a>Quantity: 
                {editQuantity ?
                <>
                    <input 
                        className="edit-num" 
                        type="number" 
                        value={produceQuantity} 
                        onChange={(e) => setProduceQuantity(e.target.value)}
                    />
                <button onClick={setSubmitEdit}>OK</button>
                </> 
                    :    
                <div>{cart.quantity}</div>}
                </a>
                <a>Total: {cart.total}</a>
            </div>
                {hover ? 
                <>
                <button className='checkout-edit' onClick={handleEditQuantity}>Edit</button>
                <button className='checkout-delete' onClick={() => handleDelete(cart)}>Delete</button>
                </>
                : ""}
        </div>
    )
}

export default CartList;