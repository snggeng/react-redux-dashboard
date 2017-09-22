import React from 'react'
import styles from '../../../styles/ui.css'

export const LoadingError = () => {
	return (
		<div className={styles.loadingError}>
			Oops! Error occurred<br/>Try to reload
		</div>
	);
}
