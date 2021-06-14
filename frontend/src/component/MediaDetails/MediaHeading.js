import React from 'react';
import './MediaHeading.css';

// displays movie or tv shows name and genres on media page
const MediaHeadingWithGenre = props => {
    const mediaInfo = props.media;

    return (
        <section>
            <h1 className='movie-title'>
                {
                    mediaInfo.name || mediaInfo.title ||
                    mediaInfo.original_name ||
                    mediaInfo.original_title
                }
            </h1>
            {
                mediaInfo.genres.map(genre => {
                    return (
                        <span className='genres' key={genre.id}>
                            {genre.name}
                        </span>
                    )
                })
            }
        </section>
    )
}

export default MediaHeadingWithGenre;