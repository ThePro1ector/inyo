import React, {Component} from 'react';
import styled from 'react-emotion';

import TaskSeeOrForm from '../TaskSeeOrForm';
import TaskForm from '../TaskForm';

import {Button} from '../../utils/content';

const TasksListMain = styled('div')`
	width: 70%;
`;

class TasksList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	selectTask = (id) => {
		this.setState({
			selectedTask: id,
		});
	};

	addItem = () => {
		this.setState({
			addingItem: true,
		});
	};

	removeAddItem = () => {
		this.setState({
			addingItem: false,
		});
	};

	updateTask = (id) => {
		// update task
		// unselect task
		this.selectTask();
	};

	unselectTask = () => {
		this.selectTask();
	};

	render() {
		const {tasks, options} = this.props;
		const {selectedTask, addingItem} = this.state;

		const tasksList = tasks.map(task => (
			<TaskSeeOrForm task={task} options={options} />
		));

		const addItem = addingItem && (
			<TaskForm task={{}} cancel={this.removeAddItem} />
		);

		return (
			<TasksListMain>
				{tasksList}
				{addItem}
				{options.noAddItem ? (
					false
				) : (
					<Button onClick={this.addItem}>Add Item</Button>
				)}
			</TasksListMain>
		);
	}
}

TasksList.defaultProps = {
	options: {},
};

export default TasksList;
