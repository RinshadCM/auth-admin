import fetch from "isomorphic-fetch";
import {API} from "../config.js";
import cookie from "js-cookie";

export const create = (category,token) => {
    return fetch(`http://localhost:4000/api/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`

        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const getCategories = () => {
    return fetch(`http://localhost:4000/api/categories`, {
        method: 'GET',
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};


export const getSingleCategory = (slug) => {
    return fetch(`http://localhost:4000/api/category/${slug}`, {
        method: 'GET', 
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const removeCategory = (slug,token) => {
    return fetch(`http://localhost:4000/api/category/${slug}`, {
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