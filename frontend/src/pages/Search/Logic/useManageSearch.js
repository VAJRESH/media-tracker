import { useCallback, useEffect, useRef, useState } from "react";
import { TMDB_API_KEY, BASE_URL } from '../../../config';

import { fetchData } from "../../../common-functions/functions";

function generateSearchUrl(mediaType, query, pageNumber){
    return (
        `${BASE_URL}/search/${mediaType}?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
    );
}

function useManageSearch(){
    const [url, setUrl] = useState('');
    const [query, setQuery] = useState('');
    const [mediaType, setMediaType] = useState('movie');
    const [pageNumber,setPageNumber] = useState(1);
    const [responseForQuery, setResponseForQuery] = useState();
    const [metaData, setMetaData] = useState();
    const [isDataEmpty, setIsDataEmpty] = useState(false);
    const lastQuery = useRef({ input: '', media: 'movie' });

    useEffect(() => {
        if(!url) return;
        if(!responseForQuery) setResponseForQuery([]);

        async function getResponse() {
            const response = await fetchData(url, setResponseForQuery, responseForQuery || []);
            if(response) setMetaData(response);
            console.log(response);
            setIsDataEmpty(response && response.results.length === 0);
        }
        
        getResponse();
    }, [url]);
console.log(pageNumber);
    useEffect(() => {
        console.log(mediaType, lastQuery.current.media);
        if(!query) return;
        if(metaData && (metaData.total_pages !== 0) && (metaData.total_pages < pageNumber)) return;
        if((query !== lastQuery.current.input) || (mediaType !== lastQuery.current.media)){
            setResponseForQuery([]);
            setPageNumber(1);
        }
        setUrl(generateSearchUrl(mediaType, query, pageNumber));
        lastQuery.current.input = query;
        lastQuery.current.media = mediaType;
    }, [query, mediaType, pageNumber]);

    // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
    const observer = useRef(null);
    const callBackForLoadingMore = useCallback((node) => {
        if(observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) setPageNumber((pageNumber) => (pageNumber+1));

        })
        
        if(node) observer.current.observe(node);
    }, []);

    // click functionality which fetch more movies
    const loadNextPage = () => {
        if(metaData && (metaData.total_pages < pageNumber)) return;

        setPageNumber((pageNumber) => (pageNumber += 1));
    }

    function handleSelect(e) {
        setMediaType(e.target.value);
    }

    return [
        mediaType, handleSelect, 
        query, setQuery,
        responseForQuery, metaData, isDataEmpty,
        callBackForLoadingMore, loadNextPage
    ]
}

export default useManageSearch;

















































// import { useEffect, useState, useRef, useCallback } from 'react';

// import { fetchData, getUrl } from '../../../common-functions/functions';

// // variables for dynamic content loading
// let pageNumber = 1;

// function useFetchAllSeries(type){
//     const [TvSeries, setTvSeries] = useState([]);
//     const saveData = useRef({
//         tvSeries: [],
//         type: type || 'popular'
//     });
    
//     // fetch after 1st render or when type changes
//     // the ref is used to re render when similar tv series are clicked
//     // when clicked on similar series card, the url in browser changes but rendering doesn't happens
//     // this is the work around i found
//     useEffect(() => {
//         // resets the saved list to blank and page number to 1
//         saveData.current.tvSeries = [];
//         pageNumber = 1;
//         fetchData(getUrl(pageNumber, `tv/${saveData.current.type}`), setTvSeries, TvSeries);
   
//     }, [saveData.current.type]);
    
//     // save the state so it is not lost when passed in child component
//     // for some reason the state is cleared so this ref is used to store value
//     useEffect(() => {
//         saveData.current.tvSeries = [...saveData.current.tvSeries, ...TvSeries];
//     },[TvSeries]);
    
//     // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
//     const observer = useRef(null);
//     const callBackForLoadingMore = useCallback(node => {
//         if(observer.current) observer.current.disconnect();
        
//         observer.current = new IntersectionObserver(entries => {
//             if(entries[0].isIntersecting){
//                 if(pageNumber !== 1) fetchData(getUrl(pageNumber, `tv/${saveData.current.type}`), setTvSeries, TvSeries);
//                 ++pageNumber;
//             }
//         })
        
//         if(node) observer.current.observe(node);
//     }, []);
    
    
//     // click functionality which fetch more movies
//     const handleClick = () => {
        
//         ++pageNumber;
//         fetchData(getUrl(pageNumber, `tv/${saveData.current.type}`), setTvSeries, TvSeries);
        
//     }
//     const handleSelect = e => {
        
//         saveData.current.type = e.target.value;
//         setTvSeries([]);
        
//     }
    
//     return [
//         [...saveData.current.tvSeries, ...TvSeries],
//         saveData.current.type,
//         handleSelect,
//         handleClick,
//         callBackForLoadingMore
//     ]

// }

// export default useFetchAllSeries;