import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { MdEdit } from 'react-icons/md'

import Comment from '../common/Comment'
import PostVote from './PostVote'
import PostModal from './PostModal'

class PostListItem extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { post } = this.props
        var postDate = new Date(post.timestamp);
        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div className='post-list-item'>
                        <button className="btn btn-light btn-sm float-right" type="submit" title='Edit' onClick={this.openModal}><MdEdit /></button>

                        <PostModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} isEdit={true}/>

                        <p className='author'>{post.author} - {postDate.toLocaleDateString()}</p>
                        <h5><Link to={`${post.category}/${post.id}`}>{post.title}</Link></h5>
                        <p>
                            {_.truncate(post.body, {
                                'length': 120,
                                'separator': ' '
                            })}
                        </p>
                        <Link to={`${post.category}/${post.id}`}>
                            <Comment count={post.commentCount} />
                        </Link>
                        <PostVote voteScore={post.voteScore} postId={post.id} />
                    </div>
                </div>
            </div>
        )
    }
}


export default PostListItem