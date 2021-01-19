import React, { Component } from 'react';
import auth from './../auth/auth-helper';
import Header from './../include/header'
import Aside from './../include/sidebar'

import moment from 'moment'
import { listInstructor, listById, update, updateEvent } from './../api/api-instructor';


import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from "react-big-calendar";
import swal from 'sweetalert'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer






class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            data: this.props.data,
            created: this.props.created,
            index: this.props.index
        }
    }

    viewInstructor = () => {
        this.props.viewInstructor(this.props.data._id)
    }


    render() {
        return (
            <tr ng-repeat="employee in employees">
                <td>{this.state.index}</td>
                <td>{this.state.name}</td>
                <td>{moment(parseInt(this.state.data.created_date)).fromNow()}</td>
                <td><a href="#unique-data" onClick={this.viewInstructor} className="btn btn-primary">View Instructor</a></td>
            </tr>
        );
    }
}

class Instructor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Instructor: [],
            showInstructor: false,
            Instructor_id: ''
        }


    }

    readInstructor = () => {

        if (auth.isAuthenticated()) {
            listInstructor().then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    this.setState({
                        Instructor: data,
                    })
                }
            });
        }
    }

    componentDidMount() {
        this.readInstructor();
    }

    parentViewInstructor = (id) => {
        this.setState({
            showInstructor: true,
            Instructor_id: id
        })
    }

    parentCloseInstructor = () => {
        this.setState({
            showInstructor: false
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
                            <h2>MANAGE INSTRUCTOR</h2>
                        </div>


                        <div className="card">
                            <div className="header">

                                <div className="row">
                                    <h2 >INSTRUCTORS</h2> <a href="/instruct" className="btn btn-primary">ADD INSTRUCTOR</a>
                                </div>

                            </div>
                            <div className="body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hover dataTable js-exportable" ng-init="getAllEmployees()">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Name</th>
                                                <th>Created at</th>
                                                <th>Operation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.Instructor.map((el, i) =>
                                                <Content
                                                    created={el.created_date}
                                                    data={el}
                                                    index={i + 1}
                                                    key={el._id}
                                                    name={el.name}
                                                    _id={el._id}
                                                    viewInstructor={this.parentViewInstructor}

                                                />
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {this.state.showInstructor === true ?
                            <EditInstructor
                                _id={this.state.Instructor_id}
                                closeInstructorParent={this.parentCloseInstructor}
                            />
                            : ''}
                    </div>
                </section>
            </div >
        );
    }
}

class EditInstructor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Instructor: [],
            Instructor_id: '',
            name: '',
            nameValidate: '',
            about: '',
            aboutValidate: '',
            pricing: '',
            pricingValidate: '',
            profession: '',
            professionValidate: '',
            profession: '',
            showEvent: false,
        }


    }




    readInstructor = () => {
        if (auth.isAuthenticated()) {
            const jwt = auth.isAuthenticated();
            const token = jwt.token;

            console.log(this.props._id)
            listById(this.props._id).then((data) => {
                if (data.error) {
                    alert(data.error)
                    this.setState({ Instructor: { ...data } })
                } else {
                    this.setState({ Instructor: { ...data }, name: data.name, about: data.about, pricing: data.pricing, profession: data.profession })
                    console.log(data)
                }
            })
        }

    }

    closeInstructor = () => {
        this.props.closeInstructorParent()
        this.setState({ showEvent: false })
    }

    componentDidUpdate(prevProps) {
        if (this.props._id !== this.state.Instructor_id) {
            this.setState({ Instructor_id: this.props._id })

            this.readInstructor(this.props._id)
            this.linkData = new FormData()
        }
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

    onSubmit = () => {
        if (this.state.name === '' || this.state.profession === '' || this.state.about === '' || this.state.pricing === '') {
            this.state.about === '' ? (this.setState({ aboutValidate: 'ABOUT IS REQUIRED' })) : this.setState({ aboutValidate: '' });
            this.state.name === '' ? (this.setState({ nameValidate: 'NAME IS REQUIRED' })) : this.setState({ nameValidate: '' });
            this.state.pricing === '' ? (this.setState({ pricingValidate: 'PRICING IS REQUIRED' })) : this.setState({ pricingValidate: '' });
            this.state.profession === '' ? (this.setState({ professionValidate: 'PROFESSION IS REQUIRED' })) : this.setState({ professionValidate: '' });
        } else {

            this.linkData.set('name', this.state.name)
            this.linkData.set('about', this.state.about)
            this.linkData.set('profession', this.state.profession)
            this.linkData.set('pricing', this.state.pricing)

            if (auth.isAuthenticated()) {
                const jwt = auth.isAuthenticated();
                const token = jwt.token

                update({ t: token }, this.linkData, this.props._id).then((data) => {
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

    parentCloseEvent = () => {
        this.setState({ showEvent: false })
    }

    openEvent = () => {
        this.setState({ showEvent: true })
    }


    render() {
        return (
            <div>
                <div className="card">
                    <div className="header">
                        <a onClick={this.closeInstructor} className="btn btn-warning">CLOSE</a>
                        <a onClick={this.openEvent} href="#calendar" className="btn btn-primary">ADD EVENT</a>
                    </div>
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

                        {/*<div className="upload-img-bar">
                        <span style={{ color: '#B22222' }}>
                            <strong>{this.state.photoValidate}</strong>
                        </span>
                        <div className="upload-info">
                            <a><label for="news_image"></label></a>
                            <input name="photo" type="file" onChange={this.handleChange} />
                        </div>
                    </div>*/}

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

                        <button onClick={this.onSubmit} className="btn btn-block btn-lg bg-pink waves-effect">SAVE<i className="fa fa-add"></i></button>


                    </div>
                </div>
                {this.state.showEvent == true ? <MyCalendar
                    closeEvent={this.parentCloseEvent}
                    _id={this.state.Instructor_id}
                /> : ''}
            </div>
        );
    }
}


class MyCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            Instructor_id: '',
            Instructor: []
        }
    }

    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        const link = window.prompt('Zoom link')

        console.log(start, end)

        if (title, link) {

            let event = {
                title: title,
                link: link,
                start: start,
                end: end
            }

            if (auth.isAuthenticated()) {
                const jwt = auth.isAuthenticated();
                const token = jwt.token

                updateEvent({ t: token }, event, this.props._id).then((data) => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        alert(data.message)
                    }
                });
            }


            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                        link
                    },
                ],
            })
        }




    }

    readEvent = (id) => {
        if (auth.isAuthenticated()) {
            const jwt = auth.isAuthenticated();
            const token = jwt.token;

            console.log(this.props._id)
            listById(this.props._id).then((data) => {
                if (data.error) {
                    alert(data.error)
                    this.setState({ Instructor: { ...data } })
                } else {

                    let event = data.event.map((el, i) => {
                        const startTime = new Date(el.start)
                        const endTime = new Date(el.end)

                        return {
                            start: startTime,
                            end: endTime,
                            title: el.title,
                            link: el.link
                        }
                    })


                    this.setState({ Instructor: { ...data }, events: event })
                }
            })
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props._id !== this.state.Instructor_id) {
            this.setState({ Instructor_id: this.props._id })

            this.readEvent(this.props._id)
        }
    }

    closeInstructor = () => {
        this.props.closeEvent()
    }

    render() {
        return (
            <div className="card" id="calendar">
                <div className="header">
                    <h2>EVENTS</h2>
                    <a onClick={this.closeInstructor} className="btn btn-warning">CLOSE</a>
                </div>
                <div className="body">
                    <Calendar
                        selectable
                        style={{ height: 500, width: '95%' }}
                        localizer={localizer}
                        events={this.state.events}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month', 'week']}
                        onSelectEvent={event => swal(event.title/*, {
                            buttons: {
                                cancel: "cancel",
                                catch: {
                                    text: "Book Now",
                                    value: "catch",
                                },
                            },
                        })
                            .then((value) => {
                                switch (value) {
                                    case "catch":
                                        swal("Booked!", '', "success");
                                        break;
                                }
                            }*/)}
                        onSelectSlot={this.handleSelect}
                    />
                </div>
            </div>
        );
    }


}


export default Instructor