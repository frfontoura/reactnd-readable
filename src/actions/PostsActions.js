import axios from 'axios'
import consts from '../consts'
import { initialize } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import { POSTS_FETCHED, POSTS_SORT_BY, POSTS_VOTED, POSTS_POST_FETCHED, POSTS_SHOW_UPDATE, POSTS_SHOW_CREATE } from './ActionTypes'

const HEADERS = { headers: { Authorization: "b2OXKhyvbKSbDktxm7DT24DPBNNf9PMS" } }

const INITIAL_VALUE = {
    id: undefined,
    title: undefined,
    body: undefined,
    author: undefined,
    timestamp: undefined,
    category: undefined
}

export const getPosts = () => dispatch => (
    axios.get(`${consts.API_URL}/posts`, HEADERS)
        .then((response) => dispatch({
            type: POSTS_FETCHED,
            payload: response.data
        }))
)

export const getPostsByCategory = (category) => dispatch => (
    axios.get(`${consts.API_URL}/${category}/posts`, HEADERS)
        .then((response) => dispatch({
            type: POSTS_FETCHED,
            payload: response.data
        }))
)

export const vote = (postId, vote) => dispatch => (
    axios.post(`${consts.API_URL}/posts/${postId}`, { option: vote }, HEADERS)
        .then((response) => dispatch({
            type: POSTS_VOTED,
            payload: response.data
        }))
)

export const sortPostBy = (orderBy) => (
    {
        type: POSTS_SORT_BY,
        payload: orderBy
    }
)

export const addNewPost = (post) => dispatch => (
    axios.post(`${consts.API_URL}/posts`, post, HEADERS)
        .then((response) => {
            toastr.success('Success', 'The new publication was successfully completed')
            dispatch(initialize('post', INITIAL_VALUE))
            dispatch(getPosts())
        }).catch (e => {
            toastr.error('Error', e.response.data.error)
        })
)

export const loadPost = (postId) => dispatch => (
    axios.get(`${consts.API_URL}/posts/${postId}`, HEADERS)
        .then((response) => dispatch({
            type: POSTS_POST_FETCHED,
            payload: response.data
        })).catch(e => {
             toastr.error('Error', e.response.data.error)
        })
)

export const showUpdate = (post) => dispatch => {
    dispatch(initialize('post', post))
    dispatch({
        type: POSTS_SHOW_UPDATE
    })
}

export const showCreate = () => dispatch => {
    dispatch(initialize('post', INITIAL_VALUE))
    dispatch({
        type: POSTS_SHOW_CREATE
    })
}

export const update = (post) => dispatch => (
    axios.put(`${consts.API_URL}/posts/${post.id}`, post, HEADERS)
        .then((response) => {
            toastr.success('Success', 'The publication was successfully updated')
            dispatch(initialize('post', INITIAL_VALUE))
            dispatch(getPosts())
        }).catch (e => {
            toastr.error('Error', e.response.data.error)
        })
)