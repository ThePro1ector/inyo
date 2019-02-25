import React, {Component} from 'react';
import {Query} from 'react-apollo';
import ReactGA from 'react-ga';
import {ToastContainer, toast} from 'react-toastify';
import {Route} from 'react-router-dom';

import {GET_PROJECT_DATA} from '../../../utils/queries';

import ItemView from '../../../components/ItemView';
import {
	Loading,
	ModalContainer as Modal,
	ModalElem,
} from '../../../utils/content';

import ProjectDisplay from '../../../components/ProjectDisplay';

class TasksListUser extends Component {
	editItem = (itemId, previousSectionId, editData, updateItem) => {
		const {
			name,
			type,
			description,
			unit,
			reviewer,
			position,
			sectionId,
		} = editData;

		updateItem({
			variables: {
				itemId,
				name,
				type,
				description,
				reviewer,
				unit: typeof unit === 'number' ? parseFloat(unit) : undefined,
				position,
				sectionId,
			},
			optimisticResponse: {
				__typename: 'Mutation',
				updateItem: {
					__typename: 'Item',
					id: itemId,
					name,
					unit,
					reviewer,
					description,
					position,
					section: {
						__typename: 'Section',
						id: sectionId || previousSectionId,
					},
				},
			},
			refetchQueries: ['userTasks', 'getItemDetails'],
			update: (cache, {data: {updateItem: updatedItem}}) => {
				window.$crisp.push([
					'set',
					'session:event',
					[[['item_edited', undefined, 'yellow']]],
				]);
				const data = cache.readQuery({
					query: GET_PROJECT_DATA,
					variables: {projectId: this.props.match.params.projectId},
				});
				let section = data.project.sections.find(
					e => e.id === previousSectionId,
				);
				let itemIndex = section.items.findIndex(
					e => e.id === updatedItem.id,
				);

				if (previousSectionId !== updatedItem.section.id) {
					section.items.splice(itemIndex, 1);

					section = data.project.sections.find(
						e => e.id === updatedItem.section.id,
					);
					itemIndex = section.items.length;
				}

				if (itemIndex !== updatedItem.position) {
					const itemsToUpdate
						= updatedItem.position > itemIndex
							? section.items.slice(
								itemIndex + 1,
								updatedItem.position + 1,
							  )
							: section.items.slice(
								updatedItem.position,
								itemIndex,
							  );

					const startIndex
						= updatedItem.position > itemIndex
							? itemIndex
							: updatedItem.position + 1;

					itemsToUpdate.forEach((sectionItem, index) => {
						// eslint-disable-next-line no-param-reassign
						sectionItem.position = startIndex + index;
					});
				}

				const [elementToMove] = section.items.splice(itemIndex, 1);
				const itemPosition
					= typeof updatedItem.position === 'number'
						? updatedItem.position
						: itemIndex;

				section.items.splice(itemPosition, 0, {
					...updatedItem,
					...elementToMove,
					section: undefined,
				});

				cache.writeQuery({
					query: GET_PROJECT_DATA,
					variables: {
						projectId: this.props.match.params.projectId,
					},
					data,
				});

				this.setState({apolloTriggerRenderTemporaryFix: true});
			},
		});
	};

	removeItem = (itemId, sectionId, removeItem) => {
		window.$crisp.push([
			'set',
			'session:event',
			[[['item_removed', undefined, 'yellow']]],
		]);
		removeItem({
			variables: {itemId},
			refetchQueries: ['userTasks'],
			update: (cache, {data: {removeItem: removedItem}}) => {
				const data = cache.readQuery({
					query: GET_PROJECT_DATA,
					variables: {projectId: this.props.match.params.projectId},
				});
				const section = data.project.sections.find(
					e => e.id === sectionId,
				);
				const itemIndex = section.items.findIndex(
					e => e.id === removedItem.id,
				);

				section.items.splice(itemIndex, 1);
				try {
					cache.writeQuery({
						query: GET_PROJECT_DATA,
						variables: {
							projectId: this.props.match.params.projectId,
						},
						data,
					});
				}
				catch (e) {
					throw new Error(e);
				}
				this.setState({apolloTriggerRenderTemporaryFix: true});
			},
		});
	};

	sendAmendment = async (projectId, sendAmendment) => sendAmendment({
		variables: {
			projectId,
		},
		update: (cache, {data: {sendAmendment: sentAmendment}}) => {
			const data = cache.readQuery({
				query: GET_PROJECT_DATA,
				variables: {projectId: this.props.match.params.projectId},
			});

			data.project = sentAmendment;

			try {
				cache.writeQuery({
					query: GET_PROJECT_DATA,
					variables: {
						projectId: this.props.match.params.projectId,
					},
					data,
				});
			}
			catch (e) {
				throw new Error(e);
			}
			window.$crisp.push([
				'set',
				'session:event',
				[[['amendment_sent', undefined, 'blue']]],
			]);
			ReactGA.event({
				category: 'Project',
				action: 'Sent amendment',
			});
			toast.success(
				<div>
					<p>📬 L'avenant a été envoyé !</p>
				</div>,
				{
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 3000,
					onClose: () => this.props.history.push('/app/projects'),
				},
			);
			this.setState({apolloTriggerRenderTemporaryFix: true});
		},
	});

