import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TVDB_API_KEY, BASE_URL, IMAGE_URL } from '../../config';
import './LandingPage.css';

import MainImage from './Poster/MainImage';
import Card from '../Display-Card/Card';
// import Card from './card';
// import { Link } from 'react-router-dom';
// import '../css/container.css';

let pageNumber = 1;
const url =  `${BASE_URL}/movie/popular?api_key=${TVDB_API_KEY}&language=en-US&page=`;
let fetchMovies;
function LandingPage() {
    const [Movies, setMovies] = useState([]);
    useEffect(() => {
        // https://api.themoviedb.org/3/movie/popular?api_key=
        // https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
        fetchMovies(url+pageNumber);
    }, [])

    const observer = useRef(null);
    const callBackForLoadingMore = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                if(pageNumber !== 1) fetchMovies(url+pageNumber);
                ++pageNumber;
            }
        })
        if(node) observer.current.observe(node);
    }, []);

    fetchMovies = url => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res.results);
                setMovies([...Movies, ...res.results]);
            })
            .catch(err => console.log(err));
    }
    
    const handleClick = () => {
        ++pageNumber;
        fetchMovies(url+pageNumber)
    }
    // window.addEventListener('scroll',e => {
    //     e.preventDefault();
    //     console.log(window.scrollY);
    //     if(window.scrollY === 1848){
    //         console.log(window.scrollY);
    //     }
    // })
    return (
        <div className='landingPage'>
           {Movies[0] &&
            <MainImage 
                image={`${IMAGE_URL}${Movies[0].backdrop_path}`}
                title={Movies[0].name || Movies[0].title || Movies[0].original_name || Movies[0].original_title}
                summary={Movies[0].overview}/>
           }
           <div className='card-container'>
               <h2>Movies By Latest</h2>
               {Movies[0] &&
                Movies.map((movie, index) => {
                    return (
                        <Card 
                            key={movie.id+new Date().toString()}
                            image={`${IMAGE_URL}${movie.poster_path}`}
                            title={movie.name || movie.title || movie.original_name || movie.original_title} />
                    );
                })
               }
           </div>
           
           <div className='load-button'>
               <button onClick={handleClick} ref={callBackForLoadingMore}>Load More</button>
           </div>
           
        </div>
    );
};

export default LandingPage;