import axios from 'axios'
import consts from '../consts'
import { initialize } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import { COMMENTS_FETCHED, COMMENTS_VOTED, COMMENTS_SHOW_UPDATE, COMMENTS_SHOW_CREATE } from './ActionTypes'

const HEADERS = { headers: { Authorization: "b2OXKhyvbKSbDktxm7DT24DPBNNf9PMS" } }

const INITIAL_VALUE = {
    id: undefined,
    body: undefined,
    author: undefined,
    timestamp: undefined,
    parentId: undefined
}

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

export const showUpdate = (comment) => dispatch => {
    dispatch(initialize('commentForm', comment))
    dispatch({
        type: COMMENTS_SHOW_UPDATE,
        payload: comment
    })
}

export const showCreate = () => dispatch => {
    dispatch(initialize('commentForm', INITIAL_VALUE))
    dispatch({
        type: COMMENTS_SHOW_CREATE
    })
}

export const addNewComment = (comment) => dispatch => (
    axios.post(`${consts.API_URL}/comments`, comment, HEADERS)
        .then((response) => {
            onFormClose(dispatch, 'The new comment was successfully completed', comment.parentId)
        }).catch (e => {
            toastr.error('Error', e.response.data.error)
        })
)

export const update = (comment) => dispatch => (
    axios.put(`${consts.API_URL}/comments/${comment.id}`, comment, HEADERS)
        .then((response) => {
            onFormClose(dispatch, 'The publication was successfully updated', comment.parentId)
        }).catch (e => {
            toastr.error('Error', e.response.data.error)
        })
)

export const deleteComment = (comment) => dispatch => (
    axios.delete(`${consts.API_URL}/comments/${comment.id}`, HEADERS)
        .then((response) => {
            onFormClose(dispatch, 'The publication was successfully deleted', comment.parentId)
        }).catch (e => {
            toastr.error('Error', e.response.data.error)
        })
)

const onFormClose = (dispatch, msg, parentId) => {
    toastr.success('Success', msg)
    dispatch(initialize('post', INITIAL_VALUE))
    dispatch(getComments(parentId))
}