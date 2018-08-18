import { combineReducers } from 'redux'

import NavBarReducer from '../reducers/NavBarReducer'
import PostReducer from '../reducers/PostsReducer'

const rootReducer = combineReducers({
    navBar: NavBarReducer,
    posts: PostReducer
})

export default rootReducer