import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import styles from '../../styles/admin.css'
// import { push } from 'react-router-redux'
import { logoutAndUnauth } from '../../actions/userActions'

class Logout extends Component {
  render() {
    return (
        <div style={{display:'inline'}}>
          <span className={styles.logout} onClick={this.props.logout}>Logout&nbsp;<span className="lnr lnr-exit"></span></span>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAndUnauth())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
