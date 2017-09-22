import React, { PropTypes } from 'react';
import classnames from 'classnames';

class NotificationsItem extends React.Component {
	constructor(props) {
		super(props);

		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	onDeleteClick() {
		this.props.notificationDelete(this.props.message.id);
	}

	render() {
		const { type, message } = this.props.message;
		return (
			<div className={classnames('notification-item', {
				'notification-item-success': type === 'success',
				'notification-item-error': type === 'error'
			})}>
				<span className="notification-item-close lnr lnr-cross" onClick={this.onDeleteClick}></span>
				<div className="notification-item-message">{message}</div>
			</div>
		)
	}
}

NotificationsItem.propTypes = {
	message: PropTypes.object.isRequired,
	notificationDelete: PropTypes.func.isRequired
}

export default NotificationsItem;