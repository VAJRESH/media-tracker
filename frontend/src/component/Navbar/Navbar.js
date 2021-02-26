import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <div className='navbar-container'>
                <h1>TV Tracker</h1>
                <section>
                    <button>Register</button>
                    <button>Login</button>
                </section>
            </div>
        );
    }
};
