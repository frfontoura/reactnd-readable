import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PostsList from './PostsList'
import { getPostsByCategory } from '../../actions/PostsActions'

class CategoryPosts extends Component {

    componentDidMount() {
        this.fetchData(this.props.match.params.category)
    }

    componentDidUpdate(prevProps) {
        const category = this.props.match.params.category
        const prevCategory = prevProps.match.params.category
        this.fetchData(category, prevCategory)
    }

    fetchData(category, prevCategory = '') {
        const { getPostsByCategory } = this.props
        if (category !== prevCategory) {
            getPostsByCategory(category)
        }
    }

    render() {
        const category = this.props.match.params.category
        const filtered = this.props.categories.filter(c => c.path === category)

        if(filtered.length > 0){
            return (
                <PostsList title={this.props.match.params.category} />
            )
        } else {
            return <Redirect to='/404' />
        }
    }
}

const mapStateToProps = state => ({ categories: state.navBar.categories })
const mapDispatchToProps = dispatch => bindActionCreators({ getPostsByCategory }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts)