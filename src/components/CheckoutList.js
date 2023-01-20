import React from 'react'; 

function CheckoutList( { item } ) {
    return(
        <div className="checkout-list">

            <h1>{item.produce}</h1>
        </div>
    )
}

export default CheckoutList;