import gql from 'graphql-tag'; // eslint-disable-line import/no-extraneous-dependencies

import {
	ITEM_FRAGMENT,
	PROJECT_CUSTOMER_FRAGMENT,
	PROJECT_SHORT_FRAGMENT,
	REMINDER_FRAGMENT,
	SHORT_TASK_FRAGMENT,
	TAG_FRAGMENT,
} from './fragments';

/** ******** USER GENERIC MUTATIONS ********* */
export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				email
				hmacIntercomId
				firstName
				lastName
				workingDays
				startWorkAt
				endWorkAt
				startBreakAt
				endBreakAt
				timeZone
				company {
					phone
				}
			}
		}
	}
`;

export const SIGNUP = gql`
	mutation signup(
		$email: String!
		$password: String!
		$firstName: String!
		$lastName: String!
		$referrer: String
		$settings: SettingsInput!
	) {
		signup(
			email: $email
			password: $password
			firstName: $firstName
			lastName: $lastName
			referrer: $referrer
			settings: $settings
		) {
			token
			user {
				id
				email
				hmacIntercomId
				firstName
				lastName
				settings {
					language
				}
				company {
					phone
				}
			}
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser($firstName: String, $lastName: String, $email: String) {
		updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
			id
			email
			firstName
			lastName
			startWorkAt
			endWorkAt
			startBreakAt
			endBreakAt
			workingDays
			company {
				id
				name
				email
				address {
					street
					city
					postalCode
					country
				}
				phone
				vat
			}
		}
	}
`;

export const UPDATE_USER_CONSTANTS = gql`
	mutation updateUserConstant(
		$workingFields: [String!]
		$skills: [Skill!]
		$otherSkill: String
		$jobType: JobType
		$interestedFeatures: [String!]
		$hasUpcomingProject: Boolean
		$canBeContacted: Boolean
		$otherPain: String
		$startWorkAt: Time
		$endWorkAt: Time
		$startBreakAt: Time
		$endBreakAt: Time
		$company: CompanyInput
		$workingDays: [DAY!]
		$timeZone: TimeZone
		$hasFullWeekSchedule: Boolean
		$defaultDailyPrice: Int
	) {
		updateUser(
			workingFields: $workingFields
			skills: $skills
			otherSkill: $otherSkill
			jobType: $jobType
			interestedFeatures: $interestedFeatures
			hasUpcomingProject: $hasUpcomingProject
			canBeContacted: $canBeContacted
			otherPain: $otherPain
			company: $company
			startWorkAt: $startWorkAt
			endWorkAt: $endWorkAt
			startBreakAt: $startBreakAt
			endBreakAt: $endBreakAt
			workingDays: $workingDays
			timeZone: $timeZone
			settings: {hasFullWeekSchedule: $hasFullWeekSchedule}
			defaultDailyPrice: $defaultDailyPrice
		) {
			id
			email
			firstName
			lastName
			workingFields
			jobType
			interestedFeatures
			hasUpcomingProject
			startWorkAt
			endWorkAt
			startBreakAt
			endBreakAt
			workingDays
			timeZone
			defaultDailyPrice
			settings {
				hasFullWeekSchedule
			}
			company {
				id
				name
				email
				address {
					street
					city
					postalCode
					country
				}
				phone
				vat
			}
		}
	}
`;

// Update User settings
export const UPDATE_USER_SETTINGS = gql`
	mutation updateUserSettings($settings: SettingsInput!) {
		updateUser(settings: $settings) {
			id
			email
			firstName
			lastName
			workingFields
			jobType
			interestedFeatures
			hasUpcomingProject
			company {
				id
				name
				email
				address {
					street
					city
					postalCode
					country
				}
				phone
				vat
			}
			settings {
				assistantName
				language
			}
		}
	}
`;
/** ******** COMPANY MUTATIONS ********* */

export const UPDATE_USER_COMPANY = gql`
	mutation updateUserCompany($company: CompanyInput) {
		updateUser(company: $company) {
			id
			email
			firstName
			lastName
			company {
				id
				name
				email
				logo {
					id
					url
				}
				banner {
					... on File {
						id
						url
					}
					... on UnsplashPhoto {
						id
						urls {
							small
						}
					}
				}
				documents {
					id
					filename
					url
					owner {
						... on User {
							firstName
							lastName
						}
					}
				}
				address {
					street
					city
					postalCode
					country
				}
				phone
				vat
			}
		}
	}
`;

/** ******** PROJECT MUTATIONS ********* */

export const CREATE_PROJECT = gql`
	${PROJECT_SHORT_FRAGMENT}
	${PROJECT_CUSTOMER_FRAGMENT}
	${ITEM_FRAGMENT}

	# creating project with a customer id or a new customer
	mutation createProject(
		$customerId: ID
		$name: String
		$customer: CustomerInput
		$template: ProjectTemplate
		$sections: [SectionInput!]
		$deadline: DateTime
		$budget: Float
		$notifyActivityToCustomer: Boolean
	) {
		createProject(
			customerId: $customerId
			customer: $customer
			template: $template
			sections: $sections
			name: $name
			deadline: $deadline
			budget: $budget
			notifyActivityToCustomer: $notifyActivityToCustomer
		) {
			...ProjectShortFragment
			customer {
				...ProjectCustomerFragment
			}
			sections {
				id
				items {
					...ItemFragment
				}
			}
		}
	}
`;
export const UPDATE_PROJECT = gql`
	${PROJECT_CUSTOMER_FRAGMENT}
	${ITEM_FRAGMENT}
	${PROJECT_SHORT_FRAGMENT}

	# creating project with a customer id or a new customer
	mutation updateProject(
		$projectId: ID!
		$name: String
		$deadline: DateTime
		$budget: Float
		$notifyActivityToCustomer: Boolean
		$customerId: ID
		$customer: CustomerInput
	) {
		updateProject(
			id: $projectId
			name: $name
			deadline: $deadline
			budget: $budget
			notifyActivityToCustomer: $notifyActivityToCustomer
			customerId: $customerId
			customer: $customer
		) {
			...ProjectShortFragment
			customer {
				...ProjectCustomerFragment
			}
			sections {
				id
				items {
					...ItemFragment
				}
			}
		}
	}
`;

export const UPDATE_PROJECT_PERSONAL_NOTES = gql`
	mutation updateProject($id: ID!, $notes: Json) {
		updateProject(id: $id, personalNotes: $notes) {
			id
			personalNotes
		}
	}
`;

export const UPDATE_PROJECT_SHARED_NOTES = gql`
	mutation updateProject($id: ID!, $notes: Json) {
		updateProject(id: $id, sharedNotes: $notes) {
			id
			sharedNotes
		}
	}
`;

export const UPDATE_PROJECT_QUOTE = gql`
	mutation updateProject($id: ID!, $quoteHeader: Json, $quoteFooter: Json) {
		updateProject(
			id: $id
			quoteHeader: $quoteHeader
			quoteFooter: $quoteFooter
		) {
			id
			quoteHeader
			quoteFooter
		}
	}
`;

export const START_PROJECT = gql`
	# creating project with a customer id or a new customer
	mutation startProject($projectId: ID!, $notifyCustomer: Boolean) {
		startProject(id: $projectId, notifyCustomer: $notifyCustomer) {
			id
			status
			viewedByCustomer
		}
	}
`;

export const ARCHIVE_PROJECT = gql`
	${PROJECT_CUSTOMER_FRAGMENT}
	${ITEM_FRAGMENT}
	${PROJECT_SHORT_FRAGMENT}

	mutation archiveProject($projectId: ID!) {
		archiveProject(id: $projectId) {
			...ProjectShortFragment
			customer {
				...ProjectCustomerFragment
			}
			sections {
				id
				items {
					id
					...ItemFragment
				}
			}
		}
	}
`;

export const UNARCHIVE_PROJECT = gql`
	${PROJECT_CUSTOMER_FRAGMENT}
	${ITEM_FRAGMENT}
	${PROJECT_SHORT_FRAGMENT}

	mutation unarchiveProject($projectId: ID!) {
		unarchiveProject(id: $projectId) {
			...ProjectShortFragment
			customer {
				...ProjectCustomerFragment
			}
			sections {
				id
				items {
					id
					...ItemFragment
				}
			}
		}
	}
`;

export const REMOVE_PROJECT = gql`
	${PROJECT_CUSTOMER_FRAGMENT}
	${ITEM_FRAGMENT}
	${PROJECT_SHORT_FRAGMENT}

	mutation removeProject($projectId: ID!) {
		removeProject(id: $projectId) {
			...ProjectShortFragment
			customer {
				...ProjectCustomerFragment
			}
			sections {
				id
				items {
					id
					...ItemFragment
				}
			}
		}
	}
`;

export const FINISH_PROJECT = gql`
	mutation finishProject($projectId: ID!) {
		finishProject(id: $projectId) {
			id
			status
		}
	}
`;

// Section
export const ADD_SECTION = gql`
	${ITEM_FRAGMENT}
	${PROJECT_SHORT_FRAGMENT}

	mutation addSection(
		$projectId: ID!
		$name: String!
		$items: [ItemInput!]
		$position: Int
	) {
		addSection(
			projectId: $projectId
			name: $name
			items: $items
			position: $position
		) {
			id
			name
			position
			project {
				...ProjectShortFragment
				sections {
					id
					name
				}
				customer {
					id
					name
				}
			}
			items {
				...ItemFragment
			}
		}
	}
`;
export const UPDATE_SECTION = gql`
	${ITEM_FRAGMENT}
	${PROJECT_SHORT_FRAGMENT}

	mutation updateSection(
		$sectionId: ID!
		$name: String
		$position: Int
		$price: Float
	) {
		updateSection(
			id: $sectionId
			name: $name
			position: $position
			price: $price
		) {
			id
			name
			position
			price
			project {
				...ProjectShortFragment
				customer {
					id
					name
				}
			}
			items {
				...ItemFragment
			}
		}
	}
`;
export const REMOVE_SECTION = gql`
	mutation removeSection($sectionId: ID!) {
		removeSection(id: $sectionId) {
			id
		}
	}
`;

// Item
export const ADD_ITEM = gql`
	${ITEM_FRAGMENT}

	mutation addItem(
		$sectionId: ID
		$projectId: ID
		$name: String!
		$type: ItemType
		$unit: Float
		$description: String
		$dueDate: DateTime
		$linkedCustomerId: ID
		$linkedCustomer: CustomerInput
		$tags: [ID!]
		$position: Int
	) {
		addItem(
			sectionId: $sectionId
			projectId: $projectId
			name: $name
			type: $type
			unit: $unit
			description: $description
			dueDate: $dueDate
			linkedCustomerId: $linkedCustomerId
			linkedCustomer: $linkedCustomer
			tags: $tags
			position: $position
		) {
			...ItemFragment
		}
	}
`;
export const UPDATE_ITEM = gql`
	${ITEM_FRAGMENT}

	mutation updateItem(
		$itemId: ID!
		$comment: CommentInput
		$description: String
		$dueDate: DateTime
		$linkedCustomerId: ID
		$linkedCustomer: CustomerInput
		$name: String
		$position: Int
		$sectionId: ID
		$projectId: ID
		$token: String
		$type: ItemType
		$unit: Float
		$timeItTook: Float
		$tags: [ID!]
		$dailyRate: Float
	) {
		updateItem(
			id: $itemId
			comment: $comment
			description: $description
			dueDate: $dueDate
			linkedCustomerId: $linkedCustomerId
			linkedCustomer: $linkedCustomer
			name: $name
			position: $position
			sectionId: $sectionId
			projectId: $projectId
			token: $token
			type: $type
			unit: $unit
			timeItTook: $timeItTook
			tags: $tags
			dailyRate: $dailyRate
		) {
			...ItemFragment
		}
	}
`;

export const FINISH_ITEM = gql`
	${SHORT_TASK_FRAGMENT}

	mutation finishItem($itemId: ID!, $timeItTook: Float, $for: Date) {
		finishItem(id: $itemId, timeItTook: $timeItTook, for: $for) {
			...ShortTaskFragment
		}
	}
`;

export const UNFINISH_ITEM = gql`
	${ITEM_FRAGMENT}

	mutation unfinishItem($itemId: ID!, $for: Date) {
		unfinishItem(id: $itemId, for: $for) {
			...ItemFragment
		}
	}
`;

export const REMOVE_ITEM = gql`
	mutation removeItem($itemId: ID!) {
		removeItem(id: $itemId) {
			id
		}
	}
`;

export const FOCUS_TASK = gql`
	${ITEM_FRAGMENT}

	mutation focusTask(
		$itemId: ID!
		$reminders: [ReminderInput]
		$from: Date
		$for: Date
		$schedulePosition: Int
		$action: FocusActionType
	) {
		focusTask(
			id: $itemId
			reminders: $reminders
			from: $from
			for: $for
			schedulePosition: $schedulePosition
			action: $action
		) {
			...ItemFragment
		}
	}
`;

export const UNFOCUS_TASK = gql`
	${ITEM_FRAGMENT}

	mutation unfocusTask($itemId: ID!, $from: Date) {
		unfocusTask(id: $itemId, from: $from) {
			...ItemFragment
		}
	}
`;

export const ACCEPT_ITEM = gql`
	mutation acceptItem($itemId: ID!, $token: String!) {
		acceptItem(id: $itemId, token: $token) {
			id
			status
			unit
		}
	}
`;

export const REJECT_ITEM = gql`
	mutation rejectItem($itemId: ID!, $token: String!) {
		rejectItem(id: $itemId, token: $token) {
			id
			status
			unit
		}
	}
`;

export const POST_COMMENT = gql`
	mutation postComment(
		$itemId: ID!
		$token: String
		$comment: CommentInput!
	) {
		postComment(itemId: $itemId, token: $token, comment: $comment) {
			id
			comments {
				createdAt
				id
				text
				views {
					viewer {
						... on User {
							firstName
							lastName
						}
						... on Customer {
							firstName
							lastName
							name
						}
					}
				}
				author {
					... on User {
						firstName
						lastName
					}
					... on Customer {
						firstName
						lastName
						name
					}
				}
			}
		}
	}
`;

export const CHECK_UNIQUE_EMAIL = gql`
	mutation checkEmailAvailability($email: String!) {
		isAvailable: checkEmailAvailability(email: $email)
	}
`;

export const CREATE_CUSTOMER = gql`
	mutation createCustomer(
		$email: String!
		$name: String
		$firstName: String
		$lastName: String
		$title: Title
		$phone: String
		$occupation: String
		$address: AddressInput
		$userNotes: Json
	) {
		createCustomer(
			email: $email
			name: $name
			firstName: $firstName
			lastName: $lastName
			title: $title
			phone: $phone
			occupation: $occupation
			address: $address
			userNotes: $userNotes
		) {
			id
			title
			firstName
			lastName
			name
			email
			phone
			occupation
			address {
				street
				city
				postalCode
				country
			}
			userNotes
		}
	}
`;

export const UPDATE_CUSTOMER = gql`
	mutation updateCustomer(
		$id: ID!
		$email: String!
		$name: String!
		$firstName: String
		$lastName: String
		$title: Title
		$phone: String
		$occupation: String
		$address: AddressInput
		$userNotes: Json
	) {
		updateCustomer(
			id: $id
			title: $title
			name: $name
			firstName: $firstName
			lastName: $lastName
			email: $email
			phone: $phone
			occupation: $occupation
			address: $address
			userNotes: $userNotes
		) {
			id
			title
			firstName
			lastName
			name
			email
			phone
			occupation
			address {
				street
				city
				postalCode
				country
			}
			userNotes
		}
	}
`;

export const UPLOAD_ATTACHMENTS = gql`
	mutation uploadAttachments(
		$token: String
		$taskId: ID
		$projectId: ID
		$files: [Upload!]!
		$documentType: DocumentType
	) {
		uploadAttachments(
			token: $token
			files: $files
			taskId: $taskId
			projectId: $projectId
			documentType: $documentType
		) {
			id
			filename
			url
			documentType
			createdAt
			owner {
				__typename
				... on User {
					id
					firstName
					lastName
				}
				... on Customer {
					id
					firstName
					lastName
					name
				}
			}
		}
	}
`;

export const REMOVE_ATTACHMENTS = gql`
	mutation removeAttachment($attachmentId: ID!) {
		removeFile(id: $attachmentId) {
			id
		}
	}
`;

export const REMOVE_CUSTOMER = gql`
	mutation removeCustomer($id: ID!) {
		removeCustomer(id: $id) {
			id
		}
	}
`;

export const CANCEL_REMINDER = gql`
	${REMINDER_FRAGMENT}

	mutation cancelReminder($id: ID!) {
		cancelReminder(id: $id) {
			...ReminderFragment
		}
	}
`;

export const SEND_REMINDER_TEST_EMAIL = gql`
	mutation sendReminderTestEmail($id: ID!) {
		sent: sendReminderTestEmail(id: $id)
	}
`;

export const SEND_REMINDER_PREVIEW_TEST_EMAIL = gql`
	mutation sendReminderPreviewTestEmail($taskId: ID!, $type: ReminderType!) {
		sent: sendReminderPreviewTestEmail(taskId: $taskId, type: $type)
	}
`;

export const MARK_NOTIFICATIONS_AS_READ = gql`
	mutation markNotificationsAsRead {
		marked: markNotificationsAsRead
	}
`;

export const CREATE_TAG = gql`
	${TAG_FRAGMENT}

	mutation createTag($name: String!, $colorBg: String!, $colorText: String!) {
		createTag(name: $name, colorBg: $colorBg, colorText: $colorText) {
			...TagFragment
		}
	}
`;

export const UPDATE_TAG = gql`
	${TAG_FRAGMENT}

	mutation updateTag(
		$id: ID!
		$name: String
		$colorBg: String
		$colorText: String
	) {
		updateTag(
			id: $id
			name: $name
			colorBg: $colorBg
			colorText: $colorText
		) {
			...TagFragment
		}
	}
`;

export const REMOVE_TAG = gql`
	mutation removeTag($id: ID!) {
		removeTag(id: $id) {
			id
		}
	}
`;

export const REQUEST_COLLAB = gql`
	mutation requestCollab(
		$userEmail: String!
		$inviteSignup: Boolean
		$projectId: ID
	) {
		requestCollab(
			userEmail: $userEmail
			inviteSignup: $inviteSignup
			projectId: $projectId
		) {
			id
			status
			requestee {
				id
				firstName
				lastName
				email
			}
			requesteeEmail
		}
	}
`;

export const ACCEPT_COLLAB_REQUEST = gql`
	mutation acceptCollabRequest($requestId: ID!) {
		acceptCollabRequest(requestId: $requestId) {
			id
			status
			requester {
				id
				firstName
				lastName
				email
			}
		}
	}
`;

export const REJECT_COLLAB_REQUEST = gql`
	mutation rejectCollabRequest($requestId: ID!) {
		rejectCollabRequest(requestId: $requestId) {
			id
			status
			requester {
				id
				firstName
				lastName
				email
			}
		}
	}
`;

export const LINK_TO_PROJECT = gql`
	mutation linkToProject($collaboratorId: ID!, $projectId: ID!) {
		linkToProject(collaboratorId: $collaboratorId, projectId: $projectId) {
			id
			linkedCollaborators {
				id
			}
		}
	}
`;

export const REMOVE_LINK_TO_PROJECT = gql`
	mutation removeLinkToProject($collaboratorId: ID!, $projectId: ID!) {
		removeLinkToProject(
			collaboratorId: $collaboratorId
			projectId: $projectId
		) {
			id
			linkedCollaborators {
				id
			}
		}
	}
`;

export const ASSIGN_TO_TASK = gql`
	mutation assignToTask($taskId: ID!, $collaboratorId: ID!) {
		assignToTask(taskId: $taskId, collaboratorId: $collaboratorId) {
			id
			assignee {
				id
				email
				firstName
				lastName
			}
		}
	}
`;

export const REMOVE_ASSIGNMENT_TO_TASK = gql`
	mutation removeAssignmentToTask($taskId: ID!, $collaboratorId: ID!) {
		removeAssignmentToTask(
			taskId: $taskId
			collaboratorId: $collaboratorId
		) {
			id
			assignee {
				id
				email
				firstName
				lastName
			}
		}
	}
`;

export const REMOVE_COLLABORATION = gql`
	mutation removeCollab($collaboratorId: ID!) {
		removeCollab(collaboratorId: $collaboratorId) {
			id
			collaborators {
				id
			}
		}
	}
`;

export const CANCEL_REQUEST_COLLAB = gql`
	mutation cancelRequestCollab($collabRequestId: ID!) {
		cancelRequestCollab(collabRequestId: $collabRequestId) {
			id
			status
		}
	}
`;

export const UPDATE_EMAIL_TEMPLATE = gql`
	mutation updateEmailTemplate(
		$templateId: ID!
		$subject: Json!
		$content: Json!
		$timing: Json
	) {
		updateEmailTemplate(
			id: $templateId
			subject: $subject
			content: $content
			timing: $timing
		) {
			id
			subject
			content
			timing
			type {
				id
				name
				category
			}
		}
	}
`;

export const SET_TEMPLATE_TO_DEFAULT = gql`
	mutation setTemplateToDefault($templateId: ID!) {
		setTemplateToDefault(id: $templateId) {
			id
			subject
			content
			timing
			type {
				id
				name
				category
			}
		}
	}
`;

export const SEND_CUSTOM_EMAIL_PREVIEW = gql`
	mutation sendCustomEmailPreview($subject: Json!, $content: Json!) {
		sent: sendCustomEmailPreview(subject: $subject, content: $content)
	}
`;

export const ISSUE_QUOTE = gql`
	mutation issueQuote(
		$projectId: ID!
		$sections: [QuoteSectionInput!]
		$header: Json
		$footer: Json
		$hasTaxes: Boolean!
		$taxRate: Float
	) {
		issueQuote(
			projectId: $projectId
			sections: $sections
			header: $header
			footer: $footer
			hasTaxes: $hasTaxes
			taxRate: $taxRate
		) {
			id
			issueNumber
			acceptedAt
			createdAt
		}
	}
`;

export const ACCEPT_QUOTE = gql`
	mutation acceptQuote($id: ID!, $token: String!) {
		acceptQuote(id: $id, token: $token) {
			id
			acceptedAt
		}
	}
`;

export const START_TASK_TIMER = gql`
	${ITEM_FRAGMENT}

	mutation startTaskTimer($id: ID!) {
		stopCurrentTaskTimer {
			...ItemFragment
			id
			workedTimes {
				start
				end
			}
		}

		startTaskTimer(id: $id) {
			...ItemFragment
			id
			workedTimes {
				start
				end
			}
		}
	}
`;

export const STOP_CURRENT_TASK_TIMER = gql`
	${ITEM_FRAGMENT}

	mutation stopCurrentTaskTimer {
		stopCurrentTaskTimer {
			...ItemFragment
			id
			workedTimes {
				start
				end
			}
		}
	}
`;

export const CLEAR_TASK_WORKED_TIMES = gql`
	${ITEM_FRAGMENT}

	mutation clearTaskWorkedTimes($taskId: ID!) {
		clearTaskWorkedTimes(taskId: $taskId) {
			...ItemFragment
			id
			workedTimes {
				start
				end
			}
		}
	}
`;
