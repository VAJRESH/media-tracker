import { useState, useEffect } from 'react';
import { fetchData, getFullUrl } from '../common-functions/functions';

function useFetchCardDetails(media, id){    
    const [mediaDetails, setMediaDetails] = useState();
    
    // saves tv series data in state
    useEffect(() => {
        fetchData(
            getFullUrl(`${media}/${id}`, 1),
            setMediaDetails,
            mediaDetails
        );
    }, []);

    return mediaDetails;
}

export default useFetchCardDetails;