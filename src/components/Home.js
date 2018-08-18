import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PostsList from './posts/PostsList'
import { getPosts } from '../actions/PostsActions'

class Home extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        return (
            <div>
                <PostsList title='home' />
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({ getPosts }, dispatch)
export default connect(null, mapDispatchToProps)(Home)