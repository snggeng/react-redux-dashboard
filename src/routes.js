import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
// import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import loader from './styles/loader.css'
import Admin from './components/admin'
import LoginLayout from './components/login'
import Logout from './components/logout'

class AuthButton extends Component {
  render() {
    console.log(this.props)
      return this.props.users.isAuthed ? (
        <div>
          <p>
            Welcome!
          </p>
          <Logout />
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
        </div>
      )
  }
}

const PrivateRoute = ({ component: Component, ...rest, users }) => (
  <Route {...rest} render={props => (
    users.isAuthed ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>

class Login extends Component {

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/admin' } }
      return this.props.users.isAuthed ?
        <Redirect to={from}/> :
        (this.props.users.isFetching ?
          // ready to auth
          (
            <div className={loader.container}>
              <div className={loader.loader}>Loading</div>
            </div>
          ) :
          (
            <div>
              {/* <p>You must log in to view the page at {from.pathname}</p> */}
              <LoginLayout location={this.props.location}/>
            </div>
          )
        )
    }
}

class Routes extends Component {
  render() {
    return (
    <div>
      <Router>
        <div>
        {/* <AuthButton users={this.props.users}/>
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/admin">Protected Page</Link></li>
        </ul> */}
        <Route exact path="/public" component={Public}/>
        <Route path="/login" component={() => <Login users={this.props.users} {...this.props} />} />
        <PrivateRoute path="/admin" component={Admin} users={this.props.users} />
      </div>
      </Router>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    furnitures: state.furnitures
  }
}

export default withRouter(connect(mapStateToProps, null)(Routes, AuthButton, Login, Admin, Logout))
