import React, {Component} from 'react';
import styled from 'react-emotion';

import {Input, gray50, primaryBlue} from '../../utils/content';

const Placeholder = styled('span')`
	color: ${gray50};
	font-style: italic;
	font-size: 14px;
	cursor: pointer;

	&::before {
		content: '+';
		display: inline-block;
		color: ${primaryBlue};
		margin-right: 0.8rem;
		font-style: normal;
		font-size: 1.2rem;
	}
`;

const NameInput = styled(Input)`
	font-size: inherit;
	padding: 5px 10px;
	margin: 5px 20px;
`;

const Editable = styled('span')`
	padding: 0 0 0 0.8rem;
	color: ${primaryBlue};
	font-size: 14px;
`;

class InlineEditable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: props.isEditing || false,
			value: props.value,
		};
	}

	handleFocus = () => {
		if (this.props.disabled) return;

		let shouldBeCleared = false;

		if (this.state.isEditing) {
			shouldBeCleared = this.props.onFocusOut(this.state.value);
		}
		this.setState(state => ({
			value: shouldBeCleared ? '' : state.value,
			isEditing: !this.state.isEditing,
		}));
	};

	handleChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		const {isEditing, value} = this.state;
		const {type, placeholder, className} = this.props;

		if (isEditing) {
			return (
				<NameInput
					type={type}
					value={value}
					onChange={this.handleChange}
					onBlur={this.handleFocus}
					placeholder={placeholder}
					autoFocus
					flexible
					className={className}
					onKeyPress={(e) => {
						if (e.key === 'Enter') {
							e.target.blur();
						}
					}}
				/>
			);
		}

		if (value) {
			return (
				<Editable className={className} onClick={this.handleFocus}>
					{value}
				</Editable>
			);
		}

		return (
			<Placeholder className={className} onClick={this.handleFocus}>
				{placeholder}
			</Placeholder>
		);
	}
}

InlineEditable.defaultProps = {
	onFocusOut: () => {},
};

export default InlineEditable;
