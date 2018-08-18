import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import If from '../common/if'
import PostListItem from './PostListItem'

class PostsList extends Component {

    render() {
        const { posts, title } = this.props

        return (
            <div>
                <h1>{_.capitalize(title)}</h1>
                <If test={posts.length > 0}>
                    {posts.map(post =>(
                        <PostListItem key={post.id} post={post} />
                    ))}
                </If>

                <If test={posts.length === 0}>
                    <h6>Nenhum post encontrado</h6>
                </If>
            </div>
        )
    }
}

PostsList.propTypes = {
    title: PropTypes.string.isRequired
}

const mapStateToProps = state => ({ posts: state.posts.posts })
export default connect(mapStateToProps)(PostsList)
