import React, { Component } from 'react';
import Header from './../include/header'
import Aside from './../include/sidebar'

import { list, read, update } from './../api/api-users';
import momemt from 'moment'
import swal from 'sweetalert';

import auth from './../auth/auth-helper';
import moment from 'moment'
import $ from 'jquery'




class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: this.props.displayName,
            email: this.props.email,
            data: [
                this.props.data
            ],
            created: this.props.created,
            index: this.props.index
        }
    }

    viewUser = () => {
        this.props.viewUserParent(this.props.data._id)
    }


    render() {
        return (
            <tr ng-repeat="employee in employees">
                <td>{this.state.index}</td>
                <td>{this.state.displayName}</td>
                <td>{this.state.email}</td>
                <td>{momemt(this.state.created).fromNow()}</td>
                <td><a href="#unique-data" onClick={this.viewUser} className="btn btn-primary">View User</a></td>
            </tr>
        );
    }
}

class Dashbaord extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            contact: [],
            view: false,
            suspend: 0,
            approve: 0
        }
    }


    readUsers = () => {

        if (auth.isAuthenticated()) {
            list().then((data) => {
                if (data.error) {
                    swal(data.error)
                } else {
                    let suspendC = data.filter(item => item.suspend == true)
                    let approveC = data.filter(item => item.approve == true)
                    this.setState({
                        contact: data,
                        suspend: suspendC.length,
                        approve: approveC.length
                    })
                }
            });
        }
    }

    viewUser = (id) => {
        this.setState({
            _id: id, view: true
        });
    }

    componentDidMount() {
        this.readUsers();
    }

    closeUserPanel = () => {
        this.setState({
            view: false
        })
    }

    reloadP = () => {
        this.readUsers()
    }


    render() {
        /*const contactArea = {
            height: '480px',
            overflow: 'auto'
        }*/
        return (
            <div>
                <Header />
                <Aside />
                <section className="content">
                    <div className="container-fluid">
                        <div className="block-header">
                            <h2>MANAGE USERS</h2>
                        </div>
                        <div className="row clearfix">
                            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                                <div className="info-box bg-light-green hover-expand-effect">
                                    <div className="icon">
                                        <i className="material-icons">person</i>
                                    </div>
                                    <div className="content">
                                        <div className="text">Total User</div>
                                        <b className="number">{this.state.contact.length}</b>
                                        {/*<div style={{visibility: this.state.display}} className="number count-to" id="person" data-from="0" data-to={this.state.contact.length} data-speed="15" data-refresh-interval="20"></div>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                                <div className="info-box bg-orange hover-expand-effect">
                                    <div className="icon">
                                        <i className="material-icons">accessibility</i>
                                    </div>
                                    <div className="content">
                                        <div className="text">Approved User</div>
                                        <b className="number">{this.state.approve}</b>
                                        {/*<div style={{visibility: this.state.display}} className="number count-to" id="person" data-from="0" data-to={this.state.contact.length} data-speed="15" data-refresh-interval="20"></div>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                                <div className="info-box bg-orange hover-expand-effect">
                                    <div className="icon">
                                        <i className="material-icons">block</i>
                                    </div>
                                    <div className="content">
                                        <div className="text">Suspend User</div>
                                        <b className="number">{this.state.suspend}</b>
                                        {/*<div style={{visibility: this.state.display}} className="number count-to" id="person" data-from="0" data-to={this.state.contact.length} data-speed="15" data-refresh-interval="20"></div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="card">
                            <div className="header">
                                <h2 >USERS</h2>

                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover dataTable js-exportable" ng-init="getAllEmployees()">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Joined</th>
                                                <th>Operation</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.contact.map((el, i) =>
                                                <Users
                                                    displayName={el.displayName || el.firstName || el.lastName}
                                                    email={el.email}
                                                    created={el.created}
                                                    data={el}
                                                    index={i + 1}
                                                    viewUserParent={this.viewUser}
                                                    key={el._id}
                                                />
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    this.state.view == true ? (< User
                        _id={this.state._id}
                        _closeUserPanel={this.closeUserPanel}
                        reloadParent={this.reloadP}
                    />) : ''
                }


            </div>
        );
    }
}

class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            userData: {},
            loading: true
        }


    }

    componentDidUpdate(prevProps) {
        if (this.props._id !== this.state._id) {
            this.setState({ _id: this.props._id })

            this.readUser(this.props._id)
        }
    }

    readUser = (id) => {
        if (auth.isAuthenticated() && this.state.loading === true) {
            const jwt = auth.isAuthenticated();
            const token = jwt.token;
            read({
                userId: id
            }, { t: token }).then((data) => {
                if (data.error) {
                    swal(data.error)
                    this.setState({ userData: { ...data }, loading: true })
                } else {
                    this.setState({ userData: { ...data }, loading: true })

                    console.log(this.state.userData)
                }
            })
        }
    }

    closePanel = () => {
        this.props._closeUserPanel();
    }


    updateUser = (data) => {
        if (auth.isAuthenticated()) {
            const jwt = auth.isAuthenticated();
            const token = jwt.token;

            let user;

            if (data === 'approve') {
                user = {
                    approve: true,
                }
            } else if (data === 'suspend') {
                user = {
                    suspend: true,
                }
            } else if (data === 'unsuspend') {
                user = {
                    suspend: false,
                }
            } else if (data === 'disapprove') {
                user = {
                    approve: false,
                }
            }
            update({
                userId: this.state._id
            }, {
                t: token
            }, user).then((data) => {
                if (data.error) {
                    swal(data.error);
                } else {
                    this.readUser(this.state._id)

                    this.reload()
                }
            });

        }
    }

    reload = () => {
        this.props.reloadParent()
    }


    render() {

        return (
            <section className="content" id="unique-data">
                <div className="container-fluid">
                    <div className="block-header">
                        <button id="hide_plantation" onClick={this.closePanel} className="btn btn-primary btn-lg waves-effect">Close</button>
                    </div>
                    <div className="row col-md-9">
                        <div className="signup-box">
                            <div className="card">
                                <div className="body">
                                    <span><img src={'https://ochbackend.herokuapp.com/api/usersPhoto/' + this.state.userData._id} style={{ width: '100%', height: '300px' }} /></span>
                                    <b>Display Name</b> : <span>{this.state.userData.displayName}</span><br />
                                    <b>Account Status</b> : <span>{this.state.userData.suspend == true ? 'Account Suspended' : 'Account Active'}</span><br />
                                    <b>Approve Status</b> : <span>{this.state.userData.approve == true ? 'Active' : 'Inactive'}</span><br />
                                    <b>FullName</b> : <span>{this.state.userData.firstName} {this.state.userData.lastName}</span><br />
                                    <b>Address</b> : <span>{this.state.userData.address}</span><br />
                                    <b>City</b> : <span>{this.state.userData.city}</span><br />
                                    <b>Country</b> : <span>{this.state.userData.country}</span><br /><br />
                                    <b>Zipcode</b> : <span>{this.state.userData.zipcode}</span><br />
                                    <b>Phone Number</b> : <span>{this.state.userData.phoneNumber}</span><br />
                                    <b>Link</b> : <a target="_blank" href={this.state.userData.link1} className="btn btn-primary">View Link</a><br />
                                    <b>Link</b> : <a target="_blank" href={this.state.userData.link2} className="btn btn-success">View Link</a><br />
                                    <b>Joined</b> : <span>{moment(this.state.userData.created).fromNow()}</span><br />
                                    <b>About</b> :<br />
                                    <span>{this.state.userData.about}</span><br /><br />


                                    {this.state.userData.approve === true ? (<a onClick={this.updateUser.bind(this, 'disapprove')} className="btn btn-warning">Disapprove User</a>) : (<a onClick={this.updateUser.bind(this, 'approve')} className="btn btn-success">Approve User</a>)}&nbsp;&nbsp;&nbsp;
                                    {this.state.userData.suspend === true ? (<a onClick={this.updateUser.bind(this, 'unsuspend')} className="btn btn-primary">Activate Account</a>) : (<a onClick={this.updateUser.bind(this, 'suspend')} className="btn btn-danger">Suspend Account</a>)}



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashbaord