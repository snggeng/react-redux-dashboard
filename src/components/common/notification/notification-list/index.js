import React, { PropTypes } from 'react';
import NotificationsItem from '../notification-item';
import classnames from 'classnames';

//Redux staff
import { connect } from 'react-redux';
import { notificationActions } from '../../../../core/notification/actions';

class NotificationsList extends React.Component {
	render() {
		const { notificationDelete } = this.props;
		return (
			<div className={classnames('notifications', {'notifications-active': this.props.messages.length > 0})}>
			{this.props.messages.map(message =>
				<NotificationsItem key={message.id} message={message} notificationDelete={notificationDelete}/>
			)}
			</div>
		)
	}
}

NotificationsList.propType = {
	messages: PropTypes.array.isRequired,
	notificationDelete: PropTypes.func.isRequired
}

//Redux connect

const mapStateToProps = state => ({
	messages: state.notification
})

const mapDispatchToProps = {
	notificationDelete: notificationActions.notificationDelete
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationsList);