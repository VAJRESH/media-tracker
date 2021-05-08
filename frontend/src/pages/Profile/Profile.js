import React from 'react';

import Loading from '../../component/Preloader/Loading';
import useGetUserDetails from './Logic/useTrackedData';
import ProfileDetails from '../../component/ProfileInfo/ProfileDetails';
import SeriesTab from '../../component/ProfileInfo/Tabs/SeriesTab';
import MoviesTab from '../../component/ProfileInfo/Tabs/MoviesTab';
import './Profile.css'
import ErrorPage from '../../component/ErrorBox/ErrorPage';
import { Redirect } from 'react-router';
import WatchLaterTab from '../../component/ProfileInfo/Tabs/WatchLaterTab';
import TabButtons from '../../component/ProfileInfo/Tabs/TabButtons';

const Profile = () => {
    // looks for the user id for querying, if not found takes user to landing page
    const userData = {
        id: localStorage.getItem('userId'),
        email: localStorage.getItem('email'),
        name: localStorage.getItem('username')
    }

    const [
        timeSpend, isError,
        tvSeries, anime, movies, wishList,
        displayTab, showTab
    ] = useGetUserDetails(userData.id);

    if(!userData.id) return ( <Redirect to='/home' /> );
    if(isError) return ( <ErrorPage /> );
    
    return (
        <>
            {
                (!tvSeries) ?
                ( <Loading /> ) :
                (
                    <div id='profile-page'>
                        <ProfileDetails name={userData.name} />
                        <TabButtons activeTab={displayTab} showTab={showTab}/>
                        <hr />
                        {
                            displayTab === 'Tv Series' ? (
                                <SeriesTab
                                show={tvSeries}
                                title='Tracked Series'
                                watchMinutes={timeSpend[displayTab]} />
                            ): null
                        }
                        {
                            displayTab === 'Anime' ? (
                                <SeriesTab
                                show={anime}
                                title='Tracked Anime'
                                watchMinutes={timeSpend[displayTab]} />
                            ): null
                        }
                        {
                            displayTab === 'Movies' ? (
                                <MoviesTab
                                movies={movies}
                                watchMinutes={timeSpend[displayTab]} />
                            ): null
                        }
                        {
                            displayTab === 'Watch Later' ? (
                                <WatchLaterTab media={wishList} />
                            ): null
                        }
                    </div>
                )
            }
        </>
    );
}

export default Profile;
