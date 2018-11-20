import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdNoteAdd, MdEdit } from 'react-icons/md'
import uuid from "uuid"

import { getComments, addNewComment, showUpdate, showCreate, update, deleteComment } from '../../actions/CommentsActions'
import CommentsVote from './CommentsVote'
import CommentsModal from './CommentModal'

class CommmentsList extends Component {

    constructor() {
        super()

        this.state = {
            loadedPostId: 0,
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onDelete = this.onDelete.bind(this)
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

    openModal(comment) {
        this.setState({ modalIsOpen: true })
        if(comment) {
            this.props.showUpdate(comment)
        } else {
            this.props.showCreate()
        }
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    onSubmit(values) {
        if (values.id) {
            this.props.update(values)
        } else {
            const comment = {
                ...values,
                id: uuid.v4(),
                timestamp: Date.now(),
                parentId: this.state.loadedPostId
            }
            this.props.addNewComment(comment)
        }
        this.closeModal()
    }

    onDelete() {
        this.props.deleteComment(this.props.commentEdit)
        this.closeModal()
    }

    render() {
        const { comments } = this.props

        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div className='comments-content'>
                        <button className="btn btn-outline-primary btn-sm float-right" type="submit" onClick={() => this.openModal()}><MdNoteAdd />&nbsp;New Comment</button>
                        <CommentsModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} onSubmit={this.onSubmit} onDelete={this.onDelete} isEdit={this.props.isEdit} />

                        <h5>Comments</h5>
                        {comments.map(comment => (
                            <div className='comment-line' key={comment.id}>
                                <button className="btn btn-light btn-sm float-right" type="submit" title='Edit' onClick={() => this.openModal(comment)} ><MdEdit /></button>
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

const mapStateToProps = state => ({ comments: state.comments.comments, isEdit: state.comments.isEdit, commentEdit: state.comments.commentEdit })
const mapDispatchToProps = dispatch => bindActionCreators({ getComments, addNewComment, showUpdate, showCreate, update, deleteComment }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CommmentsList)