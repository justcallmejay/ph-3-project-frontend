import React from 'react';

function ProduceCard( { sear })  {
    return(
        <div className='card'>
            <img src={sear.image} alt={sear.name}/>
            <a>{sear.name}</a>
            <a>{sear.price}</a>
        </div>
    )
}

export default ProduceCard;