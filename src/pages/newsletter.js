import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'

import moment from 'moment'

import { listNewsletter } from './../api/api-newsletter';


class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: this.props.email,
            data: this.props.data,
            created: this.props.created,
            index: this.props.index
        }
    }

    viewNews = () => {
        this.props.viewNewsParent(this.props.data._id)
    }


    render() {
        return (
            <tr ng-repeat="employee in employees">
                <td>{this.state.index}</td>
                <td>{this.state.email}</td>
                <td>{moment(this.state.created).fromNow()}</td>
            </tr>
        );
    }
}

class Newsletter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            news: [],
        }


    }

    readNewsletter = () => {

        if (auth.isAuthenticated()) {
            listNewsletter().then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    this.setState({
                        news: data,
                    })
                }
            });
        }
    }

    componentDidMount() {
        this.readNewsletter();
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
                                                <th>Email</th>
                                                <th>Created at</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.news.map((el, i) =>
                                                <Content
                                                    created={el.created}
                                                    data={el}
                                                    index={i + 1}
                                                    key={el._id}
                                                    email={el.email}
                                                    _id={el._id}
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


export default Newsletter