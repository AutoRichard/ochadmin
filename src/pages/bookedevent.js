import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'

import moment from 'moment'

import { listEvent } from './../api/api-instructor';
import { read } from './../api/api-users'
import swal from 'sweetalert'


class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data,
            created: this.props.created,
            index: this.props.index
        }
    }

    readUser = () => {

        let jwt, userId;

        if (auth.isAuthenticated()) {
            jwt = auth.isAuthenticated();
            userId = jwt.user._id;
            read({
                userId: this.state.data.event.user
            }).then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    swal('Name: ' + data.displayName + '\nEmail: ' + data.email)
                }
            });
        }


    }


    render() {
        return (
            <tr ng-repeat="employee in employees">
                <td>{this.state.index}</td>
                <td>{this.state.data.event.title}</td>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.pricing}</td>
                <td>{moment(this.state.data.event.start).format("YYYY-MM-DD HH:mm")}</td>
                <td><a href={this.state.data.event.link} className="btn btn-primary" target="_blank">Zoom link</a></td>
                <td><a onClick={this.readUser} className="btn btn-success">View User</a></td>
            </tr>
        );
    }
}

class BookedEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: [],
        }


    }

    readEvent = () => {

        if (auth.isAuthenticated()) {
            listEvent().then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {

                    let _data = data.filter(v => v.event.booked == true)
                    this.setState({
                        event: _data
                    })
                }
            });
        }
    }

    componentDidMount() {
        this.readEvent();
    }


    render() {
        return (
            <div>
                <Header />
                <Aside />

                <section className="content">
                    <div className="container-fluid">
                        <div className="block-header">
                            <h2>MANAGE NEWS</h2>
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
                                                <th>Title</th>
                                                <th>Instructor</th>
                                                <th>Amount Charged</th>
                                                <th>Event Start Time</th>
                                                <th>Event Link</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.event.map((el, i) =>
                                                <Content
                                                    created={el.created}
                                                    data={el}
                                                    index={i + 1}
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
            </div>
        );
    }
}


export default BookedEvent