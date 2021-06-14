import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import { saveWatchedMediaIds, saveWishMediaIds } from './common-functions/functions';
import './index.css';

const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));
const TvSeries = lazy(() => import('./pages/TvShowPage/TvSeries'));
const Movies = lazy(() => import('./pages/Movies/Movies'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Search = lazy(() => import('./pages/Search/Search'));
const TvShowDetails = lazy(() => import('./pages/TvSeriesDetails/TvShowDetails'));
const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'));
const Navbar = lazy(() => import('./component/Navbar/Navbar'));
const MobileNav = lazy(() => import('./component/Navbar/MobileNav/MobileNav'));
const Register = lazy(() => import('./pages/Register-Login/Register'));
const Login = lazy(() => import('./pages/Register-Login/Login'));
const ErrorPage = lazy(() => import('./component/ErrorBox/ErrorPage'));


// profile page is the default page where user will be redirected if logged in
// or else user will be again redirected from profile page to home page
function App() {
  saveWatchedMediaIds('app');
  saveWishMediaIds();

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/home" component={ LandingPage } />
        <Route exact path="/movies" component={ Movies } />
        <Route exact path="/tv-series" component={ TvSeries } />
        <Route exact path="/search" component={ Search } />
        
        <Route exact path="/movie/:id" component={ MovieDetails } />
        <Route exact path="/tv/:id" component={ TvShowDetails } />

        <Route exact path="/user/register" component={ Register } />
        <Route exact path="/user/login" component={ Login } />
        <Route exact path={['/', "/profile"]} component={ Profile } />
        
        <Route component={ ErrorPage } />
      </Switch>
      <MobileNav />
    </Router>
  );
}

export default App;