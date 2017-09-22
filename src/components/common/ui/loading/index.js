import React from 'react'
import styles from '../../../styles/ui.css'

export const Loading = () => {
	return (
		<div className={styles.loadingIndicator}>
			<img src="/static/images/utils/loading.gif"/>
		</div>
	);
}
