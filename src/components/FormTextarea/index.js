import React, {Component} from 'react';
import styled from 'react-emotion';

const Textarea = styled('textarea')``;

class FormTextarea extends Component {
	render() {
		const {
			name,
			placeholder,
			type,
			values,
			handleChange,
			handleBlur,
			errors,
			touched,
		} = this.props;

		return (
			<Textarea
				id={name}
				placeholder={placeholder}
				value={values[name]}
				onChange={handleChange}
				onBlur={handleBlur}
				className={
					errors[name] && touched[name]
						? 'text-input error'
						: 'text-input'
				}
			/>
		);
	}
}

export default FormTextarea;