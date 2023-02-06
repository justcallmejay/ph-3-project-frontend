import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../css/Confirm.css'

function Confirm( { formData, sum, userCart, account, handleUpdateUserCart, inventory, setInventory } ) {

    const history = useHistory()
    const [hideNum, setHideNum] = useState(false)
    const ccInfo = [formData.fstdigits, formData.snddigits, formData.thddigits]
    
    const maskCreditCard = ccInfo.map(card => {
        return card.replace(/[0-9]/g, "*").match(/.{1,4}/g).join("");
});

    console.log(inventory)

    // console.log(findInventory)

    function addIdToCart() {
        account.map(acc => {
            if (formData.name === acc.name)
                fetch(`${process.env.REACT_APP_API_URL}/update`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        order_id: acc.id
                    })
                })
                .then(res => res.json())
                .then(res => handleUpdateUserCart(res));
        });
        inventory.map(acc => {
            let subtractQuantity = acc.produce.quantity - acc.quantity
            let subtractDscQuantity = acc.produce.discount_quantity - acc.discount_quantity
                fetch(`${process.env.REACT_APP_API_URL}/produce/${acc.produce_id}`, {
                    method: "PATCH",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        quantity: subtractQuantity,
                        discount_quantity: subtractDscQuantity
                    })
                })
                .then(res => res.json())
                .then(res => console.log(res))
            })
        setInventory([])
        // history.push('/shop')
    }

    return(
        <div className='confirm' 
        // onClick={toggleBgAlert}
        >
            <div className='confirm-container'>
                <h2>Information</h2>
                <div className='confirm-info'>
                    <h3>Name: {formData.name}</h3>
                    <h3>Phone: ({formData.areacode}) {formData.threedigits}-{formData.fourdigits}</h3>
                    <h3>Card Info: {maskCreditCard[0]} {maskCreditCard[1]} {maskCreditCard[2]} {formData.fthdigits}</h3>
                    <h3>Expires: {formData.expmon} / {formData.expyr}</h3>
                </div>
                <div className='receipt-container'>
                    <h3>Receipt:</h3>
                    {inventory.map(item => 
                    <div className='receipt' key={item.id}>
                        <a>{item.produce.produce}</a>
                        <a>Amt: {item.quantity}</a>
                        <a>Price: {item.produce.price}</a>
                        <a>Total: {item.total}</a>
                    </div>
                        )}
                </div>
                <div className='submit-sum'><h3>Total: {sum.toFixed(2)}</h3></div>
                <div className='confirm-btns'>
                {/* <Link to="/account-information"> */}
                    <button className="acc-btn" id="onfirm-back"
                        // onClick={toggleAlert}
                        >
                    Back</button>
                    {/* </Link> */}
                <button className="acc-btn" id="onfirm-next" onClick={addIdToCart}>Submit</button>
                </div>
                <div className="submit">
                    <h2>Your cart has been updated.  You may go back here:</h2>
                    <Link to='/shop'><button>Shop</button></Link>
                </div>
            </div>
        </div>
        )
    }

export default Confirm;

// const [toggleDeleteDisplay, setToggleDeleteDisplay] = useState(false)

// function toggleAlert() {
//     setToggleDeleteDisplay(!toggleDeleteDisplay)
// }

// function toggleBgAlert() {
//     if (toggleDeleteDisplay === true) {
//         setToggleDeleteDisplay(!toggleDeleteDisplay)
//     }
// }

// {toggleDeleteDisplay ?
//     <div className='delete-info-bg'>
//         <div className="delete-info-container">
//             <div className='delete-info'>
//                 <h3>Are you sure you want to go back?  This will erase submitted data from the last page.</h3>
//             </div>
//                 <div className='delete-info-btn-container'>
//                     <Link to="/account-information">
//                     <button className="confirm-btn">Yes</button>
//                     </Link>
//                     <button className="confirm-btn"onClick={toggleAlert}>No</button> 
//                 </div>
//         </div>
//     </div> : ""}