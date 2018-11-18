import axios from 'axios'
import consts from '../consts'

import { COMMENTS_FETCHED, COMMENTS_VOTED } from './ActionTypes'

const HEADERS = { headers: { Authorization: "b2OXKhyvbKSbDktxm7DT24DPBNNf9PMS" } }

export const getComments = (postId) => dispatch => (
    axios.get(`${consts.API_URL}/posts/${postId}/comments`, HEADERS)
        .then((response) => dispatch({
            type: COMMENTS_FETCHED,
            payload: response.data
        }))
)

export const vote = (commentId, vote) => dispatch => (
    axios.post(`${consts.API_URL}/comments/${commentId}`, { option: vote }, HEADERS)
        .then((response) => dispatch({
            type: COMMENTS_VOTED,
            payload: response.data
        }))
)