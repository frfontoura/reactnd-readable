import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import { getCategories } from '../actions/NavBarActions'

class NavBar extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <Link className="navbar-brand" to="/">
                    Readable
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/">
                                Home
                            </NavLink>
                        </li>

                        {this.props.categories.map(cat => (
                            <li className="nav-item" key={cat.path}>
                                <NavLink className="nav-link" activeClassName="active" exact to={`/${cat.path}`}>
                                    {_.capitalize(cat.name)}
                                </NavLink>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))