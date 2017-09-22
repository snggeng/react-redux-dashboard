import React from 'react'
// import PropTypes from 'prop-types'
import LoginForm from './components/login-form';
// import { Loading } from '../common/ui/loading';
import styles from '../../styles/login.css'
import { connect } from 'react-redux'
import { fetchAndHandleAuthedUser } from '../../actions/userActions'

class LoginLayout extends React.Component {
	render() {
		return (
			<div className={styles.loginBackground}>
				<div className={styles.loginFormContainer}>
					<div className={styles.loginFormCentered}>
						{/* { auth.authProcessing && <Loading/> } */}
						{/* <Loading/> */}
						<h1 className={styles.formHeader}>Admin Dashboard</h1>
						{ this.props.users.error ?
							<h2 style={{color: 'red'}}>{this.props.users.error}</h2> :
							<div></div>
						}
						<LoginForm
							fetchAndHandleAuthedUser={this.props.fetchAndHandleAuthedUser}
						/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAndHandleAuthedUser: (user, email, password) => dispatch(fetchAndHandleAuthedUser(user, email, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout)
