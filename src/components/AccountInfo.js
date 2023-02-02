import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
;import { Link } from 'react-router-dom';
import '../css/AccountInfo.css'

function AccountInfo( { account, formData, setFormData, handleAddAccount } ) {

    let history = useHistory();

    const [toggle, setToggle] = useState(false)
    const [existingAcc, setExistingAcc] = useState(true)
    const number = [formData.areacode, formData.threedigits, formData.fourdigits].join('')
    console.log(number)

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData(info => {
            return {
                ...info, 
                [name]: value
            }
        })
    }

    function toggleDisplay() {
        setToggle(!toggle)
    }

    console.log(account)

    function findAcc() {
        setExistingAcc(existingAcc => !existingAcc)
        if (existingAcc) {
        account.map(acc => {
            if (number === acc.phone) {
                console.log('match')
            } else {
                console.log('no match')
                }
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('click')
        if (formData.name && formData.areacode && formData.threedigits && formData.fourdigits && formData.fstdigits && formData.snddigits && formData.thddigits && formData.fthdigits && formData.expmon && formData.expyr && formData.code !== '') {
        fetch(`${process.env.REACT_APP_API_URL}/order`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                name: formData.name,
                phone: `${formData.areacode}${formData.threedigits}${formData.fourdigits}`,
                credit_card: `${formData.fstdigits}${formData.snddigits}${formData.thddigits}${formData.fthdigits}`,
                exp_mon: formData.expmon,
                exp_yr: formData.expyr,
                code: formData.code
                })
            })
            .then(res => res.json())
            .then(res => handleAddAccount(res))
            history.push('/confirm')
        }
    }

    return (
        <div className='info-container'>
            <div className='info-box'>
                <form onSubmit={handleSubmit}>
                    <div className="name-container">
                        <label>Full Name:</label>
                        <input 
                            className="placeholder" name='name' type="text"
                            placeholder='Full Name' value={formData.name} onChange={handleChange}
                        />
                    </div>
                    <div className="phone" >
                        <label>Phone Number:</label>
                        <input className="number" name='areacode' type="text"
                        maxLength="3" placeholder='000' 
                        value={formData.areacode} onChange={handleChange}
                        />
                        <input 
                        className="number" name='threedigits' type="text" 
                        maxLength="3" placeholder='123' 
                        value={formData.threedigits} onChange={handleChange}
                        />
                        <input className="number" name='fourdigits' type="text"
                        maxLength="4" placeholder='4567' 
                        value={formData.fourdigits} onChange={handleChange}
                        />
                        <input type="checkbox" onChange={findAcc}/> I have shopped here
                    </div>
                    <div className="credit-card">
                        <label>Credit Card:</label>
                        <input className="credit-no" name='fstdigits' type="text"
                        maxLength="4" placeholder='1234' 
                        value={formData.fstdigits} onChange={handleChange}
                        />
                        <input className="credit-no" name='snddigits' type="text" 
                        maxLength="4" placeholder='4567' 
                        value={formData.snddigits} onChange={handleChange}
                        />
                        <input className="credit-no" name='thddigits' 
                        type="text" maxLength="4" placeholder='8901' 
                        value={formData.thddigits} onChange={handleChange}
                        />
                        <input className="credit-no" name='fthdigits' type="text"
                        maxLength="4" placeholder='2345' 
                        value={formData.fthdigits} onChange={handleChange}
                        />
                    </div>
                        <label>Expiration Date:</label>
                        <input className="exp-no" name='expmon' type="text" maxLength="2"
                        placeholder='00' value={formData.expmon} onChange={handleChange} 
                        /> /
                        <input className="exp-no" name='expyr' type="text" maxLength="2"
                        placeholder='00' value={formData.expyr} onChange={handleChange} 
                        />
                        <label>Code:</label>
                        <input className="code-no" name='code' type="text" maxLength="3"
                        placeholder='' value={formData.code} onChange={handleChange}
                        />
                        <div className='toa'>
                            <input type="checkbox"/>
                            <h6>By clicking on checkbox you agree with terms and conditions with Fresh Food Market Place</h6>
                            <h6 className="whats-this-link" onClick={toggleDisplay}>What's this?</h6>
                            {toggle ? 
                        <div className="whats-this-container">
                            <div className="whats-this">
                            <p>This checkbox states that all the information submitted is accurate and that the user entering the information is authentic.</p>
                        </div>
                        </div>
                         : ""}
                        </div>
                        <button className="acc-btn" id="confirm-next">Next</button>
                </form>
                        <Link to="/checkout"><button className="acc-btn" id="confirm-back">Back</button></Link>
            </div>
        </div>
    )
}

export default AccountInfo;