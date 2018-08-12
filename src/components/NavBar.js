import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getCategories } from '../actions/NavBarActions'

class NavBar extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="/">Readable</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home<span className="sr-only">(current)</span></a>
                        </li>

                        {this.props.categories.map(cat => (
                            <li className="nav-item" key={cat.path}>
                                <a className="nav-link" href={cat.path}>{cat.name}</a>
                            </li>
                        ))}

                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({ categories: state.navBar.categories })
const mapDispatchToProps = dispatch => bindActionCreators({ getCategories }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)