import React, { Component } from 'react'

import Modal from 'react-modal';
import CommentsForm from './CommentsForm'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '800px'
    }
}

Modal.setAppElement('#root')

class PostModal extends Component {

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel='Post'
            >
                <CommentsForm closeModal={this.props.closeModal} onSubmit={this.props.onSubmit} isEdit={this.props.isEdit}/>
            </Modal>
        )
    }
}

export default PostModal