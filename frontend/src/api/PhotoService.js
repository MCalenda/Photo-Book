import axios from "axios";

const API_URL = "http://192.168.1.102:8080/photo";

export async function getPhotos(page, size) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function addPhoto(formData) {
    return await axios.post(API_URL, formData);
}

export async function deletePhoto(id) {
    return await axios.delete(`${API_URL}/${id}`);
}