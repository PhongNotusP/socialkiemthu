import * as types from './types';

//Get thông tin ở trang home
export function getUserHandle() {
    return { type: types.GET_HANDLE };
}

//Get thông tin User hiện tại
export function getUserProfile() {
    return { type: types.GET_PROFILE }
}

//Get user theo id
export function getGuestProfile(id) {
    return { type: types.GET_GUEST, id }
}

//Update thông tin user
export function updateUserProfile(data) {
    return { type: types.UPDATE_PROFILE, data }
}

//Update mạng xã hội user
export function updateUserSocial(data) {
    return { type: types.UPDATE_SOCIAL, data }
}

//Xóa học vấn
export function removeUserEducation(id) {
    return { type: types.REMOVE_EDUCATION, id }
}

//Xóa kinh nghiệm
export function removeUserExperience(id) {
    return { type: types.REMOVE_EXPERIENCE, id }
}

//Thêm học vấn
export function createUserEducation(data) {
    return { type: types.CREATE_EDUCATION, data }
}

//Thêm kinh nghiệm
export function createUserExperience(data) {
    return { type: types.CREATE_EXPERIENCE, data }
}