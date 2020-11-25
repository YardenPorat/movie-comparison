import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URLS } from '../consts';
import MovieListItem from './MovieListItem';
import _ from 'lodash';

const CompareMovies = props => {
    const DEFAULT_OPTION = 'Choose sort';
    const [items, setListItems] = useState([]);
    const [config, setConfig] = useState({
        mustLogInAlert: false,
        sortBy: DEFAULT_OPTION,
    });

    useEffect(() => {
        fetchMoviesData();
    }, []);

    const fetchMoviesData = async () => {
        try {
            const res = await axios.get(URLS.getMovies);
            setListItems(() => res.data);
        } catch (err) {
            console.log(`cannot get items`);
        }
    };

    const itemList = () => {
        return Object.keys(items).map((id, i) => (
            <MovieListItem
                updateLikes={updateLikes}
                setAlerts={setConfig}
                item={items[id]}
                key={i}
                i={i}
            ></MovieListItem>
        ));
    };

    const updateLikes = key => {
        const newItems = [...items];
        newItems[key].likesCount++;
        setListItems([...newItems]);
    };

    const sortTable = e => {
        const sortByField = e.target.value;
        const sortedItems = _.orderBy(items, [sortByField], ['desc']);

        setListItems([...sortedItems]);
        setConfig({ ...config, sortBy: sortByField });
    };

    return (
        <div>
            <h3 className='my-3'>Compare Movies</h3>
            <form>
                <div className='form-group d-flex flex-row align-items-center'>
                    <label
                        className='my-1 mr-4'
                        htmlFor='inlineFormCustomSelectPref'
                    >
                        Sort by:
                    </label>
                    <select
                        value={config.sortBy}
                        className='form-control mr-sm-2 my-1 sortby'
                        id='inlineFormCustomSelectPref'
                        onChange={sortTable}
                    >
                        <option>{DEFAULT_OPTION}</option>

                        <option value='movieName'>Movie Name</option>
                        <option value='movieRating'>Rating</option>
                        <option value='creationTime'>Creation Date</option>
                        <option value='likesCount'>Likes</option>
                    </select>
                </div>
            </form>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr></tr>
                </thead>
                <tbody className=''>{itemList()}</tbody>
            </table>
            {config.mustLogInAlert && (
                <div className='fixed-alert'>
                    <div className='alert alert-danger' role='alert'>
                        You must log in to like.
                    </div>
                </div>
            )}
        </div>
    );
};
export default CompareMovies;
