import {css} from '@emotion/core';
import styled from '@emotion/styled/macro';
import React, {forwardRef} from 'react';
import {Link} from 'react-router-dom';
import ReactSelect from 'react-select';
import Shevy from 'shevyjs';

import {
	accentGrey,
	gray30,
	lightGrey,
	lightPurple,
	lightRed,
	mediumGrey,
	mediumPurple,
	primaryBlack,
	primaryBlue,
	primaryGrey,
	primaryPurple,
	primaryRed,
	primaryWhite,
} from '../colors';
import {BREAKPOINTS, ITEM_TYPES, itemStatuses} from '../constants';
import Pencil from '../icons/pencil.svg';

export * from '../colors';

const shevy = new Shevy({
	baseFontSize: '14px',
});

const {body} = shevy;

export const Body = styled('div')`
	${body};
`;

const getButtonHoveredColor = (props) => {
	if (props.white || props.link) {
		return primaryPurple;
	}
	return primaryWhite;
};

const getButtonHoveredBackground = (props) => {
	if (props.red) {
		return primaryRed;
	}
	if (props.white) {
		return primaryWhite;
	}
	return primaryPurple;
};

const getButtonHoveredBorderColor = (props) => {
	if (props.primary) {
		return 'transparent';
	}
	if (props.red) {
		return primaryRed;
	}
	if (props.white) {
		return primaryWhite;
	}
	return primaryPurple;
};

export const Button = styled('button')`
	font-size: 13px;
	font-family: 'Work Sans', sans-serif;
	padding: 0.3rem 0.8rem;
	font-weight: ${(props) => {
		if (props.white) {
			return '500';
		}
		return '400';
	}};
	letter-spacing: ${(props) => {
		if (props.white) {
			return '0.01rem';
		}
		return 0;
	}};
	border: ${(props) => {
		if (props.white) {
			return '2px solid #333';
		}
		return '1px solid #333';
	}};
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	background: ${(props) => {
		if (props.primary) {
			return primaryPurple;
		}
		if (props.white || props.grey) {
			return 'transparent';
		}
		return primaryWhite;
	}};
	color: ${(props) => {
		if (props.link && props.disabled) {
			return primaryGrey;
		}
		if (props.primary) {
			return primaryWhite;
		}
		if (props.red) {
			return primaryRed;
		}
		if (props.grey) {
			return primaryGrey;
		}
		if (props.white) {
			return primaryWhite;
		}
		return primaryPurple;
	}};

	svg {
		fill: ${(props) => {
		if (props.link && props.disabled) {
			return primaryGrey;
		}
		if (props.primary) {
			return primaryWhite;
		}
		if (props.red) {
			return primaryRed;
		}
		if (props.grey) {
			return primaryGrey;
		}
		if (props.white) {
			return primaryWhite;
		}
		return primaryPurple;
	}};
	}

	border-color: currentColor;
	display: flex;
	flex-shrink: 0;
  align-items: center;
	justify-content: center;

	${props => !props.disabled
		&& css`
			&:hover {
				svg {
					fill: ${getButtonHoveredColor(props)};
				}
				background: ${getButtonHoveredBackground(props)};
				color: ${getButtonHoveredColor(props)};
				border-color: ${getButtonHoveredBorderColor(props)};

				&::before {
					color: currentColor;
				}
			}
		`}

		${props => props.disabled
			&& css`
				opacity: 0.5;
			`}

	${props => props.textIcon
		&& `
		font-weight: 500;
	`}

	${props => props.big
		&& `
		font-size: 14px;
		font-weight: 500;
		padding: .8rem 1.6rem;
	`}

	${props => props.icon
		&& `&::before {
			content: '${props.icon}';
			margin-right: .4rem;
			color: currentColor;
			font-weight: 500;
		}`};

	${props => props.tiny
		&& `
		padding: 0;
		width: 30px;
		height: 30px;
	`}

	${props => props.link
		&& `
			padding: 0;
			margin: 0;
			border: none;
			background: none;

			:hover {
				border: none;
				background: none;
			}

			@media (max-width: ${BREAKPOINTS.mobile}px) {
				width: auto !important;
				padding: 0 !important;
			}
		`}

	${props => props.centered
		&& `
		margin: 0 auto;
	`}

	${props => props.aligned
		&& `
		& + button {
			margin-left: .5rem;
		}
		@media (max-width: ${BREAKPOINTS.mobile}px) {
			margin-left: 0;
			margin-bottom: .5rem;
		}
	`}

	i {
		color: inherit;
		margin-right: ${props => (props.link ? 0 : '10px')};
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		width: 100%;
		padding: 0.6rem 0.8rem;
		flex-direction: row;
		align-items: center;
		display: flex;
	}
`;

