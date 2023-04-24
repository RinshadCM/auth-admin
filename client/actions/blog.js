import fetch from "isomorphic-fetch";
import { API } from "../config.js";
import queryString from "query-string";

export const createBlog = (blog,token) => {
    return fetch(`http://localhost:4000/api/blog`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${token}`

        },
        body: blog
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const listBlogsWithCategoriesAndTaglists = (skip,limit) => {
    const data ={
        limit,skip
    }
    return fetch(`http://localhost:4000/api/bloglists-categories-taglists`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
            return response.json();
        }).catch(error => console.log(error));
};


export const singleBlog = slug =>{
    return fetch(`http://localhost:4000/api/blog/${slug}`,{
        method: 'GET'
    }).then(response=>{
        return response.json()
    }).catch(err => console.log(err))
};

export const blogListRelated = (blog) => {
    return fetch(`http://localhost:4000/api/bloglists/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(blog)
    }).then(response => {
            return response.json();
        }).catch(error => console.log(error));
};

export const listingTheBlog = slug =>{
    return fetch(`http://localhost:4000/api/bloglists`,{
        method: 'GET'
    }).then(response=>{
        return response.json()
    }).catch(err => console.log(err))
};

export const removingTheBlog = (slug,token) => {
    return fetch(`http://localhost:4000/api/blog/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`

        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const updatingTheBlog = (blog,token,slug) => {
    return fetch(`http://localhost:4000/api/blog/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${token}`

        },
        body: blog
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};


export const listSearchBlogItems = params =>{
    let query = queryString.stringify(params)
    return fetch(`http://localhost:4000/api/bloglists/search?${query}`,{
        method: 'GET'
    }).then(response=>{
        return response.json()
    }).catch(err => console.log(err))
};