import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return(
    <div className='home'>
        <div className='home-container'>
            <h1>Welcome to Fresh Take</h1>
            <p>Fresh Take is a small business local store that aims to reduce wasted food.  We strive to stand out in the fresh produce market by taking the extra time to sort our fruits and vegetables by time and sell produce that have sat on the shelf for longer.</p>
            <Link to='/shop'><h4>Start Shopping Here</h4></Link>
        </div>
    </div>
    );
}

export default Home;