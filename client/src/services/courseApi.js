import { getHttp, postHttp, patchHttp, deleteHttp } from '../helpers/http';

export const getCourse = () => {
    return getHttp('/courses');
};

export const addCourse = (course) => {
    return postHttp('/courses', course);
};

export const updateCourse = (updatedCourse) => {
    return patchHttp(`/courses/${updatedCourse.id}`, updatedCourse);
};

export const deleteCourse = (courseToDelete) => {
    return deleteHttp(`/courses/${courseToDelete.id}`);
};
