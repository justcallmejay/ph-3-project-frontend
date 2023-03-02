import React from 'react';
import '../css/AboutUs.css'

function AboutUs() {
    return(
        <div className="about-us">
            <div className="about-container">
                <p className="info">Food Waste Stats:</p>
                <p className='tab' id="section-1">Food waste is very common in today's era.  Those food stored in our refrigerator, table, or pantry just sits there until mold settles in, and the food becomes inedible.  Approximately 1600 USD worth of food is thrown away by the average Americans every month.  In comparison, that is almost 1/3 of the average monthly wage in the garbage.</p>
            <p className='tab'>
                <div className="about-img">
                    <img  className="about-img" src="https://greenerideal.com/wp-content/uploads/2018/11/10-food-waste-solutions-that-are-basically-habits-to-save-the-earth-696x372.jpg?ezimgfmt=rs%3Adevice%2Frscb1-1" alt='about-img'/>
                </div>
                According to RTS, <a className="superscript">1</a> "the United States discards more food than anyother country in the world: nearly 40 million tons - 80 billion pounds - every year."  From numerous factors that contribute to the rising amount of waste, from insects, rise in unemployment, work from home that result in ordering takeout, 'ugly foods' (food that are tossed due to its lack of aesthetic appeal to the customers), the number rises over the years.  Not only is this an issue coming from the family, but also at grocery stores.  In fact, (according to dumpsters.com) "19 million Americans lack access to fresh produce, either due to high prices or because there’s no grocery store in their neighborhood."</p>
                Our Mission:
            <p className='tab'>
                <div className="about-img-2">
                    <img src="https://t3.ftcdn.net/jpg/02/40/74/94/360_F_240749444_qo19poF7ekFJqsXNre5uacw7jHC3Yk7E.jpg" alt='about-img'/>
                </div>
                Here at Fresh Market we aim to benefit customers, Fresh Market, and the ecosystem.  We sell our produce at a discounted produce when they have been on the shelf for as little as three days.  Not only will this strategy reduce the amount of food discarded, but it will also be affordable to all customers despite of economic class.  To reduce the amount of prouce wasted, we would like to suggest that our customers take advantage of these discount when planning on consuming the day of purchase.
            </p>
                <div className="source-container">
                <p>Source:</p>
                <a className="superscript">1</a><p>"Food Waste in America in 2023" https://www.rts.com/resources/guides/food-waste-america/</p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;