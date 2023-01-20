import React from 'react'
import '../css/AccountInfo.css'

function AccountInfo() {

    return (
        <div className='info-container'>
            <div className='info-box'>
                <form>
                    <label>Full Name:</label>
                    <input className="placeholder" type="text" placeholder='Full Name'/>
                    <label>Email-Address:</label>
                    <input className="placeholder" type="email" placeholder='Email Address'/>
                    <label>Phone Number:</label>
                    <input className="number" type="text" placeholder='000'/>
                    <input className="number" type="text" placehold='123'/>
                    <input className="number" type="text" placehold='4567'/>
                    Credit Card:
                    <input className="number" type="text" placehold='4567'/>
                    <input className="number" type="text" placehold='4567'/>
                    <input className="number" type="text" placehold='4567'/>
                    <input className="number" type="text" placehold='4567'/>
                    <checkbox>
                        <h6>By clicking on checkbox you agree with terms and conditions with Fresh Food Market Place</h6>
                        <h6>What's this?</h6>
                    </checkbox>
                </form>
            </div>
        </div>
    )
}

export default AccountInfo;