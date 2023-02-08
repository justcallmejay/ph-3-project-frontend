import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
;import { Link } from 'react-router-dom';
import '../css/AccountInfo.css'

function AccountInfo( { account, formData, setFormData, handleAddAccount } ) {

    let history = useHistory();
    
    const [toggle, setToggle] = useState(false)
    const [existingAcc, setExistingAcc] = useState(true)
    const [errorDisplay, setErrorDisplay] = useState(false)
    const [error, setError] = useState("")
    const number = [formData.areacode, formData.threedigits, formData.fourdigits].join('')
    const ccNumber = [formData.fstdigits, formData.snddigits, formData.thddigits, formData.fthdigits].join('')

    // console.log(ccNumber)
    // console.log(existingAcc)
    
    function handleChange(e) {
        const {name, value} = e.target;
        
        setFormData(info => {
            return {
                ...info, 
                [name]: value
            }
        })
    }

    function toggleSearchExistingInfo() {
        setExistingAcc(!existingAcc)
    }
    
    function toggleDisplay() {
        setToggle(!toggle)
    }
    
    function toggleError() {
        setErrorDisplay(!errorDisplay)
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const existingName = account.map(person => {return person.name})
        const existingCard = account.map(card => {return String(card.credit_card)})
        const inputExistingName = (name) => name === formData.name
        const inputExistingCard = (card) => card === ccNumber
        if (existingAcc === false) {
            if (existingName.some(inputExistingName) === true && existingCard.some(inputExistingCard) === true) {
            account.map(acc => {
                if (acc.name === formData.name) {
                    let newone = String(acc.phone).slice(0,3)
                    let newtwo = String(acc.phone).slice(3,6)
                    let newthree = String(acc.phone).slice(6,10)
                    formData.areacode = Number(newone)
                    formData.threedigits = Number(newtwo)
                    formData.fourdigits = Number(newthree)
                    history.push('/confirm')
                        }
                    })
                } else (setError("Information not found"))
                setErrorDisplay(!errorDisplay)
            } else {
        if (!formData.name) {
            setError("Complete name")
            setErrorDisplay(!errorDisplay)
        } else if (!formData.areacode || !formData.threedigits || !formData.fourdigits) {
            setError("Complete phone number")
            setErrorDisplay(!errorDisplay)
        } else if (!formData.fstdigits || !formData.snddigits || !formData.thddigits || !formData.fthdigits || !formData.expmon || !formData.expyr || !formData.code) {
            setError("Fill out credit card information")
            setErrorDisplay(!errorDisplay) 
        } else if (formData.fstdigits.length < 4 || formData.snddigits.length < 4 || formData.thddigits.length < 4 || formData.fthdigits.length < 4 || formData.expmon.length < 2 || formData.expyr.length < 2 || formData.code.length < 3) {
            setError("Complete credit card information")
            setErrorDisplay(!errorDisplay)
        } else if (existingName.some(inputExistingName) && existingCard.some(inputExistingCard)) {
            setError("Account already exists")
            setErrorDisplay(!errorDisplay)
        // } else if {
        //     const searchName = account.map(acc => {return acc.name})
        //     const searchPhone = account.map(acc => {return acc.phone})
        //     const searchCC = account.map(acc => {return acc.credit_card})
        //     const inputName = (user) => user === formData.name
        //     const inputPhone = (phone) => phone === number
        //     const inputCC = (cc) => cc === ccNumber
        //     if (searchName.some(inputName) === true && searchPhone.some(inputPhone) === true && searchCC.some(inputCC) === true) {
        //         console.log('user exist')
        //     }            
        } else {
        history.push('/confirm')
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
        }
        console.log(error)
        }
    }

    return (
        <div className='info-container'>
            <div className='info-box'>
                <div className='existing-container'>
                    <input type="checkbox" onChange={toggleSearchExistingInfo}/> 
                    <p>I have shopped here.  (Type your name and credit card.)</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="name-container">
                        <label>Full Name:</label>
                        <input 
                            className="placeholder" name='name' type="text"
                            placeholder='Full Name' value={formData.name} onChange={handleChange}
                            style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                    </div>
                    <div className="phone" >
                        <label>Phone Number:</label>
                        <input className="number" name='areacode' type="text"
                        maxLength="3" placeholder='000' 
                        value={formData.areacode} onChange={handleChange}
                        disabled={ existingAcc ? "" : true}
                        />
                        <input 
                        className="number" name='threedigits' type="text" 
                        maxLength="3" placeholder='123' 
                        value={formData.threedigits} onChange={handleChange}
                        disabled={ existingAcc ? "" : true}
                        />
                        <input className="number" name='fourdigits' type="text"
                        maxLength="4" placeholder='4567' 
                        value={formData.fourdigits} onChange={handleChange}
                        disabled={ existingAcc ? "" : true}
                        />
                    </div>
                    <div className="credit-card">
                        <label>Credit Card:</label>
                        <input className="credit-no" name='fstdigits' type="text"
                        maxLength="4" placeholder='1234' 
                        value={formData.fstdigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                        <input className="credit-no" name='snddigits' type="text" 
                        maxLength="4" placeholder='4567' 
                        value={formData.snddigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                        <input className="credit-no" name='thddigits' 
                        type="text" maxLength="4" placeholder='8901' 
                        value={formData.thddigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                        <input className="credit-no" name='fthdigits' type="text"
                        maxLength="4" placeholder='2345' 
                        value={formData.fthdigits} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                    </div>
                    <div className="exp-date">
                        <label>Expiration Date:</label>
                        <input className="exp-no" name='expmon' type="text" maxLength="2" 
                        placeholder='00' value={formData.expmon} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />/
                        <input className="exp-no" name='expyr' type="text" maxLength="2"
                        placeholder='00' value={formData.expyr} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }} 
                        />
                        <label>Code:</label>
                        <input className="code-no" name='code' type="text" maxLength="3"
                        placeholder='' value={formData.code} onChange={handleChange}
                        style={{ borderStyle: "solid", borderColor :  existingAcc ? "" : "green" }}
                        />
                    </div>
                        <div className='toa'>
                            <input type="checkbox" disabled={ existingAcc ? "" : true}/>
                            <h6>By clicking on checkbox you agree with terms and conditions with Fresh Food Market Place</h6>
                        </div>
                            <h6 className="whats-this-link" onClick={toggleDisplay}>What's this?</h6>
                            {toggle ? 
                        <div className="whats-this-container">
                            <div className="whats-this">
                            <p>This checkbox states that all the information submitted is accurate and that the user entering the information is authentic.</p>
                        </div>
                         </div>
                         : ""}
                        <button className="acc-btn" id="confirm-next">Next</button>
                </form>
                        <Link to="/checkout"><button className="acc-btn" id="confirm-back">Back</button></Link>
            </div>
                {errorDisplay ? 
                <div className="error-msg">

            <div className="error-msg-container">
                <div className="error">
                    <div>Error: {error}</div>
                    
                    <button onClick={toggleError}>Ok</button>
                </div>
            </div>
            </div>
                : ""}
                </div>
    )
}

export default AccountInfo;