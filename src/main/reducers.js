import { combineReducers } from 'redux'

import NavBarReducer from '../reducers/NavBarReducer'

const rootReducer = combineReducers({
    navBar: NavBarReducer
})

export default rootReducer