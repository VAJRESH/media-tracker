import React from 'react';
import './MainImage.css';

const MainImage = props => {
    return (
        <div className='background-image'>
            <img src={props.image} alt='Poster'/>
            <div className='image-details'>
                <h1>{props.title}</h1>
                <p>{props.summary}</p>
            </div>
        </div>
    );
}

export default MainImage;
