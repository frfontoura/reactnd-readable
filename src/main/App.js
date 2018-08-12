import React, { Component } from 'react'

import './app.css'
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './routes'
import NavBar from '../components/NavBar'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />

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
