import React, {useState} from 'react';
import styled from '@emotion/styled';
import {useQuery, useMutation} from 'react-apollo-hooks';

import ConfirmModal from '../ConfirmModal';
import CustomerNameAndAddress from '../CustomerNameAndAddress';
import {primaryBlue, ModalContainer, P} from '../../utils/content';
import StaticCustomerView from '../StaticCustomerView';

import {ReactComponent as EyeIcon} from '../../utils/icons/eye.svg';

import {GET_PROJECT_INFOS} from '../../utils/queries';
import {UPDATE_PROJECT, REMOVE_PROJECT} from '../../utils/mutations';
import {SubHeading, Button, primaryPurple} from '../../utils/new/design-system';

const Aside = styled('aside')`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 270px;
	padding-left: 30px;
`;

const SubSection = styled('div')`
	margin: 3rem 0;

	:first-child {
		margin-top: 0;
	}
`;

const ClientPreviewIcon = styled(EyeIcon)`
	vertical-align: middle;
	margin-top: -2px;
	width: 16px;
	margin-right: 10px;
	margin-left: 4px;
`;

const PreviewModal = styled(ModalContainer)`
	min-height: 600px;
	padding: 0;
`;

const Notice = styled(P)`
	color: #fff;
	background: ${primaryPurple};
	padding: 10px;
	text-align: center;
	margin: 0;
`;

const CheckBoxLabel = styled('label')`
	font-size: 13px;
	margin: 0.5em 0;
	color: ${primaryPurple};
	cursor: pointer;

	input[type='checkbox'] {
		margin-left: 0.4em;
		margin-right: 0.8em;
		margin-top: -1px;
	}
`;

const SidebarProjectInfos = ({projectId, hasClientAttributedTasks}) => {
	const [isCustomerPreviewOpen, setCustomerPreview] = useState(false);
	const [askNotifyActivityConfirm, setAskNotifyActivityConfirm] = useState(
		null,
	);
	const updateProject = useMutation(UPDATE_PROJECT);
	const removeProject = useMutation(REMOVE_PROJECT);
	const {data, error} = useQuery(GET_PROJECT_INFOS, {
		variables: {projectId},
	});

	if (error) throw error;

	const {project} = data;

	return (
		<Aside>
			{/* <SubSection>
				<SubHeading>Menu projet</SubHeading>
			</SubSection> */}

			<SubSection>
				<CustomerNameAndAddress customer={project.customer} />
			</SubSection>

			<CheckBoxLabel>
				<input
					type="checkbox"
					checked={project.notifyActivityToCustomer}
					onChange={async () => {
						if (project.notifyActivityToCustomer) {
							const confirmed = await new Promise(resolve => setAskNotifyActivityConfirm(resolve));

							setAskNotifyActivityConfirm(null);

							if (!confirmed) {
								return;
							}
						}

						await updateProject({
							variables: {
								projectId: project.id,
								notifyActivityToCustomer: !project.notifyActivityToCustomer,
							},
						});
					}}
				/>
				Notifier mon client par email
			</CheckBoxLabel>
			{askNotifyActivityConfirm && (
				<ConfirmModal
					onConfirm={confirmed => askNotifyActivityConfirm(confirmed)}
					closeModal={() => askNotifyActivityConfirm(false)}
				>
					<P>
						En décochant cette option, votre client ne recevra
						aucune notification de l'avancée de votre projet.
					</P>
					{hasClientAttributedTasks && (
						<P>
							Cependant, certaines des tâches sont attribuées à
							votre client et nécessitent l'envoi d'emails à
							celui-ci. Désactiver les notifications changera
							aussi l'attribution de ces tâches et votre client
							n'en sera pas averti.
						</P>
					)}
					<P>Êtes-vous sûr de vouloir continuer?</P>
				</ConfirmModal>
			)}
			<Button link onClick={() => setCustomerPreview(true)}>
				<ClientPreviewIcon />
				<span>Voir la vue de mon client</span>
			</Button>

			{isCustomerPreviewOpen && (
				<PreviewModal
					size="large"
					onDismiss={() => setCustomerPreview(false)}
				>
					<Notice>
						Cette vue est celle que verra votre client lorsqu'il
						devra effectuer des actions.
					</Notice>
					<StaticCustomerView projectId={project.id} />
				</PreviewModal>
			)}

			<SubSection>
				<SubHeading>Marge jours restants</SubHeading>
			</SubSection>

			<Button red onClick={removeProject}>
				Supprimer le projet
			</Button>
		</Aside>
	);
};

export default SidebarProjectInfos;
