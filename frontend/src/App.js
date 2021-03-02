import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './index.css';

import Navbar from './component/Navbar/Navbar';
import LandingPage from './component/LandingPage/LandingPage';
import Register from './component/Register-Login/Register';
import MovieDetails from './component/Details/MovieDetails';
import TvShowDetails from './component/Details/TvShowDetails'


function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={LandingPage} />
      <Route path="/user/register" component={Register} />
      <Route path="/movie/:id" component={MovieDetails} />
      <Route path="/tv/:id" component={TvShowDetails} />
    </Router>
  );
}

export default App;