import React from 'react';
import { getFullUrl, useFetchData } from '../../common-functions/functions';
import CardContainer from '../../component/Display-Card/CardContainer';
import ErrorPage from '../../component/ErrorBox/ErrorPage';
import Loading from '../../component/Preloader/Loading';
import useGetTrendingMedia from './Logic/useGetTrendingMedia';

// UI for the landing page
// TODO
function LandingPage(){
    const [
        trendingMedia, callBackForLoadingMore, loadNextPage
    ] = useGetTrendingMedia();
    console.log(trendingMedia);
    return (
        <>
            {
                trendingMedia.length <= 0 ?
                <Loading /> :
                (
                    <CardContainer
                    heading={{
                        text: 'Trending Movies and Tv Shows',
                        size: '1.8rem',
                        margin: '10px 20px'
                    }}
                    movies={trendingMedia || []}
                    button={{
                        onClick: loadNextPage,
                        ref: callBackForLoadingMore,
                        text: 'Load More'
                    }} />
                )
            }
        </>
    );
}

export default LandingPage;