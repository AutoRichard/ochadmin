import React, { Component } from 'react';
import { signin } from './../auth/api-auth';
import auth from './../auth/auth-helper';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameValidate: '',
            passwordValidate: '',
            loading: false
        };
    }


    componentDidMount() {
        document.body.classList.add('login-page');
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        event.target.name == 'username' ? this.setState({ usernameValidate: '' }) : '';
        event.target.name == 'password' ? this.setState({ passwordValidate: '' }) : '';
    }

    signIn = () => {
        this.setState({ loading: true });
        if (this.state.username === '' || this.state.password === '') {
            this.setState({ loading: false });
            this.state.username === '' ? this.setState({ usernameValidate: 'Username is required' }) : this.setState({ usernameValidate: '' });
            this.state.password === '' ? this.setState({ passwordValidate: 'Password is required' }) : this.setState({ passwordValidate: '' });

        } else {
            const user = {
                username: this.state.username,
                password: this.state.password
            }

            signin(user).then((data) => {
                if (data.error) {
                    //this.setState({ error: data.error })
                    this.setState({ loading: false });
                    alert(data.error)
                    console.log(data.error)
                } else {
                    auth.authenticate(data, () => {
                        window.location = '/'
                    })
                }
            });
        }
    }

    closeLogin = () => {
        let close = document.getElementById('closeLogin');
        close.click();
    }


    render() { 
        return (
            <div className="login-box">
                <div className="logo">
                    <a href="javascript:void(0)">Admin</a>
                    <small>Admininistrator Section</small>
                </div>
                <div className="card">
                    <div className="body">

                        <div className="msg">Sign in to start your session</div>
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="material-icons">person</i>
                            </span>
                            <div className="form-line">
                                <input type="username" onChange={this.onChange} className="form-control" name="username" placeholder="Username" />

                                <span className="help-block">
                                    <strong style={{ color: 'red' }}>{this.state.usernameValidate}</strong>
                                </span>

                            </div>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="material-icons">lock</i>
                            </span>
                            <div className="form-line">
                                <input type="password" onChange={this.onChange} className="form-control" name="password" placeholder="Password" />
                                <span className="help-block">
                                    <strong style={{ color: 'red' }}>{this.state.passwordValidate}</strong>
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-8 p-t-5">
                                <input type="checkbox" name="remember" id="rememberme" className="filled-in chk-col-pink" />
                                <label htmlFor="rememberme">Remember Me</label>
                            </div>
                            <div className="col-xs-4">
                                <button className="btn btn-block bg-pink waves-effect" onClick={this.signIn} type="submit">SIGN IN</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login