import React, { Component } from 'react';
import { signout } from './../auth/api-auth';
import auth from './../auth/auth-helper';
import { read } from './../api/api-user';

class Header extends Component {


    componentDidMount() {

        let jwt, userId;

        if (auth.isAuthenticated()) {
            jwt = auth.isAuthenticated();
            userId = jwt.user._id;
            read({
                userId: userId
            }).then((data) => {
                if (data.error) {
                    this.signout()
                }
            });
        }



    }


    signout = () => {
        signout().then((data) => {
            if (data.error) {
                alert(data.error)
            } else {

                auth.signout(() => window.location = '/')
            }
        });
    }


    render() {
        return (
            <div>
                <div className="page-loader-wrapper">
                    <div className="loader">
                        <div className="preloader">
                            <div className="spinner-layer pl-red">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                        <p>Please wait...</p>
                    </div>
                </div>
                <div className="overlay"></div>
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="javascript:void(0)" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>
                            <a href="javascript:void(0)" className="bars"></a>
                            <a className="navbar-brand" href="/home">ADMINISTRATOR</a>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="javascript:void(0)" onClick={this.signout}>
                                        <i className="material-icons">input</i>Sign Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}

export default Header