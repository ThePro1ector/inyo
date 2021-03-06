import Portal from '@reach/portal';
import React, {useEffect, useRef, useState} from 'react';

import fbt from '../../fbt/fbt.macro';
import {formatName} from '../../utils/functions';
import {Meta, MetaLabel, MetaText} from '../../utils/new/design-system';
import useOnClickOutside from '../../utils/useOnClickOutside';
import CollaboratorDropdown from '../CollaboratorDropdown';
import MaterialIcon from '../MaterialIcon';
import Tooltip from '../Tooltip';

function ItemViewAssigneeInput({
	customerToken,
	assignee,
	linkedCollaborators,
	taskId,
}) {
	const [editAssignee, setEditAssignee] = useState(false);
	const [dropdownStyle, setDropdownStyle] = useState(false);
	const containerRef = useRef();
	const dropdownRef = useRef();

	useOnClickOutside(dropdownRef, () => {
		setEditAssignee(false);
	});

	useEffect(() => {
		if (editAssignee) {
			const pos = containerRef.current.getBoundingClientRect();

			setDropdownStyle({
				position: 'absolute',
				top: `${pos.bottom + window.scrollY}px`,
				left: `${pos.left}px`,
			});
		}
	}, [editAssignee]);

	return (
		<>
			<Tooltip
				label={
					<fbt project="inyo" desc="tooltip item view assignee input">
						Personne assigné a la tâche
					</fbt>
				}
			>
				<Meta>
					<MaterialIcon icon="face" size="tiny" />
					<MetaLabel>
						<fbt
							project="inyo"
							desc="assigned at label item view assignee input"
						>
							Assigné à
						</fbt>
					</MetaLabel>
					<MetaText
						ref={containerRef}
						onClick={
							customerToken
								? undefined
								: () => setEditAssignee(true)
						}
					>
						{(assignee
							&& formatName(
								assignee.firstName,
								assignee.lastName,
							)) || <>&mdash;</>}
					</MetaText>
				</Meta>
			</Tooltip>
			{!customerToken && editAssignee && (
				<Portal>
					<div ref={dropdownRef} style={dropdownStyle}>
						<CollaboratorDropdown
							assignee={assignee}
							taskId={taskId}
							collaborators={linkedCollaborators}
						/>
					</div>
				</Portal>
			)}
		</>
	);
}

export default ItemViewAssigneeInput;
