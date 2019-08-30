import styled from '@emotion/styled';
import React from 'react';
import {Route, withRouter} from 'react-router-dom';

import TagListForm from '../../../components/TagListForm';
import fbt from '../../../fbt/fbt.macro';
import {ModalContainer as Modal, ModalElem} from '../../../utils/content';
import {SubHeading} from '../../../utils/new/design-system';
import Dashboard from '../Dashboard';
import TasksList from '../Tasks/tasks-lists';

const ProjectMain = styled('div')`
	min-height: 100vh;
`;

function Tags({location: {state = {}}, history}) {
	const Background = state.prevLocation.pathname.includes('tasks')
		? TasksList
		: Dashboard;

	return (
		<ProjectMain>
			<Route path="/app/tags" component={Background} />
			<Modal
				onDismiss={() => history.push({
					pathname: state.prevLocation.pathname,
					state: {
						prevSearch:
								state.prevLocation.search || state.prevSearch,
					},
				})
				}
			>
				<ModalElem>
					<SubHeading>
						<fbt project="inyo" desc="tag list">
							Liste des tags
						</fbt>
					</SubHeading>
					<TagListForm />
				</ModalElem>
			</Modal>
		</ProjectMain>
	);
}

export default withRouter(Tags);
