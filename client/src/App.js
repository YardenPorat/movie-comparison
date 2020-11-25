import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';
import AddMovie from './components/AddMovie';
import CompareMovies from './components/CompareMovies';
import NavBar from './components/NavBar';

const links = [
    { to: '/admin', text: 'Add Movie' },
    { to: '/public', text: 'Compare Movies' },
];

function App() {
    return (
        <BrowserRouter>
            <div className='container'>
                <NavBar
                    mainLink={{ to: '/', text: 'Movie Comparison LTD' }}
                    links={links}
                />
                <Route path='/' exact component={CompareMovies} />
                <Route path='/admin' component={AddMovie} />
                <Route path='/public' component={CompareMovies} />
            </div>
        </BrowserRouter>
    );
}

export default App;
