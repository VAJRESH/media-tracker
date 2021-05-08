import React from 'react';

import CardContainer from '../../component/Display-Card/CardContainer';
import Loading from '../../component/Preloader/Loading';
import ErrorPage from '../../component/ErrorBox/ErrorPage';
import useManageSearch from './Logic/useManageSearch';
import AutoSuggestionSearchBar from '../../component/Search/AutoSuggestionSearchBar';
import './Search.css';
import NoData from '../../component/NoData/NoData';


//TODO add autocomplete by using the search/keyword api endpoint
const Search = () => {
    const [
        mediaType, handleSelect,
        query, setQuery,
        responseForQuery, metaData, isDataEmpty,
        callBackForLoadingMore, handleClick
    ] = useManageSearch();

    return (
        <div>
            <section className='search-container'>
                <AutoSuggestionSearchBar receiveQuery={ (q) => setQuery(q) } />
                <select onChange={handleSelect} value={mediaType}>
                    <option value='movie'>Movies</option>
                    <option value='tv'>Tv Shows</option>
                </select>
            </section>
            {
                responseForQuery &&
                responseForQuery.isError &&
                <ErrorPage />
            }
            {
                isDataEmpty &&
                <NoData />
            }
            <section style={{ zIndex: 0, marginTop: "10px" }}>
                {
                    responseForQuery && !isDataEmpty &&
                    (
                        responseForQuery.length < 1 ?
                        <Loading /> :
                        (
                            <>
                                {
                                    metaData &&
                                    <p className='query-display'>
                                        <strong>{metaData.total_results}</strong> Results for <strong>{query}</strong>
                                    </p>
                                }
                                <CardContainer
                                movies = {[...responseForQuery]}
                                button = {
                                    metaData && metaData.total_results !== responseForQuery.length ?
                                    {
                                        onClick: handleClick,
                                        ref: callBackForLoadingMore,
                                        text: 'Load More'
                                    } : 
                                    null
                                }
                                />
                            </>
                        )
                    )
                }
            </section>
        </div>
    );
}

export default Search;
