import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useAuth } from "../../contexts/AuthProvider";

const styles = {
  title: {
    flexGrow: 1,
  },
  appbar: {
    // background: 'gray',
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing ", path: "/movies/nowplaying" },
    { label: "Top Rated", path: "/movies/toprated" },
    { label: "Must Watches", path: "/movies/mustWatches" },
    { label: "Favorites Movies", path: "/movies/favourites" },
    { label: "Actors", path: "/actors" },
    { label: "Favorite Actors", path: "/actors/favourites" },
    { label: "Logout", path: "logout" },
  ];

  const isPathInMenuOptions = menuOptions.some(
    (option) => option.path === location.pathname
  );

  const [selectedMenu, setSelectedMenu] = useState(
    isPathInMenuOptions ? location.pathname : "Menu"
  );

  useEffect(() => {
    setSelectedMenu(isPathInMenuOptions ? location.pathname : "Menu");
  }, [location.pathname, isPathInMenuOptions]);

  const handleMenuSelect = (pageURL) => {
    if (pageURL === "logout") {
      handleLogout();
    } else {
      navigate(pageURL);
    }
  };

  const { auth, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
    navigate("/login");
  };

  return (
    <>
      <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          <FormControl>
            <Select
              id="menu-select"
              value={selectedMenu}
              onChange={(e) => {
                handleMenuSelect(e.target.value);
              }}
            >
              <MenuItem value="Menu" disabled>
                Menu
              </MenuItem>
              {menuOptions.map((opt) => (
                <MenuItem key={opt.label} value={opt.path}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
