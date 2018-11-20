import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../components/Home'
import NotFound from '../components/NotFound'
import CategoryPosts from '../components/posts/CategoryPosts'
import PostDetail from '../components/posts/PostDetail'

export default props => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/404' component={NotFound} />
        <Route exact path='/:category' component={CategoryPosts} />
        <Route exact path='/:category/:postId' component={PostDetail} />
        <Route component={NotFound} />
    </Switch>
)