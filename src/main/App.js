import React, { Component } from 'react'

import './app.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import Routes from './routes'
import NavBar from '../components/NavBar'
import ReduxToastr from 'react-redux-toastr'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ReduxToastr />

        <main role="main" className="container">
          <div>
            <Routes />
          </div>
        </main>

      </div>
    )
  }
}

export default App
