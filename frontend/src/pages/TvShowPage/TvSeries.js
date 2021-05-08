import React from 'react';

import MediaPageWrapper from '../../component/MediaPage/MediaPageWrapper';

const TvSeries = () => {    
    const urlDetails = { defaultSort: 'popularity.desc', urlPath: 'discover/tv' };
    
    const sortOptions = ['Popularity', 'First Air Date', 'Vote Average'];

    return (
        <MediaPageWrapper
        genreUrlPath='genre/tv/list'
        sortOptions={ sortOptions }
        urlDetails={ urlDetails }
        heading='Tv Shows And Anime'
        />
    );
}

export default TvSeries;
