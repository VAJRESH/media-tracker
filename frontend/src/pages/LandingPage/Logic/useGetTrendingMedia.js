import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchData, getFullUrl } from '../../../common-functions/functions';

function useGetTrendingMedia(){
    const [trendingMedia, setTrendingMedia] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        fetchData(getFullUrl('trending/all/day', pageNumber), setTrendingMedia, trendingMedia);

    }, [pageNumber]);

    
    // infinite scrolling: Fetches more movies when load more button is rendered and visible on screen
    const observer = useRef(null);
    const callBackForLoadingMore = useCallback(node => {
        if(observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) setPageNumber((pageNumber) => ++pageNumber);

        })
        
        if(node) observer.current.observe(node);
    }, []);

    // click functionality which fetch more movies
    const loadNextPage = () => {
        
        setPageNumber((pageNumber) => (pageNumber += 1));
    }
    return [
        trendingMedia, callBackForLoadingMore, loadNextPage
    ];
}

export default useGetTrendingMedia;
