import React, {useState} from 'react';
import styled from '@emotion/styled';
import {useQuery} from 'react-apollo-hooks';
import moment from 'moment';
import {useSpring, animated} from 'react-spring';

import {GET_ALL_TASKS, GET_USER_INFOS} from '../../utils/queries';
import {extractScheduleFromWorkingDays} from '../../utils/functions';
import usePrevious from '../../utils/usePrevious';
import {primaryPurple, primaryWhite} from '../../utils/new/design-system';
import {Loading} from '../../utils/content';

const LeftBarContainer = styled('div')`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	z-index: 2;
`;

const DayElem = styled('div')`
	width: calc(100% - 2rem);
	background: ${primaryWhite};
	margin: 1rem 1rem 0;
	box-sizing: border-box;
	height: 100px;
	border-radius: 24px;
	display: flex;
	flex-flow: column;
	align-items: center;
	padding-top: 7px;
	color: ${primaryPurple};
	border: solid 1px ${primaryWhite};
	position: relative;
`;

const DayTaskNumber = styled('div')`
	width: 30px;
	background: ${primaryPurple};
	color: ${primaryWhite};
	font-weight: 600;
	height: 30px;
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 5px;
	font-size: 17px;
`;
const DayDate = styled('div')``;
const DayDateDay = styled('div')`
	text-align: center;
`;
const DayDateNumber = styled('div')`
	font-weight: 600;
`;

const LeftBarElem = styled(animated.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: ${props => (props.open ? '70px' : '0px')};
	transition: width 0.2s ease-out;
	height: 100%;
	background: ${primaryPurple};
	overflow: hidden;
`;

const LeftBarContent = styled('div')`
	width: 70px;
`;

function LeftBarSchedule({isDragging, days, fullWeek}) {
	const [startDay] = useState(moment().startOf('week'));
	const wasOpen = usePrevious(isDragging);
	const animatedProps = useSpring({
		to: async (next) => {
			if (isDragging) {
				await next({
					width: 70,
				});
				await next({width: 70});
			}
			else {
				if (wasOpen) {
					await next({
						width: 70,
					});
				}
				await next({width: 0});
			}
		},
		from: {width: 0},
		config: {
			mass: 0.1,
			tension: 500,
			friction: 10,
			clamp: true,
		},
	});
	const {
		data: userPrefsData,
		loading: loadingUserPrefs,
		error: errorUserPrefs,
	} = useQuery(GET_USER_INFOS, {suspend: true});

	if (loadingUserPrefs) return <Loading />;
	if (errorUserPrefs) throw errorUserPrefs;

	const {workingDays} = userPrefsData.me;
	const iteratorDate = moment(startDay).startOf('week');

	const weekdays = extractScheduleFromWorkingDays(
		workingDays,
		iteratorDate,
		days,
		fullWeek,
		startDay,
	);

	return (
		<LeftBarContainer>
			<LeftBarElem style={animatedProps}>
				<LeftBarContent>
					{weekdays.map(day => (
						<DayElem>
							<DayDate>
								<DayDateDay>
									{day.momentDate
										.toDate()
										.toLocaleDateString('default', {
											weekday: 'narrow',
											day: undefined,
											month: undefined,
											year: undefined,
										})}
								</DayDateDay>
								<DayDateNumber>
									{day.momentDate
										.toDate()
										.toLocaleDateString('default', {
											weekday: undefined,
											day: 'numeric',
											month: undefined,
											year: undefined,
										})}
								</DayDateNumber>
							</DayDate>
							<DayTaskNumber>{day.tasks.length}</DayTaskNumber>
						</DayElem>
					))}
				</LeftBarContent>
			</LeftBarElem>
		</LeftBarContainer>
	);
}

export default LeftBarSchedule;
