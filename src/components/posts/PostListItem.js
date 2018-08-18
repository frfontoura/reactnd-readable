import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MdComment, MdThumbUp, MdThumbDown } from 'react-icons/md'
import _ from 'lodash'

class PostListItem extends Component {

    render() {
        const { post } = this.props
        var postDate = new Date(post.timestamp);
        console.log(post)
        return (
            <div className='post-list-item'>
                <p className='author'>{post.author} - {postDate.toLocaleDateString()}</p>
                <h5><Link to={`${post.category}/${post.id}`}>{post.title}</Link></h5>
                <p>
                    {_.truncate(post.body, {
                        'length': 120,
                        'separator': ' '
                    })}
                </p>
                {post.commentCount} <MdComment color='darkgray' />&nbsp;

                <MdThumbUp color='forestgreen'/>&nbsp;{post.voteScore}&nbsp;<MdThumbDown color='darkgray'/>
            </div>
        )
    }
}

export default PostListItem