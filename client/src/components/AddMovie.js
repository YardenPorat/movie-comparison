import React, { useState } from 'react';
import axios from 'axios';
import { URLS } from '../consts';
import { withRouter } from 'react-router-dom';

const AddMovie = ({ history }) => {
    const [state, setState] = useState({
        movieName: '',
        movieRating: 0,
        movieUrl: '',
    });
    const [alerts, setAlerts] = useState({
        imdbAlert: false,
        movieNameAlert: false,
        mustLogInAlert: false,
    });

    const onChangeInput = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (isValidInputs(state)) {
            try {
                const res = await axios.post(URLS.CreateMovie, {
                    ...state,
                });
                console.log(`movie added: ${res.data}`);
                history.push('/public');
            } catch (err) {
                console.log(err.response);
                if (err?.response?.status === 401) {
                    setAlerts({ mustLogInAlert: true });
                }
            }
        }
    };

    const isValidInputs = state => {
        const checkName = !state.movieName;
        const checkUrl = !state.movieUrl
            ?.toLowerCase()
            .includes('imdb.com/title');
        setAlerts({
            ...alerts,
            movieNameAlert: checkName,
            imdbAlert: checkUrl,
        });

        return !checkUrl && !checkName;
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='centered-container'>
                    <h3 className='my-5 text-white Add-A-Movie centered-container'>
                        Add a new movie
                    </h3>
                </div>
                <div className='container d-flex flex-row flex-wrap'>
                    <div className='container movie-add-clm'>
                        <div className='form-group m-2'>
                            <label htmlFor='movieName'>Movie Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='movieName'
                                name='movieName'
                                value={state.movieName}
                                onChange={onChangeInput}
                            />

                            {alerts.movieNameAlert && (
                                <div
                                    className='alert alert-danger'
                                    role='alert'
                                >
                                    Please enter a movie name.
                                </div>
                            )}

                            <div className='form-group mt-3'>
                                <label htmlFor='movieRating'>
                                    Movie Rating
                                </label>
                                <div className='range-slider'>
                                    <input
                                        type='range'
                                        min='0'
                                        max='10'
                                        className=' range-slider__range'
                                        id='movieRating'
                                        name='movieRating' //for state {key}
                                        value={state.movieRating}
                                        onChange={onChangeInput}
                                    />
                                    <span className='range-slider__value'>
                                        {state.movieRating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container movie-add-clm'>
                        <div className='form-group m-2'>
                            <label htmlFor='movieUrl'>IMDB Page URL</label>
                            <input
                                type='text'
                                className='form-control'
                                id='movieUrl'
                                name='movieUrl' //for state {key}
                                value={state.movieUrl}
                                onChange={onChangeInput}
                            />

                            {alerts.imdbAlert && (
                                <div
                                    className='alert alert-danger'
                                    role='alert'
                                >
                                    Please enter an IMDB URL.
                                </div>
                            )}
                            <div className='form-group centered-container mt-4'>
                                <input
                                    type='submit'
                                    value='Submit'
                                    className='btn btn-success btn-green-add-movie align-middle'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {alerts.mustLogInAlert && (
                    <div className='alert alert-danger' role='alert'>
                        You must log in to submit.
                    </div>
                )}
            </form>
        </div>
    );
};

export default withRouter(AddMovie);
