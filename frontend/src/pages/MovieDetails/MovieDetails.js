import React from 'react';
import { IMAGE_URL } from '../../config';

import MainImage from '../../component/MainImage/MainImage';
import MediaHeadingWithGenre from '../../component/MediaDetails/MediaHeading';
import ActionButtons from '../../component/MoviesDetails/ActionButtons';
import MovieData from '../../component/MoviesDetails/MovieData';
import SimilarMedia from '../../component/SimilarMedia/SimilarMedia';
import { getFullUrl, useFetchData } from '../../common-functions/functions';
import ErrorPage from '../../component/ErrorBox/ErrorPage';
import Loading from '../../component/Preloader/Loading';
import Collection from '../../component/MoviesDetails/Collection/Collection';
import './details.css';


const MovieDetails = (props) => {
    const movieId = props.match.params.id;
    const [isError, isLoading, MovieInfo] = useFetchData(getFullUrl(`movie/${movieId}`));

    if(isError) return ( <ErrorPage /> );

    return (
        <div>
            {
                isLoading ?
                <Loading /> :
                (
                    <>
                        <div>
                            <MainImage
                            image={`${IMAGE_URL}${MovieInfo.backdrop_path}`}
                            poster={`${IMAGE_URL}${MovieInfo.poster_path}`} />
                        </div>
                        <div className='details'>
                            <MediaHeadingWithGenre media={MovieInfo} />
                            <ActionButtons movie={MovieInfo} />
                            <MovieData media={MovieInfo} />
                            {
                                MovieInfo.belongs_to_collection &&
                                <Collection collection={MovieInfo.belongs_to_collection} />
                            }
                            <SimilarMedia
                            media={MovieInfo}
                            type='movie' />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MovieDetails;