	addItem = (sectionId, addItemValues, addItem) => {
		const {
			name, type, unit, description, reviewer,
		} = addItemValues;

		addItem({
			variables: {
				sectionId,
				name,
				type,
				unit: parseFloat(unit),
				description,
				reviewer,
			},
			refetchQueries: ['userTasks'],
			update: (cache, {data: {addItem: addedItem}}) => {
				window.$crisp.push([
					'set',
					'session:event',
					[[['item_added', undefined, 'yellow']]],
				]);
				const data = cache.readQuery({
					query: GET_PROJECT_DATA,
					variables: {projectId: this.props.match.params.projectId},
				});
				const section = data.project.sections.find(
					e => e.id === sectionId,
				);

				section.items.push(addedItem);
				try {
					cache.writeQuery({
						query: GET_PROJECT_DATA,
						variables: {
							projectId: this.props.match.params.projectId,
						},
						data,
					});
				}
				catch (e) {
					throw new Error(e);
				}
				this.setState({apolloTriggerRenderTemporaryFix: true});
			},
		});
	};

	removeItem = (itemId, sectionId, removeItem) => {
		window.$crisp.push([
			'set',
			'session:event',
			[[['item_removed', undefined, 'yellow']]],
		]);
		removeItem({
			variables: {itemId},
			refetchQueries: ['userTasks'],
			update: (cache, {data: {removeItem: removedItem}}) => {
				const data = cache.readQuery({
					query: GET_PROJECT_DATA,
					variables: {projectId: this.props.match.params.projectId},
				});
				const section = data.project.sections.find(
					e => e.id === sectionId,
				);
				const itemIndex = section.items.findIndex(
					e => e.id === removedItem.id,
				);

				section.items.splice(itemIndex, 1);
				try {
					cache.writeQuery({
						query: GET_PROJECT_DATA,
						variables: {
							projectId: this.props.match.params.projectId,
						},
						data,
					});
				}
				catch (e) {
					throw new Error(e);
				}
				this.setState({apolloTriggerRenderTemporaryFix: true});
			},
		});
	};

	editSection = (sectionId, {name, position}, updateSection) => {
		updateSection({
			variables: {sectionId, name, position},
			optimisticResponse: {
				__typename: 'Mutation',
				updateSection: {
					__typename: 'Section',
					id: sectionId,
					name,
					position,
				},
			},
			update: (cache, {data: {updateSection: updatedSection}}) => {
				window.$crisp.push([
					'set',
					'session:event',
					[[['section_edited', undefined, 'orange']]],
				]);
				const data = cache.readQuery({
					query: GET_PROJECT_DATA,
					variables: {projectId: this.props.match.params.projectId},
				});
				const sectionIndex = data.project.sections.findIndex(
					e => e.id === sectionId,
				);

				const {sections} = data.project;

				if (sectionIndex !== updatedSection.position) {
					const itemsToUpdate
						= updatedSection.position > sectionIndex
							? sections.slice(
								sectionIndex + 1,
								updatedSection.position + 1,
							  )
							: sections.slice(
								updatedSection.position,
								sectionIndex,
							  );

					const startIndex
						= updatedSection.position > sectionIndex
							? sectionIndex
							: updatedSection.position + 1;

					itemsToUpdate.forEach((sectionItem, index) => {
						// eslint-disable-next-line no-param-reassign
						sectionItem.position = startIndex + index;
					});
				}

				const [elementToMove] = sections.splice(sectionIndex, 1);
				const itemPosition
					= typeof updatedSection.position === 'number'
						? updatedSection.position
						: sectionIndex;

				sections.splice(itemPosition, 0, {
					...updatedSection,
					...elementToMove,
				});

				cache.writeQuery({
					query: GET_PROJECT_DATA,
					variables: {
						projectId: this.props.match.params.projectId,
					},
					data,
				});

				this.setState({apolloTriggerRenderTemporaryFix: true});
			},
		});
	};

	addSection = (projectId, addSection) => {
		addSection({
			variables: {projectId, name: 'Nouvelle section'},
			refetchQueries: ['userTasks'],
			update: (cache, {data: {addSection: addedSection}}) => {
				window.$crisp.push([
					'set',
					'session:event',
					[[['section_added', undefined, 'orange']]],
				]);
				const data = cache.readQuery({
					query: GET_PROJECT_DATA,
					variables: {projectId: this.props.match.params.projectId},
				});

				data.project.sections.push(addedSection);
				try {
					cache.writeQuery({
						query: GET_PROJECT_DATA,
						variables: {
							projectId: this.props.match.params.projectId,
						},
						data,
					});
				}
				catch (e) {
					throw new Error(e);
				}
				this.setState({apolloTriggerRenderTemporaryFix: true});
			},
		});
	};

