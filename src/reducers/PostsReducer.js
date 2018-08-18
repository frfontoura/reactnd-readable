import { POSTS_FETCHED } from '../actions/ActionTypes'

const INITIAL_STATE = { posts: [] }

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case POSTS_FETCHED:
            return { ...state, posts: action.payload }
        default:
            return state
    }
}