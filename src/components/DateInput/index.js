import styled from '@emotion/styled/macro';
import {useRect} from '@reach/rect';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {DayPickerSingleDateController} from 'react-dates';

import fbt from '../../fbt/fbt.macro';
import {BREAKPOINTS} from '../../utils/constants';
import {primaryGrey, primaryPurple} from '../../utils/new/design-system';

const AnchorPlacement = styled('div')`
	position: absolute;
	left: calc(100% + 5px);
	top: 0px;
`;

const TaskDateInput = styled('div')`
	position: absolute;
	display: flex;
	${props => (props.position === 'left'
		? 'right: calc(100% + 5px);'
		: 'left: calc(100% + 5px);')}
	top: 0px;
	z-index: 1;

	.CalendarDay__selected,
	.CalendarDay__selected:active,
	.CalendarDay__selected:hover {
		background-color: ${primaryPurple};
		border-color: ${primaryPurple};
	}
	.DayPickerKeyboardShortcuts_show__bottomRight {
		display: none;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		left: 0;
	}
`;

const MarginMessage = styled('div')`
	color: ${primaryGrey};
	margin: 20px;
	font-style: italic;
`;

class InyoDayPickerSingleDateController extends DayPickerSingleDateController {
	onDayMouseEnter(day) {
		super.onDayMouseEnter(day);

		this.props.onDayMouseEnter && this.props.onDayMouseEnter(day);
	}

	onDayMouseLeave(day) {
		super.onDayMouseLeave(day);

		this.props.onDayMouseLeave && this.props.onDayMouseLeave(day);
	}
}

export default function ({
	innerRef,
	duration,
	noInfo,
	startDate = moment(),
	position: fixedPosition,
	...rest
}) {
	const [focused, setFocused] = useState(false);
	const [currentDate, setCurrentDate] = useState(rest.date);
	const anchorRef = useRef();
	const dateRef = useRef();
	const pannelRect = useRect(dateRef, true);
	const anchorRect = useRect(anchorRef, true);

	const margin = currentDate.diff(moment(), 'days') - duration;
	const displayInfo = !noInfo && typeof duration === 'number';

	const isContainedWithinWindowWidth
		= anchorRect && pannelRect
			? anchorRect.left + pannelRect.width < window.innerWidth
			: true;
	const position = isContainedWithinWindowWidth ? 'right' : 'left';

	return (
		<>
			<AnchorPlacement ref={anchorRef} />
			<TaskDateInput
				ref={(node) => {
					if (innerRef) innerRef.current = node;
					dateRef.current = node;
				}}
				position={fixedPosition || position}
			>
				<InyoDayPickerSingleDateController
					focused={focused}
					onFocusChange={setFocused}
					onDayMouseEnter={(day) => {
						if (!day.isBefore(moment())) {
							setCurrentDate(day);
						}
					}}
					isDayBlocked={day => day.isBefore(startDate)}
					renderCalendarInfo={() => displayInfo && (
						<MarginMessage>
							<fbt
								project="inyo"
								desc="Date input margin message"
							>
									Cela vous laisse{' '}
								<fbt:plural
									count={margin}
									name="days of margin"
									showCount="yes"
									many="jours"
								>
										jour
								</fbt:plural>{' '}
									pour commencer cette tâche
							</fbt>
						</MarginMessage>
					)
					}
					{...rest}
				/>
			</TaskDateInput>
		</>
	);
}
