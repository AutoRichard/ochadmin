import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'

import moment from 'moment'
import { listSession } from './../api/api-session';






class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.title,
            data: this.props.data,
            created: this.props.created,
            index: this.props.index
        }
    }

    viewSession = () => {
        window.location = '/joinsession/'+this.state.data._id
    }


    render() {
        return (
            <tr ng-repeat="employee in employees">
                <td>{this.state.index}</td>
                <td>{this.state.title}</td>
                <td>{moment(this.state.data.start).format("YYYY-MM-DD HH:mm")}</td>
                <td>{this.state.data.link}</td>
                <td>{this.state.data.limit}</td>
                <td>{this.state.data.duration}</td>
                <td>{this.state.data.join}</td>
                <td>{this.state.data.pricing}</td>
                <td>{moment(parseInt(this.state.data.created_date)).fromNow()}</td>
                <td><a href="#unique-data" onClick={this.viewSession} className="btn btn-primary">View Session</a></td>
            </tr>
        );
    }
}

class Session extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Session: []
        }


    }

    readSession = () => {

        if (auth.isAuthenticated()) {
            listSession().then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    this.setState({
                        Session: data,
                    })
                }
            });
        }
    }

    componentDidMount() {
        this.readSession();
    }


    render() {
        return (
            <div>
                <Header />
                <Aside />

                <section className="content">
                    <div className="container-fluid">
                        <div className="block-header">
                            <h2>MANAGE SESSION</h2>
                        </div>


                        <div className="card">
                            <div className="header">

                                <div className="row">
                                    <h2>SESSION</h2> <a href="/newsession" className="btn btn-primary">ADD SESSION</a>
                                </div>

                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover dataTable js-exportable" ng-init="getAllEmployees()">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Title</th>
                                                <th>Start</th>
                                                <th>Link</th>
                                                <th>Limit</th>
                                                <th>Duartion</th>
                                                <th>Join</th>
                                                <th>Pricing</th>
                                                <th>Created at</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.Session.map((el, i) =>
                                                <Content
                                                    created={el.created_date}
                                                    data={el}
                                                    index={i + 1}
                                                    key={el._id}
                                                    title={el.title}
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
            </div >
        );
    }
}


export default Session