export const ButtonLink = Button.withComponent(Link);

export const ProjectHeading = styled('div')`
	color: ${accentGrey};
	font-size: 32px;
`;

export const Heading = styled('h1')`
	font-weight: 500;
	color: ${primaryBlack};
	font-size: 1.5rem;
	margin-top: 0;

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		font-size: 24px;
	}
`;

export const HeadingLink = styled(Link)`
	font-size: 20px;
	color: ${primaryBlack};
	vertical-align: baseline;
	line-height: 56px;
	text-decoration: none;

	&:hover {
		color: ${primaryPurple};
	}
`;

export const HeadingRow = styled('div')`
	display: flex;

	* ~ * {
		margin-left: 2rem;
	}
`;

export const TaskHeading = styled('h2')`
	color: ${primaryGrey};
	font-size: 18px;
	line-height: 1.5;
	font-weight: 400;
	flex: 1 0
		${props => (props.small ? 'calc(100% - 458px)' : 'calc(100% - 218px)')};

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		font-size: 14px;
		margin: 0;
	}
`;

export const SubHeading = styled('div')`
	text-transform: uppercase;
	font-size: 12px;
	letter-spacing: 0.5px;
	color: ${primaryBlack};
	font-weight: 500;
	display: flex;
	align-items: center;
`;

export const P = styled('p')`
	font-size: 14px;
	line-height: 1.6em;
	color: ${primaryBlack};
`;

export const HR = styled('hr')`
	margin: 2rem 0;
	border: 0;
	border-top: 1px solid ${mediumGrey};
`;

export const Label = styled('label')`
	font-size: 14px;
	color: ${primaryGrey};
`;

export const A = styled('a')`
	font-size: 1em;
	color: ${primaryPurple};
	text-decoration: none;
	border-bottom: 2px solid transparent;
	cursor: ${props => (props.noHover ? 'default' : 'pointer')};
	${props => props.noHover && 'border: none;'}

	&:hover {
		border-color: ${primaryPurple};
		transition: border-color 200ms ease;
	}
`;

const TaskInfosContent = styled('div')`
	color: ${primaryGrey};
	padding-bottom: 0;
	display: flex;
	border-bottom: solid 1px transparent;
	margin-left: 10px;
`;

export const TaskInfosItem = styled('div')`
	display: flex;
	margin-right: 1rem;
	font-size: 12px;
	${props => props.onClick && 'cursor: pointer;'}
	align-items: center;
	height: 30px;
	position: relative;
	text-decoration: none;

	&:hover {
		text-decoration: none;
	}

	${props => (props.inactive
		? ''
		: `&:hover ${TaskInfosContent} {
			color: ${primaryPurple};
			border-bottom: 1px dotted ${primaryPurple};
		}`)}
`;

export const TaskInfosItemLink = TaskInfosItem.withComponent(Link);

export const TaskIconText = forwardRef(({icon, content, ...rest}, ref) => (
	<TaskInfosItem {...rest} ref={ref}>
		{icon}
		<TaskInfosContent>{content}</TaskInfosContent>
	</TaskInfosItem>
));

export const LayoutMainElem = styled('div')`
	flex: 1;
`;

export const Input = styled('input')`
	font-family: 'Work Sans', sans-serif;
	font-size: inherit;

	background-color: ${props => (props.error ? lightRed : lightPurple)};
	border-radius: ${props => (props.big ? '24px' : '20px')};
	height: ${props => (props.big ? '48px' : '27px')};
	padding: 0 1rem;
	width: auto;
	border: 1px solid ${props => (props.error ? primaryRed : 'transparent')};
	font-weight: 400;
	color: ${props => (props.error ? primaryRed : primaryPurple)};

	&::placeholder {
		font-weight: normal;
		color: ${props => (props.error ? primaryRed : mediumPurple)};
		font-style: italic;
		font-size: 14px;
	}

	&:disabled {
		background: #f3f3f3;
		color: #7b7980;
	}

	&:focus {
		outline: none;
		box-shadow: none;
		background: #fff;
		border: 1px solid #f5f2fe;
		transition: all 400ms ease;
		color: ${primaryPurple};

		&::placeholder {
			color: ${mediumPurple};
			font-style: italic;
			font-size: 14px;
		}
	}
`;

