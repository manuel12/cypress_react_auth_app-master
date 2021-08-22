import { getHttp, patchHttp } from '../helpers/http';
import { getCourses } from './courseApi';
import { getUsers } from './userApi';

const _mergePlaylistData = (courses, playlists, users) => {
    return playlists.map((playlist) => {
        playlist.user = users.find((user) => user.id === playlist.user);
        playlist.courses = playlist.courses.map((courseId) =>
            courses.find((course) => course.id === courseId)
        );
        return playlist;
    });
};

const getAllPlaylistsForUser = (username) => {
    return getUsers().then((users) => {
        const user = users.find((user) => user.username === username);
        if (user) return getHttp(`/playlists?user=${user.id}`);
        else return Promise.resolve([]);
    });
};

const getAllPlaylists = () => {
    return getHttp('/playlists');
};

export const getAllPlaylistsMerged = () => {
    return Promise.all([getCourses(), getAllPlaylists(), getUsers()]).then(
        (responses) => {
            const [courses, playlists, users] = responses;
            return _mergePlaylistData(courses, playlists, users);
        }
    );
};

export const getAllPlaylistsForUserMerged = (userId) => {
    return Promise.all([
        getCourses(),
        getAllPlaylistsForUser(userId),
        getUsers()
    ]).then((responses) => {
        const [courses, playlists, users] = responses;
        return _mergePlaylistData(courses, playlists, users);
    });
};

export const getPlaylist = (playlistId) => {
    return getHttp(`/playlists/${playlistId}`);
};

export const addCourseToPlaylist = (playlistId, courseId) => {
    return getHttp(`/playlists/${playlistId}`).then((playlist) => {
        const courses = playlist.courses;
        courses.push(courseId);
        return patchHttp(`playlist`, { courses: courses });
    });
};

export const deleteCourseFromPlaylist = (playlistId, courseId) => {
    return getHttp(`/playlists/${playlistId}`).then((playlist) => {
        const courses = playlist.courses.filter(
            (course) => course.id !== courseId
        );
        return patchHttp(`playlist`, { courses: courses });
    });
};
