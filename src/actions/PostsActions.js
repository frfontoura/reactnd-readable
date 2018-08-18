import axios from 'axios'
import consts from '../consts'
import { POSTS_FETCHED } from './ActionTypes'

export const getPosts = () => dispatch => (
    axios.get(`${consts.API_URL}/posts`, { headers: { Authorization: "b2OXKhyvbKSbDktxm7DT24DPBNNf9PMS" } })
        .then((response) => dispatch({
            type: POSTS_FETCHED,
            payload: response.data
        }))
)

export const getPostsByCategory = (category) => dispatch => (
    axios.get(`${consts.API_URL}/${category}/posts`, { headers: { Authorization: "b2OXKhyvbKSbDktxm7DT24DPBNNf9PMS" } })
        .then((response) => dispatch({
            type: POSTS_FETCHED,
            payload: response.data
        }))
)