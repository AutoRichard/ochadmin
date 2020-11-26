import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'
import { create } from './../api/api-news';

class UploadNews extends Component {

    constructor(props) {
        super(props);


        this.state = {
            title: '',
            text: '',
            mediaLink: '',
            titleValidate: '',
            textValidate: '',
            photo: '',
            photoValidate: ''
        }
    }

    componentDidMount() {
        this.linkData = new FormData()
    }

    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        event.target.name === 'title' ? this.setState({ titleValidate: '' }) : '';
        event.target.name === 'text' ? this.setState({ textValidate: '' }) : '';
    }

    handleChange = (event) => {
        const value = event.target.name === 'photo'
            ? event.target.files[0]
            : event.target.value

        this.linkData.set(event.target.name, value)
        this.setState({ photo: URL.createObjectURL(event.target.files[0]) });
    }

    onSubmit = () => {
        if (this.state.text === '' || this.state.title === '' || this.linkData.get('photo') === null) {
            this.state.text === '' ? (this.setState({ textValidate: 'CONTENT IS REQUIRED' })) : this.setState({ textValidate: '' });
            this.state.title === '' ? (this.setState({ titleValidate: 'TITLE IS REQUIRED' })) : this.setState({ titleValidate: '' });
            this.linkData.get('photo') === null ? (this.setState({ photoValidate: 'IMAGE IS REQUIRED' })) : this.setState({ photoValidate: '' });
        } else {

            this.linkData.set('title', this.state.title)
            this.linkData.set('text', this.state.text)
            this.linkData.set('mediaLink', this.state.mediaLink)

            if (auth.isAuthenticated()) {
                const jwt = auth.isAuthenticated();
                const userId = jwt.user._id;
                const token = jwt.token

                create({ t: token }, this.linkData).then((data) => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        alert(data.message)

                        window.location = '/news'
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

                <section className="content" id="content-upload">
                    <div className="container-fluid">
                        <div className="block-header">
                            <h2>UPLOAD NEWS</h2>
                        </div>
                        <div className="row col-md-9">
                            <div className="signup-box">
                                <div className="card">
                                    <div className="body">

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.titleValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="text" name="title" value={this.state.title} onChange={this.onChangeInput} className="form-control" placeholder="Enter News Headline" />
                                            </div>
                                        </div>

                                        <span style={{ color: '#B22222' }}>
                                            <strong></strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="text" name="mediaLink" onChange={this.onChangeInput} value={this.state.mediaLink} className="form-control" placeholder="Enter News Link" />
                                            </div>
                                        </div>

                                        <div className="upload-img-bar">
                                            <span style={{ color: '#B22222' }}>
                                                <strong>{this.state.photoValidate}</strong>
                                            </span>
                                            <div className="upload-info">
                                                <a><label for="news_image"></label></a>
                                                <input name="photo" type="file" onChange={this.handleChange} />
                                            </div>
                                        </div>

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.textValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <div className="form-line">
                                                    <textarea name="text" value={this.state.text} onChange={this.onChangeInput} className="new_content ckeditor" rows="4" className="form-control no-resize" placeholder="Enter Plantation Description"></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <button onClick={this.onSubmit} className="btn btn-block btn-lg bg-pink waves-effect">UPLOAD<i className="fa fa-add"></i></button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}

export default UploadNews
