import React from 'react';

function ProduceList( {sear} ) {
    return(
        <div className='list'>
            <img src={sear.image} alt={sear.name}/>
            <a>{sear.name}</a>
            <a>{sear.price}</a>
        </div>
    )
}

export default ProduceList;