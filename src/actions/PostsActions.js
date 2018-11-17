import axios from 'axios'
import consts from '../consts'
import {reset} from 'redux-form'
import { toastr } from 'react-redux-toastr'

import { POSTS_FETCHED, POSTS_SORT_BY, POSTS_VOTED } from './ActionTypes'

const HEADERS = { headers: { Authorization: "b2OXKhyvbKSbDktxm7DT24DPBNNf9PMS" } }

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
            dispatch(reset('post'))
            dispatch(getPosts())
        }).catch (e => {
            e.response.data.errors.forEach(error => { toastr.error('Erro', error) });
        })
)