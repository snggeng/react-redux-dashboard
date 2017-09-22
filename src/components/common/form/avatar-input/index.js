import React, { PropTypes } from 'react';

export const AvatarInput = ({avatar, onChange}) => {
	return (
		<div className="avatar-input">
			<label htmlFor="file-input">
				<span>Upload Avatar</span>
				<img src={ avatar }/>
				<input
					id="file-input"
					name="avatar"
					type="file"
					onChange={ onChange }
				/>
			</label>
		</div>
	);
}

AvatarInput.propTypes = {
	avatar: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}