import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as courseApi from '../../services/courseApi';
import AddCourseForm from './AddCourseForm';
import CoursesList from './CourseList';

class CoursesPage extends Component {
    constructor() {
        super();

        this.state = {
            courses: []
        };

        this.addCourse = this.addCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.getCours = this.getCourse.bind(this);
    }

    addCourse(course) {
        courseApi.addCourse(course).then(() => this.getCourse());
    }

    deleteCourse(course) {
        courseApi.deleteCourse(course).then(() => this.getCourse());
    }

    getCourse() {
        courseApi.getCourse().then((courses) =>
            this.setState({
                courses: courses
            })
        );
    }

    userCanEditCourses() {
        if (this.context.auth.role === 'admin') return true;
        else return false;
    }

    componentDidMount() {
        this.getCourse();
    }

    render() {
        return (
            <div className="courses-container">
                <h2>Courses</h2>
                <CoursesList
                    courses={this.state.courses}
                    onDelete={this.deleteCourse}
                    userCanEditCourses={this.userCanEditCourses(
                        this.context.auth.role
                    )}
                />
                {this.userCanEditCourses(this.context.auth.role) && (
                    <AddCourseForm addCourse={this.addCourse} />
                )}
            </div>
        );
    }
}

CoursesPage.contextTypes = {
    auth: PropTypes.object
};

export default CoursesPage;
