import React from 'react'
import PropTypes from 'prop-types'
//import classnames from 'classnames'
import styles from '../../../../styles/form.css'

export const TextInput = ({label, name, type, value, onChange, onBlur, validation}) => (
	<div className={styles.formField}>
		<label htmlFor={ name }>
			<span>{ label }</span>
			<input
				id={ name }
				name={ name }
				type={ type }
				value={ value }
				onChange={ onChange }
				onBlur={ onBlur }
				style = {{borderRadius: '30px', padding: '11px 0px 11px 10px', border: '1px solid 2px solid #e0d6fd', outline: 'none', fontWeight: '500px'}}
			/>
		</label>
		{ validation && <span className={styles.fieldValidationText}>
			<span className={"lnr lnr-warning"}
						style={{textAlign:'center', color:'red'}}></span>
			{ validation }</span> }
	</div>
)

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	validation: PropTypes.string
}
