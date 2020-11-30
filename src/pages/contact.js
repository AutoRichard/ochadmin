import React, { Component } from 'react';
import Header from './../include/header'
import Aside from './../include/sidebar'

import { listById, listContact } from './../api/api-contact';
import moment from 'moment'

import auth from './../auth/auth-helper';
//import $ from 'jquery'




class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            email: this.props.email,
            data: [
                this.props.data
            ],
            created: this.props.created,
            index: this.props.index
        }
    }

    viewC = () => {
        this.props._viewContact(this.props.data._id)
    }


    render() {
        return (
            <tr ng-repeat="employee in employees">
                <td>{this.state.index}</td>
                <td>{this.state.name}</td>
                <td>{this.state.email}</td>
                <td>{moment(this.state.created).fromNow()}</td>
                <td><a href="#unique-data" onClick={this.viewC} className="btn btn-primary">View Message</a></td>
            </tr>
        );
    }
}

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            contact: [],
            view: false,
        }
    }


    readContact = () => {

        if (auth.isAuthenticated()) {
            listContact().then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    this.setState({
                        contact: data,
                    })
                }
            });
        }
    }

    viewContact = (id) => {
        this.setState({
            _id: id, view: true
        });
    }

    componentDidMount() {
        this.readContact();
    }

    closeContactPanel = () => {
        this.setState({
            view: false
        })
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
                            <h2>MANAGE CONTACTS</h2>
                        </div>
                        


                        <div className="card">
                            <div className="header">
                                <h2 >CONTACTS</h2>

                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover dataTable js-exportable" ng-init="getAllEmployees()">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Created</th>
                                                <th>Operation</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.contact.map((el, i) =>
                                                <Messages
                                                    name={el.name}
                                                    email={el.email}
                                                    created={el.created}
                                                    _id={el._id}
                                                    data={el}
                                                    index={i + 1}
                                                    _viewContact={this.viewContact}
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
                    this.state.view == true ? (< Message
                        _id={this.state._id}
                        _closeContactPanel={this.closeContactPanel}
                    />) : ''
                }


            </div>
        );
    }
}

class Message extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            contactData: {},
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
            listById(id).then((data) => {
                if (data.error) {
                    alert(data.error)
                    this.setState({ contactData: { ...data }, loading: true })
                } else {
                    this.setState({ contactData: { ...data }, loading: true })
                    
                }
            })
        }
    }

    closePanel = () => {
        this.props._closeContactPanel();
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
                                    <b>Name</b> : <span>{this.state.contactData.name}</span><br />
                                    <b>Email</b> : <span>{this.state.contactData.email}</span><br />
                                    <b>Phone Number</b> : <span>{this.state.contactData.phoneNumber}</span><br />
                                    <b>Sent</b> : <span>{moment(this.state.contactData.created).fromNow()}</span><br />
                                    <b>Message</b> :<br />
                                    <span>{this.state.contactData.text}</span><br /><br />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact