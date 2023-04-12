import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'
import SimilarMovieList from "../similarMovieList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MovieCastList from "../movieCast";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 1.5,
  },
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    padding: "1rem",
  },
};

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={styles.container}>
      <Typography variant="h6" component="h3" textAlign="center" gutterBottom>
        Overview
      </Typography>

      <Typography variant="h7" component="p" gutterBottom>
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet} marginBottom={2}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Accordion defaultExpanded={true}>
       <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
         aria-controls="cast-movies-content"
         id="cast-movies-header"
       >
       <Typography variant="h6" component="h4" textAlign="center">
        Movie Actors of {movie.title}
       </Typography>
       </AccordionSummary>
       <AccordionDetails>
       <MovieCastList movie={movie} />
       </AccordionDetails>
      </Accordion>


      <Accordion defaultExpanded={true}>
       <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
         aria-controls="similar-movies-content"
         id="similar-movies-header"
       >
       <Typography variant="h6" component="h4" textAlign="center">
         Similar movies to {movie.title}
       </Typography>
       </AccordionSummary>
       <AccordionDetails>
       <SimilarMovieList movie={movie} />
       </AccordionDetails>
      </Accordion>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={()  => setDrawerOpen(false)}
        >
          <MovieReviews movie={movie} />
        </Drawer>
      </div>
      );
    };
    
    export default MovieDetails;