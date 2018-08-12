import React from 'react'
import { Switch, Route } from 'react-router'

import Home from '../components/Home'
import NotFound from '../components/NotFound'

export default props => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='*' component={NotFound} />
    </Switch>
)