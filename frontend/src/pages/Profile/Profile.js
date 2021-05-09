import React from 'react';
import { Redirect } from 'react-router';

import useGetUserDetails from './Logic/useTrackedData';
import './Profile.css'

const Loading = React.lazy(() => import('../../component/Preloader/Loading'));
const ProfileDetails = React.lazy(() => import('../../component/ProfileInfo/ProfileDetails'));
const SeriesTab = React.lazy(() => import('../../component/ProfileInfo/Tabs/SeriesTab'));
const MoviesTab = React.lazy(() => import('../../component/ProfileInfo/Tabs/MoviesTab'));
const ErrorPage = React.lazy(() => import('../../component/ErrorBox/ErrorPage'));
const WatchLaterTab = React.lazy(() => import('../../component/ProfileInfo/Tabs/WatchLaterTab'));
const TabButtons = React.lazy(() => import('../../component/ProfileInfo/Tabs/TabButtons'));

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
