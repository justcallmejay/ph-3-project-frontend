import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css'

function Home() {
    return(
    <div className='home'>
        <div className="bar-top">
        <div className='home-container'>
            <h1>Welcome to Fresh Produce</h1>
            <section>Fresh Produce is a small business local store that aims to reduce wasted food.  We strive to stand out in the fresh produce market by taking the extra time to sort our fruits and vegetables by time and sell produce that have sat on the shelf for longer.</section>
            <Link to='/shop'><h4>Start Shopping Here</h4></Link>
        </div>
        <div className="bar-bottom"></div>
            </div>
    </div>
    );
}

export default Home;