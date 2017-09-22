import React, { PropTypes } from 'react'
import styles from '../../../styles/ui.css'

export const UpdateContentIcon = (props) => {
	return (
		<div className={styles.updateContentButton}>
			<img src="/static/images/utils/update.png" onClick={props.handleUpdate}/>
		</div>
	);
}

UpdateContentIcon.propType = {
	handleUpdate: PropTypes.func.isRequired
}
