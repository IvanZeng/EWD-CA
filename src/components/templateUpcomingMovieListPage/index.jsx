import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import UpcomingMovieList from "../upcomingMovieList";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

function UpcomingMovieListPageTemplate({ movies, title, action }) {

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
      <UpcomingMovieList action={action} movies={movies} />
      </Grid>
    </Grid>
  );
}
export default UpcomingMovieListPageTemplate;