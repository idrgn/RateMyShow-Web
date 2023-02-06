import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/menu/logo.png";
import React from "react";

function UpperMenu() {
	const sessionToken = localStorage.getItem("sessionToken");
	const avatarId = localStorage.getItem("avatarId");
	const username = localStorage.getItem("username");

	// Si los datos no están almacenados se obtienen
	if (sessionToken && (!avatarId || !username)) {
		axios.get("http://api.ratemyshow.lekiam.net/sessions", { headers: { SessionToken: localStorage.getItem("sessionToken") } }).then((response) => {
			// Se almacenan los datos del usuario
			localStorage.setItem("username", response.data.username);
			localStorage.setItem("name", response.data.name);
			localStorage.setItem("surname", response.data.surname);
			localStorage.setItem("avatarId", response.data.avatarId);
		});
	}

	const pages = [
		{ name: "Feed", url: "/feed" },
		{ name: "Mejor Calificadas", url: "/best" },
		{ name: "Sugerencias", url: "/recommendations" },
		{ name: "Novedades", url: "latest" },
		{ name: "Usuarios", url: "/users" },
	];

	const notLoggedPages = [
		{ name: "Mejor Calificadas", url: "/best" },
		{ name: "Novedades", url: "latest" },
		{ name: "Usuarios", url: "/users" },
	];

	const settings = [
		{ name: "Perfil", url: `/users/${username}` },
		{ name: "Favoritos", url: "/favorites" },
		{ name: "Pendientes", url: "/pending" },
		{ name: "Cerrar sesión", url: "/logout" },
	];

	const notLoggedSettings = [
		{ name: "Iniciar Sesión", url: "/login" },
		{ name: "Crear cuenta", url: "/register" },
	];

	const currentSettings = sessionToken ? settings : notLoggedSettings;
	const currentPages = sessionToken ? pages : notLoggedPages;

	const searchRef = React.useRef(null);
	const navigate = useNavigate();
	const onClickSearch = () => {
		navigate(`/search?query=${searchRef.current.value}`);
	};
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			onClickSearch();
		}
	};

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const Search = styled("div")(({ theme }) => ({
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	}));

	const SearchIconWrapper = styled("div")(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}));

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: "inherit",
		"& .MuiInputBase-input": {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create("width"),
			width: "100%",
			[theme.breakpoints.up("sm")]: {
				width: "12ch",
				"&:focus": {
					width: "20ch",
				},
			},
		},
	}));

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<div>
			<AppBar position="static" sx={{ bgcolor: "black" }}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<img src={logo} width="50" height="50" />

						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "white",
								textDecoration: "none",
								marginLeft: "20px",
							}}
						>
							RateMyShow
						</Typography>
						<Box sx={{ flexGrow: 1 }}>
							<AppBar position="static">
								<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}></Typography>
							</AppBar>
						</Box>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{currentPages.map((page) => (
									<NavLink to={page.url} style={{ textDecoration: "inherit", color: "inherit" }}>
										<MenuItem key={page.name} onClick={handleCloseNavMenu}>
											<Typography textAlign="center">{page.name}</Typography>
										</MenuItem>
									</NavLink>
								))}
							</Menu>
						</Box>

						<Typography
							variant="h5"
							noWrap
							component="a"
							href=""
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						></Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{currentPages.map((page) => (
								<NavLink to={page.url} style={{ textDecoration: "inherit", color: "inherit" }}>
									<Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
										{page.name}
									</Button>
								</NavLink>
							))}
						</Box>
						<Search sx={{ marginRight: "50px" }}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase inputRef={searchRef} onKeyDown={handleKeyDown} placeholder="Search…" inputProps={{ "aria-label": "search" }} />
						</Search>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src={avatarId ? `http://api.ratemyshow.lekiam.net/pfp/${avatarId}` : "http://api.ratemyshow.lekiam.net/pfp/default"} />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{currentSettings.map((setting) => (
									<NavLink to={setting.url} style={{ textDecoration: "inherit", color: "inherit" }}>
										<MenuItem key={setting.name} onClick={handleCloseUserMenu}>
											<Typography textAlign="center">{setting.name}</Typography>
										</MenuItem>
									</NavLink>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}
export default UpperMenu;
