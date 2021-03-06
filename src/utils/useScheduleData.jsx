import {useMemo} from 'react';
import {useQuery} from './apollo-hooks';
import {GET_ALL_TASKS_SHORT, GET_SCHEDULE} from './queries';

const useScheduleData = ({startingFrom} = {}) => {
	const {data: dataTasks, loading: loadingTasks} = useQuery(
		GET_ALL_TASKS_SHORT,
		{
			variables: {schedule: 'TO_BE_RESCHEDULED'},
			pollInterval: 1000 * 60 * 10 // refresh tasks every 10 min
		}
	);
	const {data, loading} = useQuery(GET_SCHEDULE, {
		fetchPolicy: 'cache-and-network',
		variables: {start: startingFrom},
		pollInterval: 1000 * 60 * 10 // refresh tasks every 10 min
	});

	return useMemo(() => {
		if (
			(loading && !(data && data.me && data.me.schedule)) ||
			loadingTasks
		) {
			return {
				loading: true,
				scheduledTasksPerDay: {},
				tasksToReschedule: []
			};
		}

		const {
			me: {id, schedule}
		} = data;

		const scheduledTasksPerDay = {};

		schedule.forEach(day => {
			scheduledTasksPerDay[day.date] = {
				...day,
				deadlines: day.deadlines.map(d => ({
					...d,
					project: d.projectStatus ? d : undefined,
					task: d.status ? d : undefined
				})),
				tasks: day.tasks.filter(
					t => !(t.owner.id === id && t.assignee)
				),
				assignedTasks: day.tasks.filter(
					t => t.owner.id === id && t.assignee
				)
			};
		});

		return {
			scheduledTasksPerDay,
			tasksToReschedule: dataTasks.me.tasks
		};
	}, [data, loading, dataTasks, loadingTasks]);
};

export default useScheduleData;
