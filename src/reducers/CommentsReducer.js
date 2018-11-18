import { COMMENTS_FETCHED, COMMENTS_VOTED } from '../actions/ActionTypes'

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
        default:
            return state
    }
}
