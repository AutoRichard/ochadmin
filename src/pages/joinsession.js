import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'

import moment from 'moment'
import { listJSession } from './../api/api-session';






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


    render() {
        return (
            <tr ng-repeat="employee in employees">
                <td>{this.state.index}</td>
                <td>{this.state.data.session_id.title}</td>
                <td>{this.state.data.user_id.firstName}</td>
                <td>{this.state.data.session_id.link}</td>
                <td>{moment(parseInt(this.state.data.created_date)).fromNow()}</td>
            </tr>
        );
    }
}

class JoinSession extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Session: []
        }


    }

    readSession = () => {
        const session_id = this.props.match.params.id

        let _data = {
            session_id: session_id
        }


        if (auth.isAuthenticated()) {
            listJSession(_data).then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    this.setState({
                        Session: data,
                    })

                    console.log(data)
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
                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover dataTable js-exportable" ng-init="getAllEmployees()">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Title</th>
                                                <th>User</th>
                                                <th>Link</th>
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


export default JoinSession