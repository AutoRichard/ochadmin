import React, { Component } from 'react';
import Header from './../include/header'
import Aside from './../include/sidebar'
import ProfileImage from './../images/user.png'
import { read } from './../api/api-user';

import auth from './../auth/auth-helper';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
        }
    }

    readUser = () => {

        let jwt, userId;

        if (auth.isAuthenticated()) {
            jwt = auth.isAuthenticated();
            userId = jwt.user._id;
            read({
                userId: userId
            }).then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    console.log(data)
                    this.setState({'displayName': data.displayName, 'email': data.email });
                }
            });
        }


    }

    componentDidMount() {
        this.readUser();
    }
    render() {
        return (
            <div>
                <Header />
                <Aside />
                <section className="content" ng-init="getProfile()">
                    <div className="container-fluid">
                        <h1 style={{ fontWeight: "lighter" }}>Profile </h1>
                        <div className="col-xs-12 col-sm-6">
                            <div className="card profile-card">
                                <div className="profile-header">&nbsp;</div>
                                <div className="profile-body">
                                    <div className="image-area">
                                        <img src={ProfileImage} height="100" width="100" alt="AdminBSB - Profile Image" />
                                    </div>
                                    <div className="content-area">
                                        <h3></h3>
                                        <p>Administrator</p>
                                    </div>
                                </div>
                                <div className="profile-footer">
                                    <ul>
                                        <li>
                                            <span>Name</span>
                                            <span>{this.state.displayName}</span>
                                        </li>
                                        <li>
                                            <span>Email</span>
                                            <span>{this.state.email}</span>
                                        </li>

                                    </ul>
                                    <a className="btn btn-primary btn-lg waves-effect btn-block" href="/edit-profile">EDIT</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div >
        );
    }
}

export default Profile