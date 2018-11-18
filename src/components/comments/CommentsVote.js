import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'

import { vote } from '../../actions/CommentsActions'

class CommentsVote extends Component{

    render() {
        const { commentId, voteScore, vote } = this.props

        return (
            <div>
                <MdThumbUp color='forestgreen' className='vote-button' onClick={() => vote(commentId, 'upVote') }/>
                &nbsp; { voteScore } &nbsp;
                <MdThumbDown color='darkgray' className='vote-button' onClick={() =>  vote(commentId, 'downVote') }/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ vote }, dispatch)
export default connect(null, mapDispatchToProps)(CommentsVote)