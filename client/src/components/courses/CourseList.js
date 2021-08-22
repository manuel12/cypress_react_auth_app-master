import React from 'react';
import PropTypes from 'prop-types';
import Course from './Course';

const CourseList = ({ courses, onDelete, userCanEditCourses }) => (
    <ul>
        {courses.map((course) => (
            <Course
                key={course.id}
                course={course}
                onDelete={onDelete}
                userCanEditCourses={userCanEditCourses}
            />
        ))}
    </ul>
);

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    userCanEditCourses: PropTypes.bool
};

export default CourseList;
