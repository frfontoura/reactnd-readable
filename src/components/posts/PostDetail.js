import React, { Component } from 'react'
import { MdEdit } from 'react-icons/md'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PostVote from './PostVote'
import PostModal from './PostModal'
import CommentList from '../comments/CommentsList'
import { loadPost, showUpdate, update, deletePost } from '../../actions/PostsActions'

class PostDetail extends Component {

    constructor() {
        super()

        this.state = {
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.submit = this.submit.bind(this)
        this.onDelete = this.onDelete.bind(this)
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

    async load(postId, prevPostId = '') {
        if (postId !== prevPostId) {
            await this.props.loadPost(postId)

            if(!this.props.post.id) {
                this.props.history.push('/404')
            }
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true })
        this.props.showUpdate(this.props.post)
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    submit(values) {
        if (values.id) {
            this.props.update(values)
            this.props.loadPost(values.id)
        }
        this.closeModal()
    }

    onDelete(postId) {
        this.props.deletePost(postId)
        this.closeModal()
        this.props.history.push('/')
    }

    render() {
        const { post } = this.props
        var postDate = new Date(post.timestamp ? post.timestamp : Date.now())

        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div className='post-list-item'>
                        <button className="btn btn-light btn-sm float-right" type="submit" title='Edit' onClick={this.openModal}><MdEdit /></button>

                        <PostModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} onSubmit={this.submit}  onDelete={this.onDelete} />

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
const mapDispatchToProps = dispatch => bindActionCreators({ loadPost, showUpdate, update, deletePost }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)