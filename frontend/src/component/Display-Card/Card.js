import React from 'react';
import './Card.css';

const Card = props => {
    let title = props.title
    if(title.length >= 35){
        title = title.slice(0, 32)+'...';
    }
    return (
        <div className='card'>
            <img src={props.image} className='card-poster' alt={props.title}/>
            <h4 className='card-title'>{`${title} (${props.year})`}</h4>
        </div>
    )
}

export default Card;