export const InputLabel = styled('div')`
	${Label} {
		font-size: 12px;
		margin-bottom: 0.8rem;
		margin-left: 1rem;

		${props => props.required
			&& css`
				&::after {
					color: ${primaryRed};
					content: '*';
					padding-left: 5px;
				}
			`};
	}
`;

export const GenericDropdown = styled('div')`
	background: ${primaryWhite};
	border: 1px solid ${mediumGrey};
	box-shadow: 5px 5px 15px ${primaryGrey};
	width: ${props => (props.width ? props.width : 'auto')};

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		left: -1rem;
		width: calc(100% + 2rem);
		box-shadow: 0 0 20rem ${primaryBlack};
	}
`;

export const TaskInputDropdown = styled(GenericDropdown)`
	position: absolute;
	z-index: 2; /* do a portal instead */
	width: 500px;
	top: calc(100% + 15px);
	left: 55px;
`;

export const TaskInputDropdownHeader = styled('p')`
	text-transform: uppercase;
	color: ${gray30};
	margin: 1.5em 2em 0.5em 2em;
`;

export const DueDateInputElem = styled('input')`
	font-family: 'Work sans', sans-serif;
	font-size: inherit;
	color: ${primaryPurple};
	width: 83px;
	display: block;
`;

export const DateInputContainer = styled('div')`
	position: relative;
	display: inline-flex;
`;

export const FilterInput = styled(Input)`
	margin: 3rem 0;
	padding: 0.25rem 1rem;
	padding-left: 3rem;
	border-radius: 1.5rem;
	width: 50%;

	background-position: 1rem center;
	background-repeat: no-repeat;
	background-image: url(${props => props.icon});

	&:focus {
		background-position: calc(1rem + 1px) center;
		background-repeat: no-repeat;
		background-image: url(${props => props.icon});
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		margin: 0.5rem 0;
		width: calc(100% - 4rem);
	}
`;

export const Help = styled('div')`
	position: fixed;
	bottom: 3rem;
	left: 3rem;
	width: 1.5rem;
	height: 1.5rem;
	border: 2px solid transparent;
	border-radius: 50%;
	background-color: ${mediumGrey};
	color: ${primaryBlack};
	line-height: 0;
	font-weight: 500;
	display: ${props => (props.customerToken ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
	cursor: pointer;

	transition: all 300ms ease;

	&:hover {
		border-color: ${primaryPurple};
		color: ${primaryPurple};
		background-color: transparent;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		display: none;
	}
`;

export const Aside = styled('aside')`
	flex-direction: column;
	align-items: stretch;
	flex: 0 0 270px;
	padding-right: 4rem;

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		padding-right: 0;
		margin-top: 2rem;
		width: 100%;
	}
`;

export const Main = styled('div')`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex: 1;
	padding: 1rem;
	padding-bottom: 4rem;
	padding-bottom: 100px;

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		flex-direction: column-reverse;
		padding: 1rem 0;
		padding-bottom: 7rem;
	}
`;

export const Container = styled('div')`
	display: flex;
	width: 100%;

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		flex-direction: column;
	}
`;

export const Content = styled('div')`
	display: flex;
	flex-direction: column;
	flex: 1;
	${props => (props.small ? 'width: 100%' : '')};
	${props => (props.small ? 'max-width: 980px' : '')};
	${props => (props.small ? 'margin: 0 auto' : '')};
`;

export const UL = styled('ul')`
	${props => (props.noBullet ? 'padding: 0' : '')};
	${props => (props.noBullet ? 'list-style-type: none' : '')};
`;

export const LeftMenu = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: end;
	padding: 4rem 3rem;

	> div {
		margin-bottom: 1.4rem;
	}

	@media (max-width: ${BREAKPOINTS.desktopSmall}px) {
		padding: 4rem 1rem;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		flex-direction: row;
		padding: 1rem;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid ${lightGrey};
		z-index: 99;
		background: ${primaryWhite};

		> div {
			margin: 0;
			flex: 1;
			align-items: center;

			div,
			a {
				margin: 0 auto;
				justify-content: space-evenly;
				align-items: center;
				flex: 1;
				text-align: center;
			}
		}
	}
