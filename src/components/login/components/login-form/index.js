import React from 'react'
//import PropTypes from 'prop-types'
import { TextInput } from '../../../common/form/text-input'
import styles from '../../../../styles/login.css'
import style2 from '../../../../styles/form.css'
import validator from 'validator'
import isEmpty from 'lodash/isEmpty'
import { user } from '../../../../config/constants'
import { connect } from 'react-redux'

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			validation: {},
		};
	}

	validateField = (name, value) => {
		let error = null;

		if(validator.isEmpty(value)) {
			let upperCaseFirst = name.charAt(0).toUpperCase() + name.slice(1);
			error = upperCaseFirst+' is required';
		}

		if(name === 'email' && !validator.isEmail(value)) {
			error = 'Email is invalid';
		}

		return error;
	}

	validateForm = form => {
		let errors = {};

		if(validator.isEmpty(form.email)) {
			errors.email = 'Email is required';
		}

		if(!validator.isEmail(form.email)) {
			errors.email = 'Email is invalid';
		}

		if(validator.isEmpty(form.password)) {
			errors.password = 'Password is required';
		}

		return {
			errors,
			isValid: isEmpty(errors)
		}
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleOnBlur = event => {
		let name = event.target.name;
		let value = this.state[name];
		const error = this.validateField(name, value);
		const validation = this.state.validation;
		validation[name] = error;
		this.setState({ validation });
	}

	handleSubmit = event => {
		event.preventDefault();
		this.setState({ validation: {} });
		const { errors, isValid } = this.validateForm(this.state);
		if(isValid) {
			this.props.fetchAndHandleAuthedUser(user, this.state.email, this.state.password)
		} else {
			this.setState({ validation: errors });
		}
	}

	render() {
		const { validation } = this.state;
		return (
			<form className={styles.loginForm} onSubmit={this.handleSubmit} autoComplete="off">
				<TextInput
					label="Email"
					className={style2.formField}
					name="email"
					type="text"
					value={ this.state.email }
					onChange={ this.handleInputChange }
					onBlur={ this.handleOnBlur }
					validation={ validation.email}
				/>
				<TextInput
					label="Password"
					className={style2.formField}
					name="password"
					type="password"
					value={ this.state.password }
					onChange={ this.handleInputChange }
					onBlur={ this.handleOnBlur }
					validation={ validation.password }
				/>
				{ this.props.errors && <div className="errorIndicator"><span className="lnr lnr-warning"></span> { this.props.errors }</div> }
				<button type="submit">Log In</button>
			</form>
		)
	}
}

export default connect()(LoginForm)