	removeSection = (sectionId, removeSection) => {
		removeSection({
			variables: {sectionId},
			refetchQueries: ['userTasks'],
			update: (cache, {data: {removeSection: removedSection}}) => {
				window.$crisp.push([
					'set',
					'session:event',
					[[['section_removed', undefined, 'orange']]],
				]);
				const data = cache.readQuery({
					query: GET_PROJECT_DATA,
					variables: {projectId: this.props.match.params.projectId},
				});
				const sectionIndex = data.project.sections.findIndex(
					e => e.id === removedSection.id,
				);

				data.project.sections.splice(sectionIndex, 1);
				try {
					cache.writeQuery({
						query: GET_PROJECT_DATA,
						variables: {
							projectId: this.props.match.params.projectId,
						},
						data,
					});
				}
				catch (e) {
					throw new Error(e);
				}
				this.setState({apolloTriggerRenderTemporaryFix: true});
			},
		});
	};

	unfinishItem = async (itemId, sectionId, unfinishItem, token) => unfinishItem({
		variables: {
			itemId,
			token,
		},
		refetchQueries: ['userTasks'],
		optimisticResponse: {
			__typename: 'Mutation',
			unfinishItem: {
				id: itemId,
				status: 'FINISHED',
				__typename: 'Item',
			},
		},
		update: (cache, {data: {unfinishItem: unfinishedItem}}) => {
			window.$crisp.push([
				'set',
				'session:event',
				[[['item_finished', undefined, 'yellow']]],
			]);
			const data = cache.readQuery({
				query: GET_PROJECT_DATA,
				variables: {projectId: this.props.match.params.projectId},
			});
			const section = data.project.sections.find(
				e => e.id === sectionId,
			);
			const itemIndex = section.items.findIndex(
				e => e.id === unfinishedItem.id,
			);

			section.items[itemIndex].status = unfinishedItem.status;

			cache.writeQuery({
				query: GET_PROJECT_DATA,
				variables: {
					projectId: this.props.match.params.projectId,
				},
				data,
			});
			this.setState({apolloTriggerRenderTemporaryFix: true});
		},
	});

	finishItem = async (itemId, sectionId, finishItem, token) => finishItem({
		variables: {
			itemId,
			token,
		},
		refetchQueries: ['userTasks'],
		optimisticResponse: {
			__typename: 'Mutation',
			finishItem: {
				id: itemId,
				status: 'FINISHED',
				__typename: 'Item',
			},
		},
		update: (cache, {data: {finishItem: finishedItem}}) => {
			window.$crisp.push([
				'set',
				'session:event',
				[[['item_finished', undefined, 'yellow']]],
			]);
			const data = cache.readQuery({
				query: GET_PROJECT_DATA,
				variables: {projectId: this.props.match.params.projectId},
			});
			const section = data.project.sections.find(
				e => e.id === sectionId,
			);
			const itemIndex = section.items.findIndex(
				e => e.id === finishedItem.id,
			);

			section.items[itemIndex].status = finishedItem.status;

			cache.writeQuery({
				query: GET_PROJECT_DATA,
				variables: {
					projectId: this.props.match.params.projectId,
				},
				data,
			});
			this.setState({apolloTriggerRenderTemporaryFix: true});
		},
	});

	render() {
		const {projectId} = this.props.match.params;

		return (
			<Query
				query={GET_PROJECT_DATA}
				variables={{projectId}}
				fetchPolicy="network-only"
			>
				{({
					loading, error, data, refetch,
				}) => {
					if (loading) return <Loading />;
					if (error) throw error;

					const {project} = data;
					const timePlanned = project.sections.reduce(
						(timeSectionSum, section) => timeSectionSum
							+ section.items.reduce(
								(itemSum, item) => itemSum + item.unit,
								0,
							),
						0,
					);
					const amendmentEnabled = project.sections.reduce(
						(isSectionUpdated, section) => isSectionUpdated
							|| section.items.reduce(
								(isItemUpdated, item) => isItemUpdated
									|| item.status === 'UPDATED'
									|| item.status === 'ADDED',
								false,
							),
						false,
					);
					const overtime = 0;

					return (
						<div>
							<ToastContainer />
							<ProjectDisplay
								project={project}
								editItem={this.editItem}
								sendAmendment={this.sendAmendment}
								timePlanned={timePlanned}
								amendmentEnabled={amendmentEnabled}
								overtime={overtime}
								removeItem={this.removeItem}
								editSection={this.editSection}
								addSection={this.addSection}
								removeSection={this.removeSection}
								addItem={this.addItem}
								removeItem={this.removeItem}
								finishItem={this.finishItem}
								unfinishItem={this.unfinishItem}
								issuer={project.issuer}
								refetch={refetch}
								mode="see"
							/>
							<Route
								path="/app/projects/:projectId/see/items/:itemId"
								render={({match, history}) => (
									<Modal
										onDismiss={() => history.push(
											`/app/projects/${projectId}/see`,
										)
										}
									>
										<ModalElem>
											<ItemView
												id={match.params.itemId}
												finishItem={this.finishItem}
												unfinishItem={this.unfinishItem}
												projectUrl={`/app/projects/${projectId}/see`}
											/>
										</ModalElem>
									</Modal>
								)}
							/>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default TasksListUser;