import * as React from 'react';
import PropTypes from 'prop-types';

import {List, ListItemText, ListItem, Divider, ListItemAvatar, Avatar, Typography, Chip } from '@mui/material';
import { Fragment } from 'react';
import { CLOTHES_IMAGE } from '../../../constants/api';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { ORDER_STATUS } from '../../../constants/order';
import { getOrderById } from '../services';
import { useParams } from 'react-router-dom';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#784af4',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18,
	},
	'& .QontoStepIcon-circle': {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
}));

function QontoStepIcon(props) {
	const { active, completed, className } = props;

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<Check className="QontoStepIcon-completedIcon" />
			) : (
				<div className="QontoStepIcon-circle" />
			)}
		</QontoStepIconRoot>
	);
}

QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	}),
}));

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;

	const icons = {
		1: <SettingsIcon />,
		2: <GroupAddIcon />,
		3: <VideoLabelIcon />,
	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};

const isStepFailed = (step) => {
	return step === 3;
};
const getActiveStep = (status) => {
	const orderArr = Object.values(ORDER_STATUS);
	return orderArr.indexOf(status);
}

const steps = ['Placed', 'On Delivery', 'Delivered', 'Cancled'];

export default function CustomizedSteppers() {
	const [order, setOrder] = React.useState({});
	const { id } = useParams();

	React.useEffect(() => {
		getOrderById(id).then((res) => {
			console.log(res)
			setOrder(res[0])
		}).catch(err => {
			console.log(err)
		})
	}, [])
	return (
		<div>


			<Stack sx={{ width: '100%' }} spacing={4}>
				<Stepper alternativeLabel activeStep={getActiveStep(order.status)} connector={<QontoConnector />}>
					{steps.map((label, i) => {
						const labelProps = {}
						if (isStepFailed(i)) {
							labelProps.error = true;
						}
						return (
							<Step key={label}>
								<StepLabel {...labelProps} StepIconComponent={QontoStepIcon}>{label}</StepLabel>
							</Step>
						)
					})}
				</Stepper>
			</Stack>

			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				{order.item_details && order.item_details.map((item, i) => (
					<ListItem alignItems="flex-start">
						<Divider variant='inset' component="li" />
						<ListItemAvatar>
							<Avatar alt="Travis Howard" src={CLOTHES_IMAGE + `${item._id}/` + item.files[0]} />
						</ListItemAvatar>
						<ListItemText
							primary={item.item_name}
							secondary={
								<Fragment>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										Quantity : {order.items[i].quantity}
									</Typography>
									<Chip label={order.status} />
								</Fragment>
							}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
}