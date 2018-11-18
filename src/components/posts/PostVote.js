import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'

import { vote } from '../../actions/PostsActions'

class PostVote extends Component{

    render() {
        const { postId, voteScore, vote } = this.props

        return (
            <div>
                <MdThumbUp color='forestgreen' className='vote-button' onClick={() => vote(postId, 'upVote') }/>
                &nbsp; { voteScore } &nbsp;
                <MdThumbDown color='darkgray' className='vote-button' onClick={() =>  vote(postId, 'downVote') }/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ vote }, dispatch)
export default connect(null, mapDispatchToProps)(PostVote)