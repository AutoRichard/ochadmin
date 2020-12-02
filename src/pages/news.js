import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'

import moment from 'moment'

import { listById, listNews, remove } from './../api/api-news';


class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.title,
            text: this.props.text,
            mediaLink: this.props.mediaLink,
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
                <td>{this.state.title}</td>
                <td>{this.state.text}</td>
                <td>{this.state.mediaLink}</td>
                <td>{moment(this.state.created).fromNow()}</td>
                <td><a href="#unique-data" onClick={this.viewNews} className="btn btn-primary">View News</a></td>
            </tr>
        );
    }
}

class News extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            news: [],
            view: false,
        }


    }

    readNews = () => {

        if (auth.isAuthenticated()) {
            listNews().then((data) => {
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
        this.readNews();
    }

    _viewNewsParent = (id) => {
        this.setState({
            _id: id, view: true
        });
    }

    closeUserPanel = () => {
        this.setState({
            view: false
        })
    }

    reloadP = () => {
        this.readNews()
        this.setState({
            view: false
        })
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
                                                <th>Content</th>
                                                <th>News Link</th>
                                                <th>Created at</th>
                                                <th>Operation</th>
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
                                                    title={el.title}
                                                    text={el.text}
                                                    mediaLink={el.mediaLink}
                                                    _id={el._id}
                                                    viewNewsParent={this._viewNewsParent}
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
                    this.state.view == true ? (< _News
                        _id={this.state._id}
                        _closeNewsPanel={this.closeNewsPanel}
                        reloadParent={this.reloadP}
                    />) : ''
                }
            </div>
        );
    }
}


class _News extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            newsData: {},
            loading: true
        }


    }

    componentDidUpdate(prevProps) {
        if (this.props._id !== this.state._id) {
            this.setState({ _id: this.props._id })

            this.readNews(this.props._id)
        }
    }

    readNews = (id) => {
        if (auth.isAuthenticated() && this.state.loading === true) {
            listById(id).then((data) => {
                if (data.error) {
                    alert(data.error)
                    this.setState({ newsData: { ...data }, loading: true })
                } else {
                    this.setState({ newsData: { ...data }, loading: true })

                    console.log(data)
                }
            })
        }
    }

    closePanel = () => {
        this.props._closeNewsPanel();
    }


    delete = () => {
        if (auth.isAuthenticated()) {
            const jwt = auth.isAuthenticated();
            const token = jwt.token;

            remove({
                newsId: this.state._id
            }, {
                t: token
            }).then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {

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
                    <div className="row col-md-6 col-lg-6 col-sm-6">
                        <div className="signup-box">
                            <div className="card">
                                <div className="body">
                                    <span><img src={'https://ochback.herokuapp.com/api/newsPhoto/' + this.state.newsData._id} style={{ width: '100%', height: '300px' }} /></span>
                                    <b>Title</b> : <span>{this.state.newsData.title}</span><br />
                                    <b>Link</b> : <a target="_blank" href={this.state.newsData.mediaLink} className="btn btn-primary">View Link</a><br />
                                    <b>Joined</b> : <span>{moment(this.state.newsData.created).fromNow()}</span><br />
                                    <b>Content</b> :<br />
                                    <span>{this.state.newsData.text}</span><br /><br />


                                    <a onClick={this.delete} className="btn btn-warning">Delete News</a>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default News