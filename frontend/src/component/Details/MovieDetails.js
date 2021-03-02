import React,{ useEffect, useState } from 'react';
import { TVDB_API_KEY, BASE_URL, IMAGE_URL } from '../../config';
import MainImage from '../Poster/MainImage';

const Display = props => {
    return (
        <div className='details'>
            <h1>{
                props.details.name ||
                props.details.title ||
                props.details.original_name ||
                props.details.original_title
            }</h1>
            <section>
                {props.details.genres.map(genre => {
                    return <span key={genre.id}>{genre.name}</span>;
                })}
            </section>
            <article>
                {props.details.overview}
            </article>
            <article>
                <p>{props.details.status}</p>
                <p>{props.details.original_language}</p>
            </article>
        </div>
    )
}

const MovieDetails = (props) => {
    const [MovieInfo, setMovieInfo] = useState();

    useEffect(() => {
        const id = props.match.params.id;
        fetch(`${BASE_URL}/movie/${id}?api_key=${TVDB_API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setMovieInfo(res)
            });
    }, [props])

    return (
        <div>
           {MovieInfo &&
            <div>
                <MainImage 
                    image={`${IMAGE_URL}${MovieInfo.backdrop_path}`}
                    title={MovieInfo.name || MovieInfo.title || MovieInfo.original_name || MovieInfo.original_title} />
            </div>      
            }
           {MovieInfo &&
            <Display details={MovieInfo}/>
            }
        </div>
    );
}

export default MovieDetails;
