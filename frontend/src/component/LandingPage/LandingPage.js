import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TVDB_API_KEY, BASE_URL, IMAGE_URL } from '../../config';

import MainImage from '../Poster/MainImage';
import CardContainer from '../Display-Card/CardContainer';

// variables for dynamic content loading
let pageNumber = 1, fetchMovies;


// generate url
function getUrl(pageNumber, media_type=null){
    const media = ['movie', 'tv'];
    const type = ['popular', 'top_rated',];

    const randomArrayValue = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };
    
    media_type = media_type? media_type: `${randomArrayValue(media)}/${randomArrayValue(type)}`;
    return `${BASE_URL}/${media_type}?api_key=${TVDB_API_KEY}&language=en-US&page=${pageNumber}`;
}

// component
function LandingPage() {
    const [TvShow, setTvShow] = useState([]);
    const [Data, setData] = useState([]);
    const saveData = useRef([]);

    // fetch after 1st render
    useEffect(() => {
        fetchMovies(getUrl(pageNumber, 'tv/airing_today'), setTvShow, TvShow);
        fetchMovies(getUrl(pageNumber), setData, Data);
    }, []);

    // save the state so it is not lost when passed in child component
    useEffect(() => {
        saveData.current = [...saveData.current, ...Data];
    },[Data]);

    // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
    const observer = useRef(null);
    const callBackForLoadingMore = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                if(pageNumber !== 1) fetchMovies(getUrl(pageNumber), setData, Data);
                ++pageNumber;
            }
        })
        if(node) observer.current.observe(node);
    }, []);

    // fetch movies and set the new state
    fetchMovies = (url, setState, state) => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res.results);
                setState([...state, ...res.results]);
            })
            .catch(err => console.log(err));
    }
    
    // click functionality which fetch more movies
    const handleClick = () => {
        ++pageNumber;
        fetchMovies(getUrl(pageNumber), setData, Data);
    }

    return (
        <div id='landing-page'>
            {
                TvShow[0] && <Link 
                    to={`/movie/${TvShow[0].id}`}
                    style={{ textDecoration: 'none'}}>
                    <MainImage 
                        image={`${IMAGE_URL}${TvShow[0].backdrop_path}`}
                        title={TvShow[0].name || TvShow[0].title || TvShow[0].original_name || TvShow[0].original_title}
                        summary={TvShow[0].overview}/>
                </Link>
            }
            {
                Data && <CardContainer
                heading='Movies, Tv Series and Anime'
                movies={[...saveData.current, ...Data]}
                button={{
                    onClick: handleClick,
                    ref: callBackForLoadingMore,
                    text: 'Load More'
                }}
                    />
            }   
           
        </div>
    );
};

export default LandingPage;