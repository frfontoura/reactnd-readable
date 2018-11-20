import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import If from '../common/if'
import { required, renderField, renderTextAreaField } from '../common/FormUtils'

class CommentForm extends Component {

    render() {
        const { handleSubmit } = this.props

        return (
            <div className='row'>
                <div className="col-sm-12">
                    <div style={{ borderBottom: '2px solid lightgray', marginBottom: '20px' }}>
                        <If test={!this.props.isEdit}>
                            <h3>New comment</h3>
                        </If>
                        <If test={this.props.isEdit}>
                            <h3>Edit a comment</h3>
                        </If>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Field name="body" type="textarea" component={renderTextAreaField} label="Body" rows='5' validate={[required]} />
                        </div>

                        <div className='form-group'>
                            <Field name="author" type="text" component={renderField} label="Author" validate={[required]} disabled={this.props.isEdit} />
                        </div>

                        <div >
                            <button type="submit" className='btn btn-primary btn-space'>Save</button>
                            <button type='button' className='btn btn-secundary btn-space' onClick={this.props.closeModal}>Cancel</button>

                            <If test={this.props.isEdit}>
                                <button type='button' className='btn btn-danger float-right' onClick={this.props.onDelete} >Delete</button>
                            </If>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({ form: 'commentForm' })(CommentForm)