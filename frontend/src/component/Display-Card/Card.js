import React from 'react';
import './Card.css';

// let style = {
//     backgroundColor: 'linear-gradient(rgb(66, 65, 65), rgb(219, 217, 217))',
//     backgroundImage: `url(${props.image})`,
//     backgroundSize: 'cover',
// } 

const Card = props => {
    return (
        <div className='card'>
            <img src={props.image} alt={props.title}/>
        </div>
    )
}

export default Card;
