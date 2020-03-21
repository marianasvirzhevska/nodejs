import React from 'react'
import PropTypes from 'prop-types'
import './styles.sass'

const Button = ({children, handler, color, type, size}) => {
	return(
		<button
			className={`root ${color} ${type} ${size}`}
			onClick={handler}
		>
			{children}
		</button>
	)
};

Button.propTypes = {
	color: PropTypes.oneOf(['default', 'primary', 'secondary']),
	type: PropTypes.oneOf(['contained', 'outlined', 'link']),
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	children: PropTypes.any.isRequired,
	handler: PropTypes.func
};

Button.defaultProps = {
	color: 'default',
	type: 'contained',
	size: 'normal',
	children: 'Button'
};

export default Button;