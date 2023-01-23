import React from 'react';
import { Link } from 'react-router-dom'
import '../css/Confirm.css'

function Confirm( { formData, userCart } ) {

    return(
        <div className='confirm-container'>
            <h2>Information</h2>
            <div className='confirm-info'>
                <h3>Name: {formData.name}</h3>
                <a>Phone: ({formData.areacode}) {formData.threedigits}-{formData.fourdigits}</a>
            </div>
            <div className='recepit-container'>
                <h3>Receipt:</h3>
                {userCart.map(item => 
                <div className='receipt'>
                    <a>{item.produce}</a>
                    <a>Quantity: {item.quantity}</a>
                    <a>Price: {item.price}</a>
                </div>
                    )}
            </div>
            <Link to="/account-information"><button className="acc-btn" id="confirm-back">Back</button></Link>
            <Link to="/shop"><button className="acc-btn" id="confirm-next">Submit</button></Link>
        </div>
        )
    }

export default Confirm;