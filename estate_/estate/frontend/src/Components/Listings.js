import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// React leaflet
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
  Polygon,
} from "react-leaflet";
import { Icon } from "leaflet";
// MUI
import {
	Grid,
	AppBar,
	Typography,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	IconButton,
	CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";


// Map icons
import houseIconPng from "./Assets/Mapicons/house.png";
import apartmentIconPng from "./Assets/Mapicons/apartment.png";
import officeIconPng from "./Assets/Mapicons/office.png";
// Assets
import img1 from "./Assets/img1.jpg";
import myListings from "./Assets/Data/Dummydata";
import polygonOne from "./Shape";

const useStyles = makeStyles({
	cardStyle: {
		margin: "0.5rem",
		border: "1px solid black",
		position: "relative",
	},
	pictureStyle: {
		paddingRight: "1rem",
		paddingLeft: "1rem",
		height: "20rem",
		width: "30rem",
		cursor: "pointer",
	},
	priceOverlay: {
		position: "absolute",
		backgroundColor: "green",
		zIndex: "1000",
		color: "white",
		top: "100px",
		left: "20px",
		padding: "5px",
	},
});

function Listings() {
	// fetch("http://127.0.0.1:8000/api/listings")
	// 	.then((response) => response.json())
	// 	.then((data) => console.log(data));

	const navigate = useNavigate();
	const classes = useStyles();
	const houseIcon = new Icon({
		iconUrl: houseIconPng,
		iconSize: [40, 40],
	});

	const apartmentIcon = new Icon({
		iconUrl: apartmentIconPng,
		iconSize: [40, 40],
	});

	const officeIcon = new Icon({
		iconUrl: officeIconPng,
		iconSize: [40, 40],
	});

	const [latitude, setLatitude] = useState(51.48740865233002);
	const [longitude, setLongitude] = useState(-0.12667052265135625);

	const initialState = {
		mapInstance: null,
	};



	function GoEast() {
		setLatitude(51.46567014039476);
		setLongitude(0.2596173538795676);
	}

	function GoCenter() {
		setLatitude(51.48740865233002);
		setLongitude(-0.12667052265135625);
	}

	const polyOne = [
		[51.505, -0.09],
		[51.51, -0.1],
		[51.51, -0.12],
	];
	const [allListings, setAllListings] = useState([]);
	const [dataIsLoading, setDataIsLoading] = useState(true);

	useEffect(() => {
		const source = Axios.CancelToken.source();
		async function GetAllListings() {
			try {
				const response = await Axios.get(
					"http://127.0.0.1:8000/api/listings",
					{ cancelToken: source.token }
				);

				setAllListings(response.data);
				setDataIsLoading(false);
			} catch (error) {}
		}
		GetAllListings();
		return () => {
			source.cancel();
		};
	}, []);

	if (dataIsLoading === true) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<CircularProgress />
			</Grid>
		);
	}

	if (dataIsLoading === false) {
		console.log(allListings[0].location)
	}

	if (dataIsLoading === true) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<CircularProgress />
			</Grid>
		);
	}

	return (
		<Grid container>
			<Grid item xs={4}>
				{allListings.map((listing) => {
					return (
						<Card key={listing.id} className={classes.cardStyle}>
							<CardHeader
								action={
									<IconButton
										aria-label="settings"
										onClick={() =>
											state.mapInstance.flyTo(
												[listing.latitude, listing.longitude],
												16
											)
										}
									>
									</IconButton>
								}
								title={listing.title}
							/>
							<CardMedia
								className={classes.pictureStyle}
								component="img"
								image={listing.picture1}
								alt={listing.title}
								onClick={() => navigate(`/listings/${listing.id}`)}
							/>
							<CardContent>
								<Typography variant="body2">
									{listing.description.substring(0, 200)}...
								</Typography>
							</CardContent>

							{listing.property_status === "Sale" ? (
								<Typography className={classes.priceOverlay}>
									{listing.listing_type}: $
									{listing.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</Typography>
							) : (
								<Typography className={classes.priceOverlay}>
									{listing.listing_type}: $
									{listing.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
									/ {listing.rental_frequency}
								</Typography>
							)}

							<CardActions disableSpacing>
								<IconButton aria-label="add to favorites">
									{listing.seller_agency_name}
								</IconButton>
							</CardActions>
						</Card>
					);
				})}
			</Grid>
			<Grid item xs={8} style={{ marginTop: "0.5rem" }}>
				<AppBar position="sticky">
					<div style={{ height: "100vh" }}>
						<MapContainer
							center={[51.505, -0.09]}
							zoom={14}
							scrollWheelZoom={true}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
              <Polyline positions={polyOne} weight={10} color="green"/>
              <Polygon positions={polygonOne}
              color="black"
              fillColor="green"
              fillOpacity={0.7}
                />

							{myListings.map((listing) => {
								function IconDisplay() {
									if (listing.listing_type === "House") {
										return houseIcon;
									} else if (listing.listing_type === "Apartment") {
										return apartmentIcon;
									} else if (listing.listing_type === "Office") {
										return officeIcon;
									}
								}
								return (
									<Marker
										key={listing.id}
										icon={IconDisplay()}
										position={[
                      listing.location.coordinates[0], listing.location.coordinates[1]]}
									>
										<Popup>
											<Typography variant="h5">{listing.title}</Typography>
											<img
												src={listing.picture1}
												style={{
													height: "14rem",
													width: "18rem",
													cursor: "pointer",
												}}
												onClick={() => navigate(`/listings/${listing.id}`)}
											/>
											<Typography variant="body1">
												{listing.description.substring(0, 150)}...
											</Typography>
											<Button
												variant="contained"
												fullWidth
												onClick={() => navigate(`/listings/${listing.id}`)}
											>
												Details
											</Button>
										</Popup>
									</Marker>
								);
							})}

							{/* <Marker icon={officeIcon} position={[latitude, longitude]}>
								<Popup>
									<Typography variant="h5">A title</Typography>
									<img src={img1} style={{ height: "14rem", width: "18rem" }} />
									<Typography variant="body1">
										This is some text below the title
									</Typography>
									<Button variant="contained" fullWidth>
										A Link
									</Button>
								</Popup>
							</Marker> */}
						</MapContainer>
					</div>
				</AppBar>
			</Grid>
		</Grid>
	);
}

export default Listings;