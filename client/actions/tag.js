import fetch from "isomorphic-fetch";
import {API} from "../config.js";
import cookie from "js-cookie";

export const create = (tag,token) => {
    return fetch(`http://localhost:4000/api/tag`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`

        },
        body: JSON.stringify(tag)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const getTagLists = () => {
    return fetch(`http://localhost:4000/api/taglists`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};


export const getSingleTag = (slug) => {
    return fetch(`http://localhost:4000/api/tag/${slug}`, {
        method: 'GET', 
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const removeTag= (slug,token) => {
    return fetch(`http://localhost:4000/api/tag/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`

        }
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};