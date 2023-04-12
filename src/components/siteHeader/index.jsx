import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation  } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(location.pathname);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Now Playing ", path: "/movies/nowplaying" },
    { label: "Top Rated", path: "/movies/toprated" },
    { label: "Must Watches", path: "/movies/mustWatches" },
    { label: "Favorites Movies", path: "/movies/favourites" },
    { label: "Actors", path: "/actors" },
    { label: "Favorite Actors", path: "/actors/favourites" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
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
          {isMobile ? (
            <>
              <FormControl>
                <Select
                  id="menu-select"
                  value={selectedMenu}
                  onChange={(e) => {
                    setSelectedMenu(e.target.value);
                    handleMenuSelect(e.target.value);
                  }}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem key={opt.label} value={opt.path}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <FormControl>
                <Select
                  id="menu-select"
                  value={selectedMenu}
                  onChange={(e) => {
                    setSelectedMenu(e.target.value);
                    handleMenuSelect(e.target.value);
                  }}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem key={opt.label} value={opt.path}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
