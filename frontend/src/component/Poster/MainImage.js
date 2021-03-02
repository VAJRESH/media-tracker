import React from 'react';
import './MainImage.css';

const MainImage = props => {
    let style = null, size = 10, textLength = props.title.length;
    if(textLength >= 18){
        style = {
            fontSize: `${size-2}vw`
        }
        if(textLength >= 20){
            style = {
                fontSize: `${size-3}vw`
            }
        }
        if(textLength >= 25){
            style = {
                fontSize: `${size-5.5}vw`
            }
        }
    }
    return (
        <div className='poster-container'>
            <img src={props.image} className='poster' alt='Poster'/>
            <h1 className='poster-title' style={style}>
                {props.title}
            </h1>
        </div>
    );
}

export default MainImage;
