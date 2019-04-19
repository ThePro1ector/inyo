import React, {memo} from 'react';
import styled from '@emotion/styled/macro';

import Task from './task';

import IllusBackground from '../../utils/images/empty-tasks-background.svg';
import IllusFigure from '../../utils/images/empty-tasks-illus.svg';
import {
	P,
	IllusContainer,
	IllusFigureContainer,
	IllusText,
	UserSpan,
	CustomerSpan,
} from '../../utils/new/design-system';

const TasksListContainer = styled('div')`
	margin-top: 3rem;
`;

function TasksList({items, customerToken, baseUrl}) {
	return (
		<TasksListContainer>
			{items.map(item => (
				<Task
					item={item}
					key={item.id}
					customerToken={customerToken}
					baseUrl={baseUrl}
				/>
			))}
			{items.length === 0 && (
				<IllusContainer bg={IllusBackground}>
					<IllusFigureContainer fig={IllusFigure} />
					<IllusText>
						<P>Aucune tâche à faire pour le moment.</P>
						<P>
							Dites-nous ce que{' '}
							<UserSpan data-tip="Les tâches violettes sont les tâches que vous prévoyez de faire">
								vous
							</UserSpan>{' '}
							souhaitez faire aujourd'hui ou affectez des tâches à{' '}
							<CustomerSpan data-tip="Les tâches roses sont les tâches qui peuvent déclencher des notifications pour votre client">
								votre client
							</CustomerSpan>
							.
						</P>
						<P>
							Cliquez sur l'icône pour choisir un type de tâche.
						</P>
					</IllusText>
				</IllusContainer>
			)}
		</TasksListContainer>
	);
}

export default memo(
	TasksList,
	(prevProps, nextProps) => prevProps
		&& prevProps.items.length === nextProps.items.length
		&& prevProps.items.every(
			(item, i) => item.name === nextProps.items[i].name
				&& item.dueDate === nextProps.items[i].dueDate
				&& item.unit === nextProps.items[i].unit
				&& ((item.linkedCustomer === undefined
					&& nextProps.items[i].linkedCustomer === undefined)
					|| (item.linkedCustomer
						&& nextProps.items[i].linkedCustomer
						&& item.linkedCustomer.id
							=== nextProps.items[i].linkedCustomer.id))
				&& item.status === nextProps.items[i].status,
		)
		&& prevProps.projectId === nextProps.projectId
		&& prevProps.customerId === nextProps.customerId,
);
