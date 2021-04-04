import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'
import { create } from './../api/api-instructor';
import swal from 'sweetalert'

class Instruct extends Component {

    constructor(props) {
        super(props);


        this.state = {
            name: '',
            nameValidate: '',
            about: '',
            aboutValidate: '',
            pricing: '',
            pricingValidate: '',
            profession: '',
            professionValidate: '',
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

        event.target.name === 'name' ? this.setState({ nameValidate: '' }) : '';
        event.target.name === 'about' ? this.setState({ aboutValidate: '' }) : '';
        event.target.name === 'pricing' ? this.setState({ pricingValidate: '' }) : '';
        event.target.name === 'profession' ? this.setState({ professionValidate: '' }) : '';
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
        if (this.state.name === '' || this.state.profession === '' || this.linkData.get('photo') === null || this.state.about === '' || this.state.pricing === '') {
            this.state.about === '' ? (this.setState({ aboutValidate: 'ABOUT IS REQUIRED' })) : this.setState({ aboutValidate: '' });
            this.state.name === '' ? (this.setState({ nameValidate: 'NAME IS REQUIRED' })) : this.setState({ nameValidate: '' });
            this.state.pricing === '' ? (this.setState({ pricingValidate: 'PRICING IS REQUIRED' })) : this.setState({ pricingValidate: '' });
            this.state.profession === '' ? (this.setState({ professionValidate: 'PROFESSION IS REQUIRED' })) : this.setState({ professionValidate: '' });
            this.linkData.get('photo') === null ? (this.setState({ photoValidate: 'IMAGE IS REQUIRED' })) : this.setState({ photoValidate: '' });
        } else {

            this.linkData.set('name', this.state.name)
            this.linkData.set('about', this.state.about)
            this.linkData.set('profession', this.state.profession)
            this.linkData.set('pricing', this.state.pricing)

            if (auth.isAuthenticated()) {
                const jwt = auth.isAuthenticated();
                const token = jwt.token

                create({ t: token }, this.linkData).then((data) => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        alert(data.message)

                        window.location = '/instructor'
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
                            <h2>CREATE INSTRUCTOR</h2>
                        </div>
                        <div className="row col-md-9">
                            <div className="signup-box">
                                <div className="card">
                                    <div className="body">

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.nameValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="text" name="name" value={this.state.name} onChange={this.onChangeInput} className="form-control" placeholder="Enter Instructor Name" />
                                            </div>
                                        </div>

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.professionValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <select id="mySelect" name="profession" onChange={this.onChangeInput} value={this.state.profession} data-show-content="true" className="form-control">
                                                <option selected>Select Profession</option>
                                                <option value="1">VOCAL COACHING</option>
                                                <option value="2">GUITAR</option>
                                                <option value="3">PRODUCTION</option>
                                                <option value="4">CAREER COACHING</option>
                                            </select>

                                        </div>

                                        <span style={{ color: '#B22222' }}>
                                            <strong>{this.state.pricingValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <input type="number" name="pricing" value={this.state.pricing} onChange={this.onChangeInput} className="form-control" placeholder="Enter pricing per hour" />
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
                                            <strong>{this.state.aboutValidate}</strong>
                                        </span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <div className="form-line">
                                                <div className="form-line">
                                                    <textarea name="about" value={this.state.about} onChange={this.onChangeInput} className="new_content ckeditor" rows="4" className="form-control no-resize" placeholder="Enter Bio"></textarea>
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

export default Instruct
