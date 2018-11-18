import { POSTS_FETCHED, POSTS_SORT_BY, POSTS_VOTED, POSTS_POST_FETCHED, POSTS_SHOW_UPDATE, POSTS_SHOW_CREATE } from '../actions/ActionTypes'

const INITIAL_STATE = { posts: [], orderBy: 'timestamp', postView: {}, isEdit: false }

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case POSTS_FETCHED:
            return {
                ...state,
                posts: action.payload.sort((a, b) => b[state.orderBy] - a[state.orderBy])
            }
        case POSTS_SORT_BY:
            const orderBy = action.payload
            return {
                ...state,
                orderBy: orderBy,
                posts: [ ...state.posts ].sort((a, b) => b[orderBy] - a[orderBy])
            }
        case POSTS_VOTED:
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.payload.id ? action.payload : p),
                postView: state.postView.id === action.payload.id ? action.payload : state.postView
            }
        case POSTS_POST_FETCHED:
            return {
                ...state,
                postView: action.payload
            }
        case POSTS_SHOW_UPDATE:
            return {
                ...state,
                isEdit: true
            }
        case POSTS_SHOW_CREATE:
            return {
                ...state,
                isEdit: false
            }
        default:
            return state
    }
}
