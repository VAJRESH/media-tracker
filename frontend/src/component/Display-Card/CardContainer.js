import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../config';
import './CardContainer.css';

import Card from '../Display-Card/Card';

const CardContainer = props => {
    return (
        <section className='display-card-section'>
            <h2 style={{ fontSize: '4.5vw' }} className='card-section-heading'>{props.heading}</h2>
            <div className='card-container'>
                {
                    props.movies.map((movie, index) => {
                        const media_type = movie.release_date ? 'movie': 'tv';
                        const year = media_type==='movie' ? movie.release_date.slice(0, 4): movie.first_air_date.slice(0, 4)
                        return (
                            <Link 
                                to={`/details/${movie.release_date?'movie':'tv'}/${movie.id}`} key={movie.id+Math.random()+index+new Date().toString()}
                                style={{ textDecoration: 'none'}}>
                                <Card
                                    image={`${IMAGE_URL}${movie.poster_path}`}
                                    title={movie.name || movie.title || movie.original_name || movie.original_title}
                                    year={year} />
                            </Link>
                        );
                    })
                }
                <div className='load-button'>
                    <button onClick={props.button.onClick} ref={props.button.ref}>{props.button.text}</button>
                </div>
            </div>
        </section>
    );
}

export default CardContainer;