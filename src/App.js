import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from './routes'
import { withRouter } from 'react-router'


class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Routes />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(App)
