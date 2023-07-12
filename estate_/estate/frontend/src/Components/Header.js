import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// MUI imports
import {
	Button,
	Typography,
	Grid,
	AppBar,
	Toolbar,
	Menu,
	MenuItem,
	Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

//Contexts

import DispatchContext from "../Contexts/DispatchContext";

const useStyles = makeStyles({
	leftNav: {
		marginRight: "auto",
	},

	rightNav: {
		marginLeft: "auto",
		marginRight: "10rem",
	},

	propertyBtn: {
		backgroundColor: "green",
		color: "white",
		width: "15rem",
		fontSize: "1.1rem",
		marginRight: "1rem",
		"&:hover": {
			backgroundColor: "blue",
		},
	},

	loginBtn: {
		backgroundColor: "white",
		color: "black",
		width: "15rem",
		fontSize: "1.1rem",
		marginLeft: "1rem",
		"&:hover": {
			backgroundColor: "green",
		},
	},

	profileBtn: {
		color: "black",
		backgroundColor: "green",
		width: "15rem",
		fontWeight: "bolder",
		borderRadius: "15px",
		marginBottom: "0.25rem",
	},

	logoutBtn: {
		color: "black",
		backgroundColor: "red",
		width: "15rem",
		fontWeight: "bolder",
		borderRadius: "15px",
	},
});

function Header() {
	const classes = useStyles(); 
	const navigate = useNavigate(); 
	return (
		<AppBar position="static" style={{ backgroundColor: "black" }}>
			<Toolbar >
				<div className={classes.leftNav}>
					<Button color="inherit" onClick={() => navigate('/')}> 
						<Typography variant="h4">ATI</Typography>{" "}
					</Button>
				</div>
				<div>
				<Button 
					color="inherit"
					onClick={() => navigate("/listings")}
					style={{ marginRight: "2rem" }}
				>
					<Typography variant="h6">Listings</Typography>{" "} 
					</Button>
					<Button color="inherit" style={{ marginRight: "2rem" }}>
						{" "}
						<Typography variant="h6" >Agencies</Typography>{" "}
					</Button>
				</div>
					<div className={classes.rightNav}>
						<Button className={classes.propertyBtn}>Add Property</Button>
						{/*	{userIsLogged ? (*/}
						{/*	<Button*/}
						{/*		sx={{*/}
						{/*			backgroundColor: "white",*/}
						{/*			color: "black",*/}
						{/*			width: "15rem",*/}
						{/*			fontSize: "1.1rem",*/}
						{/*			marginLeft: "1rem",*/}
						{/*			"&:hover": {*/}
						{/*				backgroundColor: "green",*/}
						{/*			},*/}
						{/*		}}*/}
						{/*		onClick={handleClick}*/}
						{/*		// onClick={() => navigate("/login")}*/}
						{/*	>*/}
						{/*		{userUsername}*/}
						{/*	</Button>*/}
						{/*) : (*/}
						{/*	<Button*/}
						{/*		sx={{*/}
						{/*			backgroundColor: "white",*/}
						{/*			color: "black",*/}
						{/*			width: "15rem",*/}
						{/*			fontSize: "1.1rem",*/}
						{/*			marginLeft: "1rem",*/}
						{/*			"&:hover": {*/}
						{/*				backgroundColor: "green",*/}
						{/*			},*/}
						{/*		}}*/}
						{/*		onClick={() => navigate("/login")}*/}
						{/*	>*/}
						{/*		Login*/}
						{/*	</Button>*/}
				</div>

				</Toolbar>
			</AppBar>
	);
}

export default Header;