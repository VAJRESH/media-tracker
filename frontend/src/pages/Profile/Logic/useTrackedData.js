import { useRef, useState } from "react";
import API from "../../../common-functions/apiEndpoints";
import { useFetchData } from "../../../common-functions/functions";

function useGetUserDetails(userId){
    const [displayTab, setDisplayTab] = useState('Tv Series');
    const totalTimeSpend = useRef({});
    
    const [listError, listLoading, userTrackedList] = useFetchData(`${API.trackList.list}/${userId}`);
    const [wishListError, wishListLoading, userWishList] = useFetchData(`${API.wishList.get}/${userId}`);

    let tvSeries, anime, movies, isError, wishList;
    
    if(listError || wishListError){
        isError = true;
    }
    
    // sorting the list based on status in descending alphabetical order, as i wanted to keep Ended at end
    if(!listLoading){
        tvSeries = userTrackedList.tv_series_tracked.sort(sortByStatus);
        anime = userTrackedList.anime_tracked.sort(sortByStatus);
        movies = userTrackedList.movies_tracked.sort(sortByCollection);

        totalTimeSpend.current['Tv Series'] = tvSeries.reduce(reduceToTotalWatchTime, 0);
        totalTimeSpend.current['Anime'] = anime.reduce(reduceToTotalWatchTime, 0);
        totalTimeSpend.current['Movies'] = movies.reduce(reduceToTotalWatchTime, 0);

        console.log(totalTimeSpend);
    }

    if(!wishListLoading){
        wishList = userWishList.wish_list.sort(sortByMediaType);
        
    }

    function showTab(activeTab = 0){
        let tabs = ['Tv Series', 'Anime', 'Movies', 'Watch Later'];

        setDisplayTab(tabs[activeTab]);
    }

    return [
        totalTimeSpend.current, isError,
        tvSeries, anime, movies, wishList,
        displayTab, showTab
    ];
}

function sortByStatus(series1, series2){
    return ( -series1.status.localeCompare(series2.status) );
}

function sortByCollection(movie1, movie2){
    if(!(movie1.collection_details[0])) return -1;
    if(!(movie2.collection_details[0])) return -1;

    return ( movie1.collection_details[0].name.localeCompare(movie2.collection_details[0].name) )
}

function sortByMediaType(media1, media2){
    return media1.media_type.localeCompare(media2.media_type);
}

function reduceToTotalWatchTime(totalWatchTime, series) {
    return totalWatchTime += series.watched_time; 
}

export default useGetUserDetails;
