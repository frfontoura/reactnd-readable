import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { MdNoteAdd } from 'react-icons/md'
import uuid from "uuid"

import If from '../common/if'
import PostListItem from './PostListItem'
import PostModal from './PostModal'
import { sortPostBy, addNewPost, showUpdate, showCreate, update } from '../../actions/PostsActions'

class PostsList extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submit = this.submit.bind(this);
    }

    openModal(post) {
        this.setState({ modalIsOpen: true });
        if (post) {
            this.props.showUpdate(post)
        } else {
            this.props.showCreate()
        }
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    submit(values) {
        if (values.id) {
            this.props.update(values)
        } else {
            const post = {
                ...values,
                id: uuid.v4(),
                timestamp: Date.now()
            }
            this.props.addNewPost(post)
        }
        this.closeModal()
    }

    render() {
        const { posts, title, orderBy, sortPostBy } = this.props

        return (
            <div>
                <div className='row'>
                    <div className="col-sm-12">

                        <h1>{_.capitalize(title)}</h1>
                    </div>
                </div>
                <If test={posts.length > 0}>
                    <div className='row'>
                        <div className="col-sm-12">
                            <button className="btn btn-outline-primary btn-sm float-left" type="submit" onClick={() => this.openModal()}><MdNoteAdd />&nbsp;New Post</button>
                            <PostModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} onSubmit={this.submit} isEdit={false} />
                            <div className='float-right'>
                                Order by &nbsp;
                                <div className='btn-group btn-group-sm' role='group' aria-label='Order by'>
                                    <button type='button' onClick={() => sortPostBy('timestamp')} className={`btn btn-${orderBy === 'timestamp' ? 'primary' : 'light'}`}>Date</button>
                                    <button type='button' onClick={() => sortPostBy('voteScore')} className={`btn btn-${orderBy === 'voteScore' ? 'primary' : 'light'}`}>Score</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {posts.map(post => (
                        <PostListItem key={post.id} post={post} openModal={this.openModal} />
                    ))}
                </If>

                <If test={posts.length === 0}>
                    <h6>Nenhum post encontrado</h6>
                </If>
            </div >
        )
    }
}

PostsList.propTypes = {
    title: PropTypes.string.isRequired
}

const mapStateToProps = state => ({ posts: state.posts.posts, orderBy: state.posts.orderBy })
const mapDispatchToProps = dispatch => bindActionCreators({ sortPostBy, addNewPost, showUpdate, showCreate, update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
