import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'
import { create } from './../api/api-session';
import swal from 'sweetalert'

class NewSession extends Component {

    constructor(props) {
        super(props);


        this.state = {
            title: '',
            titleValidate: '',
            start: '',
            startValidate: '',
            duration: '',
            durationValidate: '',
            pricing: '',
            pricingValidate: '',
            limit: '',
            limitValidate: '',
            link: '',
            linkValidate: '',
            photo: '',
            photoValidate: '',
            feature: 0,
            featureValue: "Click To Feature"
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
        event.target.name === 'start' ? this.setState({ startValidate: '' }) : '';
        event.target.name === 'duration' ? this.setState({ durationValidate: '' }) : '';
        event.target.name === 'link' ? this.setState({ linkValidate: '' }) : '';
        event.target.name === 'limit' ? this.setState({ limitValidate: '' }) : '';
        event.target.name === 'pricing' ? this.setState({ pricingValidate: '' }) : '';
    }

    onChangeFeature = () => {
        if (this.state.feature == 1) {
            this.setState({
                feature: 0,
                featureValue: "Click To Feature"
            });
        } else {
            this.setState({
                feature: 1,
                featureValue: "Click To Remove From Feature"
            });
        }
    }





    handleChange = (event) => {
        const value = event.target.name === 'photo'
            ? event.target.files[0]
            : event.target.value



        var img = new Image;
        img.src = URL.createObjectURL(event.target.files[0]);
        img.uploadImage = this.uploadValidate
        img.value = value

        img.onload = function () {
            var picWidth = this.width;
            var picHeight = this.height;

            if (picHeight == 300 && picWidth == 300) {
                this.uploadImage(this.src, this.value)

                
            } else {
                swal("IMAGE RESOLUTION(300x300)")
            }

           
        }
        event.target.name === 'photo' ? this.setState({ photoValidate: '' }) : '';
    }

    uploadValidate = (src, value) => {
        this.linkData.set("photo", value)


        this.setState({ photo: src });
    }

    onSubmit = () => {
        if (this.state.title === '' || this.state.link === '' || this.linkData.get('photo') === null || this.state.limit === '' || this.state.start === '' || this.state.duration === '' || this.state.pricing === '') {
            this.state.title === '' ? (this.setState({ titleValidate: 'ABOUT IS REQUIRED' })) : this.setState({ titleValidate: '' });
            this.state.pricing === '' ? (this.setState({ pricingValidate: 'PRICING IS REQUIRED' })) : this.setState({ pricingValidate: '' });
            this.state.link === '' ? (this.setState({ linkValidate: 'LINK IS REQUIRED' })) : this.setState({ linkValidate: '' });
            this.state.start === '' ? (this.setState({ startValidate: 'START TIME IS REQUIRED' })) : this.setState({ startVlidate: '' });
            this.state.duration === '' ? (this.setState({ durationValidate: 'DURATION IS REQUIRED' })) : this.setState({ durationValidate: '' });
            this.linkData.get('photo') === null ? (this.setState({ photoValidate: 'IMAGE IS REQUIRED' })) : this.setState({ photoValidate: '' });
        } else {

            this.linkData.set('title', this.state.title)
            this.linkData.set('link', this.state.link)
            this.linkData.set('limit', this.state.limit)
            this.linkData.set('start', this.state.start)
            this.linkData.set('duration', this.state.duration)
            this.linkData.set('pricing', this.state.pricing)
            this.linkData.set('feature', this.state.feature)
            this.linkData.set('join', 0)


            if (auth.isAuthenticated()) {
                const jwt = auth.isAuthenticated();
                const token = jwt.token

                create({ t: token }, this.linkData).then((data) => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        alert(data.message)

                        window.location = '/session'
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
                            <h2>CREATE SESSION</h2>
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
                                                <input type="text" name="title" value={this.state.title} onChange={this.onChangeInput} className="form-control" placeholder="Enter Session Title" />
                                            </div>
                                        </div>

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.limitValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="number" name="limit" value={this.state.limit} onChange={this.onChangeInput} className="form-control" placeholder="Enter Number Of User That Can Join the Session" />
                                            </div>
                                        </div>

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.linkValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="text" name="link" value={this.state.link} onChange={this.onChangeInput} className="form-control" placeholder="Enter Zoom Link" />
                                            </div>
                                        </div>

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.pricingValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="number" name="pricing" value={this.state.pricing} onChange={this.onChangeInput} className="form-control" placeholder="Enter Session Price" />
                                            </div>
                                        </div>

                                        <div className="upload-img-bar">
                                            <span style={{ color: '#B22222' }}>
                                                <strong>{this.state.photoValidate}</strong>
                                            </span>
                                            <div className="upload-info">
                                                <a>(Image Resolution 300x300)<label for="news_image"></label></a>
                                                <input name="photo" type="file" onChange={this.handleChange} />
                                            </div>
                                        </div>



                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.startValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="datetime-local" name="start" value={this.state.start} onChange={this.onChangeInput} className="form-control" placeholder="Enter Start Time" />
                                            </div>
                                        </div>

                                        <button onClick={this.onChangeFeature} className="btn btn-sm bg-pink waves-effect">{this.state.featureValue}<i className="fa fa-add"></i></button>
                                        <span class="material-icons success">
                                            {this.state.feature == 0 ? '' : 'check'}
                                            </span>


                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.durationValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="number" name="duration" value={this.state.duration} onChange={this.onChangeInput} className="form-control" placeholder="Enter Session Duration In Minutes" />
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

export default NewSession
