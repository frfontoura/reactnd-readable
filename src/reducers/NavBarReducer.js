import { CATEGORIES_FETCHED } from '../actions/ActionTypes'

const INITIAL_STATE = { categories: [] }

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case CATEGORIES_FETCHED:
            return { ...state, categories: action.payload }
        default:
            return state
    }
}