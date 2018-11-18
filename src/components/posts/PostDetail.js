import React, { Component } from 'react'
import { MdEdit } from 'react-icons/md'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PostVote from './PostVote'
import PostModal from './PostModal'
import CommentList from '../comments/CommentsList'
import { loadPost } from '../../actions/PostsActions'

class PostDetail extends Component {

    constructor() {
        super()

        this.state = {
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() {
        const postId = this.props.match.params.postId
        this.load(postId)
    }

    componentDidUpdate(prevProps) {
        const postId = this.props.match.params.postId
        const prevPostId = prevProps.match.params.postId
        this.load(postId, prevPostId)
    }

    load(postId, prevPostId = '') {
        if (postId !== prevPostId) {
            this.props.loadPost(postId)
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {
        const { post } = this.props
        var postDate = new Date(post.timestamp ? post.timestamp : Date.now())
        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div className='post-list-item'>
                        <button className="btn btn-light btn-sm float-right" type="submit" title='Edit' onClick={this.openModal}><MdEdit /></button>

                        <PostModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} isEdit={true} postEdit={post}/>

                        <p className='author'>{post.author} - {postDate.toLocaleDateString()}</p>
                        <h5>{post.title}</h5>
                        <p>
                            {post.body}
                        </p>
                        <PostVote voteScore={post.voteScore} postId={post.id} />
                    </div>

                    <CommentList postId={post.id}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ post: state.posts.postView })
const mapDispatchToProps = dispatch => bindActionCreators({ loadPost }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)