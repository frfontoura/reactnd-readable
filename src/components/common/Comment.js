import React from 'react'
import { MdComment } from 'react-icons/md'

export default props => (
    <div className='comment-icon'>
        {props.count} <MdComment color='darkgray' />
    </div>
)