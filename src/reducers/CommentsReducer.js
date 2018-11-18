import { COMMENTS_FETCHED, COMMENTS_VOTED, COMMENTS_SHOW_UPDATE, COMMENTS_SHOW_CREATE } from '../actions/ActionTypes'

const INITIAL_STATE = { comments: [] }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case COMMENTS_FETCHED:
            return {
                ...state,
                comments: action.payload
            }
        case COMMENTS_VOTED:
            return {
                ...state,
                comments: state.comments.map(c => c.id === action.payload.id ? action.payload : c)
            }
        case COMMENTS_SHOW_UPDATE:
            return {
                ...state,
                isEdit: true
            }
        case COMMENTS_SHOW_CREATE:
            return {
                ...state,
                isEdit: false
            }
        default:
            return state
    }
}
