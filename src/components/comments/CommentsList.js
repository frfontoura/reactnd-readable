import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getComments } from '../../actions/CommentsActions'
import CommentsVote from './CommentsVote'

class CommmentsList extends Component {

    constructor() {
        super()

        this.state = {
            loadedPostId: 0
        }
    }

    componentDidMount() {
        this.load()
    }

    componentDidUpdate() {
        this.load()
    }

    load() {
        const { loadedPostId } = this.state
        const { postId } = this.props
        if(loadedPostId !== postId) {
            this.props.getComments(postId)
            this.setState({ ...this.state, loadedPostId: postId})
        }
    }

    render() {
        const { comments } = this.props

        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div className='comments-content'>
                        <h5>Comments</h5>
                        {comments.map(comment => (
                            <div className='comment-line' key={comment.id}>
                                <div><strong>{comment.author}</strong></div>
                                <div>{comment.body}</div>
                                <CommentsVote voteScore={comment.voteScore} commentId={comment.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ comments: state.comments.comments })
const mapDispatchToProps = dispatch => bindActionCreators({ getComments }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CommmentsList)