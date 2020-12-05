import React, { Component } from 'react';
import Header from './../include/header'
import Aside from './../include/sidebar'
import { read, update } from './../api/api-user';

import auth from './../auth/auth-helper';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            displayNameValidation: '',
            username: '',
            usernameValidation: '',
            password: '',
            passwordValidation: ''
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
                    this.setState({ 'displayName': data.displayName, 'username': data.username });
                }
            });
        }


    }

    componentDidMount() {
        this.readUser();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        event.target.name == 'username' ? this.setState({ usernameValidation: '' }) : '';
        event.target.name == 'password' ? this.setState({ passwordValidation: '' }) : '';
        event.target.name == 'displayName' ? this.setState({ displayNameValidation: '' }) : '';

    }

    updateAdmin = () => {
        //this.setState({ loading: true });
        if (this.state.username === '' || this.state.displayName === '') {

            
            //this.setState({ loading: false });
            this.state.username === '' ? this.setState({ usernameValidation: 'Username is required' }) : this.setState({ usernameValidation: '' });
            //this.state.password === '' ? this.setState({ passwordValidation: 'Password is required' }) : this.setState({ passwordValidation: '' });
            this.state.displayNameValidation === '' ? this.setState({ displayNameValidation: 'Display Name is required' }) : this.setState({ displayNameValidation: '' });

            

        } else {

            if (auth.isAuthenticated()) {

                const jwt = auth.isAuthenticated();
                const userId = jwt.user._id;
                const token = jwt.token;

                let user;

                if (this.state.password === '') {
                    user = {
                        username: this.state.username,
                        displayName: this.state.displayName
                    }
                } else {
                    user = {
                        username: this.state.username,
                        password: this.state.password,
                        displayName: this.state.displayName
                    }
                }
                

                update({
                    userId: userId
                }, {
                    t: token
                }, user).then((data) => {
                    if (data.error) {
                        //this.setState({ error: data.error })
                        //this.setState({ loading: false });
                        console.log(data)
                        alert(data.error)
                    } else {
                        window.location = '/profile'
                    }
                });
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Aside />
                <section className="content">
                    <div className="container-fluid">
                        <h1 style={{ fontWeight: "lighter" }}>Edit Profile</h1>
                        <div className="row col-md-9">
                            <div className="signup-box">
                                <div className="card">
                                    <div className="body">

                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="text" className="form-control" onChange={this.onChange} value={this.state.displayName} name="displayName" placeholder="Enter Name" />
                                                <span className="help-block">
                                                    <strong style={{ color: 'red' }}>{this.state.displayNameValidation}</strong>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="text" className="form-control" onChange={this.onChange} value={this.state.username} name="username" placeholder="Enter Username" />
                                                <span className="help-block">
                                                    <strong style={{ color: 'red' }}>{this.state.usernameValidation}</strong>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-sort-numeric-up"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="password" className="form-control" onChange={this.onChange} value={this.state.password} name="password" placeholder="Enter new password(optional)" />
                                                <span className="help-block">
                                                    <strong style={{ color: 'red' }}>{this.state.passwordValidation}</strong>
                                                </span>
                                            </div>
                                        </div>


                                        <button onClick={this.updateAdmin} className="btn btn-block btn-lg bg-pink waves-effect">EDIT PROFILE<i className="fa fa-add"></i></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}

export default EditProfile