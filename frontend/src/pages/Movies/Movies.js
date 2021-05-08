import React from 'react';

import MediaPageWrapper from '../../component/MediaPage/MediaPageWrapper';

const Movies = () => {
    const urlDetails = { defaultSort: 'popularity.desc', urlPath: 'discover/movie' };
    
    const sortOptions = [
        'Popularity', 'Revenue', 'Release Date', 'Primary Release Date',
        'Original Title', 'Vote Average', 'Vote Count'
    ];

    return (
        <MediaPageWrapper
        genreUrlPath='genre/movie/list'
        sortOptions={ sortOptions }
        urlDetails={ urlDetails }
        heading='Movies'
        />
    )
}

export default Movies;
