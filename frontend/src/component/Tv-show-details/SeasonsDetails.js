import React from 'react';

import lastEpisodeInfo from './LastEpisodeInfo/lastEpisodeInfo';
import { getAverageRunTime } from './helper';

const SeasonsDetails = (props) => {
    const { seriesData: TvInfo, IsAnime } = props;
    let latestEpisode = lastEpisodeInfo(TvInfo);

    return (
        <>
            <article>
                <h2 className='section-heading'>{IsAnime? 'Anime': 'Show'} Overview</h2>
                {TvInfo.overview}
            </article>
            <article>
                <p>
                    <strong>Status: </strong> 
                    {TvInfo.status}
                </p>
                <p>
                    <strong>First Aired On: </strong> 
                    {TvInfo.first_air_date}
                </p>
                {
                    TvInfo.tagline === ''? null: 
                    <p>
                        <strong>Tagline: </strong> 
                        {TvInfo.tagline}
                    </p>
                }
                <p>
                    <strong>Episode Run Time(Avg): </strong>
                    {getAverageRunTime(TvInfo.episode_run_time) + ' Minutes'}
                </p>
                <p>
                    <strong>Total Seasons: </strong>
                    {TvInfo.number_of_seasons}
                </p>
                <p>
                    <strong>Total Episodes Count: </strong>
                    {TvInfo.number_of_episodes}
                </p>
                {latestEpisode}
                {/* // TODO convert ISO language code to full form (en => english) */}
                {/* <p>{TvInfo.original_language}</p> */}
            </article>
        </>
    )
}

export default SeasonsDetails;
