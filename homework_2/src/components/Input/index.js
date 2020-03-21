import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.sass'

const Input = ({input, label, type, placeholder, multiLine, rows, value, name, onInputChange, autocomplete}) => {
	return (
		<div className={styles.root}>
			<label>
				<p>{label}</p>
				<div className={styles.cover}>
					{
						multiLine ?
							<textarea
								{...input} rows={rows} placeholder={placeholder} value={value} onChange={onInputChange} name={name}
							/>
							:
							<input
								{...input} placeholder={placeholder} type={type} value={value} onChange={onInputChange} name={name} autoComplete={autocomplete}
							/>
					}
				</div>
			</label>
		</div>
	)
}

Input.propTypes = {
	label: PropTypes.string,
	type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'file', 'date', 'url']),
	placeholder: PropTypes.string,
	multiLine: PropTypes.bool,
	rows: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onInputChange: PropTypes.func,
    autocomplete: PropTypes.string
};

export default Input;