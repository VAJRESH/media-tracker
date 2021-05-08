import React from 'react';
import { IMAGE_URL } from '../../config';

import useFetchCardDetails from '../../FetchMediaData/useFetchCardDetails';
import MainImage from '../../component/MainImage/MainImage';
import MediaHeadingWithGenre from '../../component/MediaDetails/MediaHeading';
import SeasonsInfo from '../../component/Tv-show-details/SeasonInfo/SeasonInfo';
import SeasonsDetails from '../../component/Tv-show-details/SeasonsDetails';
import SimilarMedia from '../../component/SimilarMedia/SimilarMedia';
import { getFullUrl, isItAnime, useFetchData } from '../../common-functions/functions';
import './TvShowDetails.css';
import Loading from '../../component/Preloader/Loading';
import ErrorPage from '../../component/ErrorBox/ErrorPage';

const TvShowDetails = (props) => {
    const tvId = props.match.params.id;
    const [isError, isLoading, TvInfo] = useFetchData(getFullUrl(`tv/${tvId}`, 1));
    const isAnime = isItAnime(TvInfo || {});

    if(isError) return ( <ErrorPage /> );

    return (
        <div>
            {
                isLoading ?
                <Loading /> :
                <>
                    <div>
                        <MainImage 
                        image={`${IMAGE_URL}${TvInfo.backdrop_path}`} 
                        poster={`${IMAGE_URL}${TvInfo.poster_path}`} />
                    </div>
                    <div className='details'>
                        <MediaHeadingWithGenre media={ TvInfo } />
                        <SeasonsInfo shows={ TvInfo } IsAnime={ isAnime } />
                        <SeasonsDetails seriesData={ TvInfo } IsAnime={ isAnime } />
                        <SimilarMedia media={ TvInfo } type='tv' />
                    </div>
                </>
            }
        </div>
    );
}


export default TvShowDetails;