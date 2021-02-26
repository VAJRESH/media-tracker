import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './index.css';

import Navbar from './component/Navbar/Navbar';
import LandingPage from './component/LandingPage/LandingPage';
import Register from './component/register.component';


function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={LandingPage} />
      <Route path="/user/register" component={Register} />
      {/* <Route path="/add" component={AddBirthday} />
      <Route path="/edit/:id" component={EditBirthday} />
      <Route path="/user/login" component={Login} /> */}
    </Router>
  );
}

export default App;