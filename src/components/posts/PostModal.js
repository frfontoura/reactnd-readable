import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Modal from 'react-modal';
import If from '../common/if'
import _ from 'lodash'
import { required, renderField, renderSelectField, renderTextAreaField } from '../common/FormUtils'

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
        const { handleSubmit } = this.props

        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel='Post'
            >
                <div className='row'>
                    <div className="col-sm-12">
                        <div style={{ borderBottom: '2px solid lightgray', marginBottom: '20px'}}>
                            <If test={!this.props.isEdit}>
                                <h3>Create a new post</h3>
                            </If>
                            <If test={this.props.isEdit}>
                                <h3>Edit a post</h3>
                            </If>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <If test={!this.props.isEdit}>
                                    <Field name="category" type="text" component={renderSelectField} label="Category" validate={[required]}>
                                        <option />
                                        {this.props.categories.map(cat => (
                                            <option value={cat.path} key={cat.path}>{_.capitalize(cat.name)}</option>
                                        ))}
                                    </Field>
                                </If>
                                <If test={this.props.isEdit}>
                                    <label>Category</label>
                                    <p>asdf</p>
                                </If>
                            </div>

                            <div className='form-group'>
                                <Field name="title" type="text" component={renderField} label="Title" validate={[required]} />
                            </div>

                            <div className="form-group">
                                <Field name="body" type="textarea" component={renderTextAreaField} label="Body" rows='5' validate={[required]} />
                            </div>

                            <div className='form-group'>
                                <Field name="author" type="text" component={renderField} label="Author" validate={[required]} />
                            </div>

                            <div >
                                <button type="submit" className='btn btn-primary btn-space'>Save</button>
                                <button type='button' className='btn btn-secundary btn-space' onClick={this.props.closeModal}>Cancel</button>

                                <If test={this.props.isEdit}>
                                    <button type='button' className='btn btn-danger float-right'>Delete</button>
                                </If>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }
}

PostModal = reduxForm({ form: 'post' })(PostModal)

const mapStateToProps = state => ({ categories: state.navBar.categories })
export default connect(mapStateToProps, null)(PostModal)