`;

export const IllusContainer = styled('div')`
	height: 660px;
	background: url('${props => props.bg}');
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	display: flex;
`;

export const IllusFigureContainer = styled('div')`
	height: ${props => (props.big ? '70%' : '60%')};
	flex: 1;
	background: url('${props => props.fig}');
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
`;

export const IllusText = styled('div')`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding-right: 70px;
	padding-bottom: 120px;

	${P} {
		font-size: 1.15rem;
	}
`;

export const IllusTextIcon = styled('span')`
	position: relative;
	width: 20px;
	height: 20px;
	display: inline-block;
	font-size: 1rem;
	z-index: 0;
	text-align: center;
	cursor: pointer;

	&:after {
		content: '';
		width: 20px;
		height: 20px;
		position: absolute;
		top: 5px;
		left: 0px;
		background: ${accentGrey};
		border-radius: 50%;
		z-index: -1;
		display: inline-block;
	}

	&:hover {
		color: ${primaryWhite};

		&:after {
			background: ${primaryPurple};
		}
	}
`;

export const UserSpan = styled('span')`
	color: ${primaryPurple};
`;

export const CustomerSpan = styled('span')`
	color: ${primaryRed};
`;

const customSelectStyles = props => ({
	dropdownIndicator: (styles, {isDisabled}) => ({
		...styles,
		color: isDisabled ? primaryGrey : primaryPurple,
		paddingTop: 0,
		paddingBottom: 0,
	}),
	clearIndicator: styles => ({
		...styles,
		color: primaryPurple,
		paddingTop: 0,
		paddingBottom: 0,
	}),
	placeholder: (styles, {isDisabled}) => ({
		...styles,
		color: isDisabled ? lightGrey : lightPurple,
		fontStyle: 'italic',
		fontSize: '14px',
	}),
	singleValue: (styles, {isDisabled}) => ({
		...styles,
		color: isDisabled ? primaryGrey : primaryPurple,
	}),
	input: (styles, {isDisabled}) => ({
		...styles,
		padding: 0,
		color: isDisabled ? primaryGrey : primaryPurple,
	}),
	control: (styles, {isDisabled, big}) => ({
		...styles,
		height: props.big && '40px',
		minHeight: 'auto',
		border: 'none',
		backgroundColor: isDisabled ? 'transparent' : lightPurple,
		padding: '5px',
		borderRadius: '4px',
		':hover, :focus, :active': {
			border: 'none',
		},
	}),
	indicatorSeparator: () => ({
		backgroundColor: 'transparent',
	}),
});

export const Select = ({style, ...rest}) => (
	<ReactSelect
		styles={{...customSelectStyles(rest), ...style}}
		noOptionsMessage={() => 'Aucune option'}
		{...rest}
	/>
);

export const DateContainer = styled('div')`
	position: relative;

	p:hover {
		position: relative;
		cursor: pointer;

		&:before {
			content: '';
			display: block;
			background: ${lightGrey};
			position: absolute;
			left: -0.5rem;
			top: -0.5rem;
			right: -0.5rem;
			bottom: -0.5rem;
			border-radius: 8px;
			z-index: -1;
		}
		&:after {
			content: '';
			display: block;
			background-color: ${accentGrey};
			mask-size: 35%;
			mask-position: center;
			mask-repeat: no-repeat;
			mask-image: url(${Pencil});
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 50px;
		}
	}
`;

export const BigNumber = styled(P)`
	font-size: 20px;
	font-weight: 500;
	color: ${props => (props.urgent ? primaryRed : primaryGrey)};
`;

export const BackButton = styled(Button)`
	align-self: flex-start;
	text-transform: uppercase;
	margin: 1rem 0;
	${props => props.withMargin && 'margin-bottom: 1rem;'}

	::before {
		content: '⇽';
		margin-right: 10px;
	}
`;

export const DragSeparator = styled('div')`
	position: absolute;
	height: 3px;
	width: 100%;
	top: -5px;
	background: ${primaryPurple};
