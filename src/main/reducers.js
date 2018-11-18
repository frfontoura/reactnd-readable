import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer} from 'react-redux-toastr'

import NavBarReducer from '../reducers/NavBarReducer'
import PostReducer from '../reducers/PostsReducer'
import CommentsReducer from '../reducers/CommentsReducer'

const rootReducer = combineReducers({
    navBar: NavBarReducer,
    posts: PostReducer,
    comments: CommentsReducer,
    form: formReducer,
    toastr: toastrReducer
})

export default rootReducer