import React from 'react';
import '../css/ProduceList.css'

function ProduceList( {sear} ) {
    return(
        <div className='list'>
            <img className="wrapper" src={sear.image} alt={sear.produce}/>
            <div>{sear.produce}</div>
            <div>Price: {sear.price}</div>
            <div>Discount: {sear.expiring_price}</div>
            <div>Discount Quantity: {sear.expiring_quantity}</div>
            <input className="quantity-num-list" type="text" placeholder=""/>
            <button className="cart-list">Add to Cart</button>
        </div>
    )
}

export default ProduceList;