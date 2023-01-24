import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/AccountInfo.css'

function AccountInfo( { formData, setFormData, initialStateForm } ) {


    function handleChange(e) {
        const {name, value} = e.target;

        setFormData(info => {
            return {
                ...info, 
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/account`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(initialStateForm)
            .then(res => res.json())
            .then(res => console.log(res))
        })
    }

    return (
        <div className='info-container'>
            <div className='info-box'>
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <label>Full Name:</label>
                        <input 
                            className="placeholder" 
                            name='name' 
                            type="text" 
                            placeholder='Full Name' 
                            value={formData.name} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="phone">
                        <label>Phone Number:</label>
                        <input 
                            className="number" 
                            name='areacode' 
                            type="text"
                            keypress="false"
                            placeholder='000' 
                            value={formData.areacode} 
                            onChange={handleChange}
                        />
                        <input 
                            className="number" 
                            name='threedigits' 
                            type="text" 
                            placeholder='123' 
                            value={formData.threedigits} 
                            onChange={handleChange}
                        />
                        <input className="number" 
                            name='fourdigits' 
                            type="text"
                            keypress="false" 
                            placeholder='4567' 
                            value={formData.fourdigits} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="credit-card">
                        <label>Credit Card:</label>
                        <input className="credit-no" 
                            name='fstdigits' 
                            type="text"
                            keypress="false" 
                            placeholder='1234' 
                            value={formData.fstdigits} 
                            onChange={handleChange}
                        />
                        <input className="credit-no" 
                            name='snddigits' 
                            type="text" 
                            keypress="false"
                            placeholder='4567' 
                            value={formData.snddigits} 
                            onChange={handleChange}
                        />
                        <input className="credit-no" 
                            name='thddigits' 
                            type="text"
                            keypress="false" 
                            placeholder='8901' 
                            value={formData.thddigits} 
                            onChange={handleChange}
                        />
                        <input className="credit-no" 
                            name='fthdigits' 
                            type="text" 
                            keypress="false"
                            placeholder='2345' 
                            value={formData.fthdigits} 
                            onChange={handleChange}
                        />
                    </div>
                        <label>Expiration Date:</label>
                        <input className="exp-no" 
                            name='expmon' 
                            type="text" 
                            keypress="false"
                            placeholder='00' 
                            value={formData.expmon} 
                            onChange={handleChange} 
                        /> /
                        <input className="exp-no" 
                            name='expyr' 
                            type="text" 
                            keypress="false"
                            placeholder='00'  
                            value={formData.expyr} 
                            onChange={handleChange} 
                        />
                        <label>Code:</label>
                        <input className="code-no" 
                            name='code' 
                            type="text" 
                            keypress="false"
                            placeholder='' 
                            value={formData.code} 
                            onChange={handleChange}
                        />
                        <input type="checkbox"/>
                        <h6>By clicking on checkbox you agree with terms and conditions with Fresh Food Market Place</h6>
                        <h6>What's this?</h6>
                        <Link to="/confirm"><button className="acc-btn" id="confirm-next">Next</button></Link>
                </form>
                        <Link to="/checkout"><button className="acc-btn" id="confirm-back">Back</button></Link>
            </div>
        </div>
    )
}

export default AccountInfo;