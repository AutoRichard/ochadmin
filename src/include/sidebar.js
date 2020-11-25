import React, { Component } from 'react';

import ProfileImage from './../images/user.png'

class Aside extends Component {
    render() {
        return (
            <section>
                <aside id="leftsidebar" className="sidebar">
                    <div className="user-info">
                        <div className="image">
                            <img src={ProfileImage} width="48" height="48" alt="User" />
                        </div>
                        <div className="info-container">
                            <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></div>
                            <div className="email"> </div>
                            <div className="btn-group user-helper-dropdown">
                                <i className="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>
                                <ul className="dropdown-menu pull-right">
                                    <li><a href="/profile"><i className="material-icons">person</i>Profile</a></li>
                                    <li role="separator" className="divider"></li>

                                    <li role="separator" className="divider"></li>
                                    <li><a><i className="material-icons">input</i>Sign Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="menu">
                        <ul className="list">
                            <li className="header">MAIN NAVIGATION</li>
                            <li className="active">
                                <a href="/profile">
                                    <i className="material-icons">person</i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li className="active">
                                <a href="/dashboard">
                                    <i className="material-icons">bookmark</i>
                                    <span>Manage User</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

            </section>

        );
    }
}

export default Aside