`;

export const CollaboratorLineRow = styled('div')`
	display: flex;
	align-items: center;
	margin-bottom: 1.5rem;
	padding: 0.5rem;
	cursor: pointer;

	&:hover {
		background: ${primaryPurple};
		color: ${primaryWhite};
	}
`;

export const StickyHeader = styled('div')`
	position: sticky;
	top: 0;
	background: ${props => (props.customer ? primaryRed : primaryPurple)};
	margin: -4rem -4rem 1.4rem;
	display: flex;
	justify-content: center;
	padding: 1rem;
	z-index: 1;
	color: ${primaryWhite};

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		margin-left: -2rem;
		margin-right: -2rem;
		padding: 1rem 60px;
		position: static;
		align-items: center;
	}
`;

export const Meta = styled('div')`
	display: flex;
	align-items: flex-start;
	min-height: 1.25rem;
	margin-bottom: 5px;

	i {
		margin-right: 15px;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		margin-bottom: 0;
	}
`;

export const MetaLabel = styled('div')`
	margin-right: 1rem;
	min-width: 40px;

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		display: none;
	}
`;

export const MetaText = styled('span')`
	color: ${primaryPurple};
	flex: 1;
	cursor: ${props => (props.onClick ? 'pointer' : 'initial')};

	:empty::before {
		content: '+';
		border: 1px solid ${primaryPurple};
		border-radius: 50%;
		width: 0.85rem;
		height: 0.8rem;
		font-size: 0.8rem;
		display: flex;
		text-align: center;
		flex-direction: column;
		line-height: 1;
		position: relative;
		top: 2px;
		left: -2px;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		margin-bottom: 1rem;
		flex: 1 auto 100%;
	}
`;

export const MetaTime = styled(MetaText)`
	position: relative;
`;

export const ScrollHelper = styled('div')`
	width: 60px;
	height: 60px;
	position: fixed;
	right: 20px;
	bottom: 150px;
	background-color: rgba(180, 180, 180, 0.5);
	z-index: 1;
	border-radius: 50%;
	align-items: center;
	justify-content: center;
	display: none;
	transition: opacity 5s ease;

	&:hover {
		opacity: 0.2;
		transition: opacity 600ms ease;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		display: flex;
	}
`;

export const TaskCardElem = styled('div')`
	background: ${props => (props.isLive ? primaryPurple : lightGrey)};
	opacity: ${props => (props.isOver ? '.4' : 1)};
	border: 1px solid ${mediumGrey};
	${props => props.customerTask && 'border-bottom: 2px solid #ff3366;'}
	border-radius: 3px;
	padding: 8px;
	margin-bottom: 5px;
	font-size: 0.8rem;
	line-height: 1.4;
	display: grid;
	grid-template-columns: 1fr 1.5rem;
	cursor: pointer;
	position: relative;

	transition: all 300ms ease;
`;

export const TaskIcon = styled('div')`
	cursor: pointer;
	width: 3.5rem;
	height: 3.5rem;
	margin-left: -0.8725rem;
	margin-right: ${props => (props.noData ? '.5rem' : '1rem')};
	overflow: visible;
	background: center no-repeat
		url(${(props) => {
		let {type} = props;

		if (props.assigned) {
			type += '_ASSIGNED';
		}

		const typeInfos
				= ITEM_TYPES.find(t => t.type === type) || ITEM_TYPES[0];

		let icon = typeInfos.iconUrl;

		if (props.status === itemStatuses.FINISHED) {
			icon
					= (props.justUpdated
					? typeInfos.iconUrlValidatedAnim
					: typeInfos.iconUrlValidated) || typeInfos.iconUrl;
		}
		return icon;
	}});
	margin-bottom: 0;

	transform: scale(${props => (props.noData ? 0.75 : '')});

	&:hover {
		background: center no-repeat
			url(${(props) => {
		const typeInfos
					= ITEM_TYPES.find(t => t.type === props.type)
					|| ITEM_TYPES[0];

		if (props.noAnim) {
			return props.status === itemStatuses.FINISHED
				? typeInfos.iconUrlValidated
				: typeInfos.iconUrl;
		}

		return typeInfos.iconUrlValidated || typeInfos.iconUrl;
	}});

		animation: ${props => (props.status === itemStatuses.FINISHED || props.noAnim
		? 'none'
		: 'growth 300ms')};

		@keyframes growth {
			0% {
				background-size: 0% auto;
			}
			50% {
				background-size: 50% auto;
			}
			70% {
				background-size: 40% auto;
			}
			100% {
				background-size: 50% auto;
			}
		}
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		transform: scale(0.6);
		margin: 0;
		position: absolute;
		left: -1rem;
	}
