import { Fragment, useContext, useEffect } from 'react';
import List from '@mui/material/List';
import { Link } from '@mui/material';
import { Chip } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { OrderContext } from './context';
import { CLOTHES_IMAGE } from '../../constants/api';
import { PATH_APP } from '../../routes/paths';
import { Grid, Stack, Box } from "@mui/material";
import MediaQuery from "react-responsive"

export default function OrdersList() {
	const { refreshData, orders } = useContext(OrderContext);

	useEffect(() => {
		refreshData();
	}, [])
	return (
		<>
			{/* //for laptops and pcs  */}
			<MediaQuery minWidth={400}>
				<Typography variant="h4" sx={{ ml: 15, mt: 5, mb: 5, fontFamily: "Nunito" }}>My Orders</Typography>
				<Grid container sx={{ alignItems: "center", justifyContent: "center", mb: 6 }}>
					<Grid item container direction="column" spacing={5} xs={8}>
						{orders.map((order, i) => {
							return (
								<Grid item key={i}>
									<Grid container sx={{ alignItems: "center", backgroundColor: "white", color: "black", borderRadius: "30px", border: 2, padding: 2 }}>
										<Grid item xs={8}>
											<Typography variant='body1'>
												Order Id :	<Link href={PATH_APP.app.orders + `/${order._id}`} > {order._id} </Link>
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography variant='body2'>
												Date:	 {(new Date(order.delivery_duedate)).toDateString()}
											</Typography>
										</Grid>
										{order.items_details.map((item, i) => {
											return (
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
																	sx={{ display: 'inline', mr: 2 }}
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

											)

										})}
									</Grid>
								</Grid>
							)
						})}
					</Grid>
				</Grid>
			</MediaQuery>


			{/* For mobiles */}
			<MediaQuery maxWidth={400}>
				<Typography variant="h4" sx={{ p: 3, fontFamily: "Nunito" }}>My Orders</Typography>
				<Grid container sx={{ alignItems: "center", justifyContent: "center", mb: 6 }}>
					<Grid item container direction="column" spacing={5} sx={{ p: 3 }}>
						{orders.map((order, i) => {
							return (
								<Grid item key={i}>
									<Grid container spacing={1} sx={{ alignItems: "center", backgroundColor: "white", color: "black", borderRadius: "30px", border: 2, padding: 2 }}>
										<Grid item xs={12}>
											<Typography variant='body1'>
												Order Id :	<Link href={PATH_APP.app.orders + `/${order._id}`} > {order._id} </Link>
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<Typography variant='body2'>
												Date:	 {(new Date(order.delivery_duedate)).toDateString()}
											</Typography>
										</Grid>

										<Grid item container xs={12} spacing={3}>
											{order.items_details.map((item, i) => {
												return (
													<Grid item>
														<Box component="img" src={CLOTHES_IMAGE + `${item._id}/` + item.files[0]}
															sx={{
																width: 100,
																maxHeight: 100,
																height: 100,
																maxWidth: 100
															}} />
														<ListItemText
															primary={item.item_name}
															secondary={
																<Fragment>
																	<Typography
																		sx={{ display: 'inline', mr: 2 }}
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
													</Grid>

												)

											})}
										</Grid>
									</Grid>
								</Grid>
							)
						})}
					</Grid>
				</Grid>
			</MediaQuery>
		</>
	);
}