`;

export const Pie = styled('div')`
	width: 18px;
	height: 18px;

	${props => props.big
		&& `
		width: 300px;
		height: 300px;
	`}

	${props => props.medium
		&& `
		width: 44px;
		height: 44px;
	`}

	border-radius: 50%;
	background: ${props => (props.value <= 1
		? '#f2f2f2'
		: props.value >= 2
			? primaryRed
			: primaryBlue)};
	background-image: linear-gradient(
		to right,
		transparent 50%,
		currentColor 0
	);
	color: ${props => (props.value <= 1 ? primaryBlue : primaryRed)};
	position: relative;

	::before {
		content: '';
		display: block;
		margin-left: 50%;
		height: 100%;
		border-radius: 0 100% 100% 0 / 50%;
		background-color: inherit;
		transform-origin: left;
		background: ${props => (props.value % 1 >= 0.5 || props.value >= 2 ? 'currentColor' : '')};
		transform: rotate(
			${props => (props.value < 2 ? props.value % 0.5 : 1)}turn
		);
	}

	::after {
		content: '';
		width: 12px;
		height: 12px;

		${props => props.big
			&& `
			width: 270px;
			height: 270px;
		`}

		${props => props.medium
			&& `
			width: 36px;
			height: 36px;
		`}

		position: absolute;
		top: 3px;
		left: 3px;

		${props => props.big
			&& `
			top: 15px;
			left: 15px;
		`}

		${props => props.medium
			&& `
			top: 4px;
			left: 4px;
		`}

		display: block;
		background: ${primaryWhite};
		border-radius: 50%;
	}
`;

export const Dropdown = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	margin-top: 10px;
	padding: 5px;
	position: absolute;
	width: 400px;
	box-shadow: 0 0 10px ${primaryGrey};
	border-radius: 8px;
	background: ${primaryWhite};

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		width: calc(100% - 10px);
		position: fixed !important;
		padding-top: 3rem;
		top: 0 !important;
		left: 0 !important;
		right: 0 !important;
		bottom: 80px !important;
		height: auto !important;
		z-index: 101;
	}
`;

export const CheckBoxFakeLabel = styled('div')`
	margin-left: 10px;
`;

export const CheckBoxLabel = styled('label')`
	font-size: 14px;
	margin: ${props => (props.condensed ? '0' : '0.5em 0')};
	color: ${props => (props.color ? props.color : primaryPurple)};
	cursor: pointer;

	display: flex;
	align-items: center;

	input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}
`;

export const Table = styled('table')`
	border-collapse: collapse;
	text-align: left;
	width: 100%;
`;

export const RowHeader = styled('tr')`
	border-top: 2px solid ${lightGrey};
	border-bottom: 2px solid ${lightGrey};

	&:after {
		content: '';
		display: block;
		background: none;
		width: 50px;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		display: none;
	}
`;

export const HeaderCell = styled('th')`
	font-weight: normal;
	color: ${accentGrey};
	min-width: 45px;
`;

export const Cell = styled('td')`
	overflow: hidden;
	text-overflow: ellipsis;
	:empty::before {
		content: '\\2014';
	}
`;

export const ActionCell = styled(Cell)`
	display: flex;
	align-items: center;
`;

export const Row = styled('tr')`
	cursor: pointer;
	color: ${primaryBlack};
	border-bottom: 2px solid ${lightGrey};
	position: relative;
	line-height: 1.6;

	td {
		padding: 0.25rem 0;

		@media (max-width: ${BREAKPOINTS.mobile}px) {
			&:first-of-type {
				color: ${primaryPurple};
			}
		}
	}

	${ActionCell} {
		opacity: 0;
	}

	:hover {
		color: ${primaryPurple};

		${ActionCell} {
			opacity: 1;
		}
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		display: grid;
		padding-bottom: 1rem;
	}
`;

export const Actions = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;

	* ~ * {
		margin-left: 2rem;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		flex-direction: column;
		justify-content: flex-start;

		* ~ * {
			margin-left: 0;
			margin-bottom: 0.5rem;
		}
	}
`;
