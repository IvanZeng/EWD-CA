import React from "react";
import { useQuery } from "react-query";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";
import { getMovieCast } from "../../api/tmdb-api";

const styles = {
  container: {
    overflowX: "scroll",
    display: "flex",
    flexDirection: "row",
  },
  card: {
    marginLeft: "20px",
    minWidth: "170px",
  },
  media: {
    height: "150px",
  },
};

const MovieCastList = ({ movie }) => {
  const { isLoading, isError, error, data } = useQuery(
    ["movie cast", movie],
    () => getMovieCast(movie.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={styles.container}>
      {data.map((cast) => (
        <div key={cast.id} style={styles.card}>
          <Card>
            <CardMedia
              sx={styles.media}
              image={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                  : img
              }
            />
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography variant="subtitle2" component="p">
                    {cast.name}
                  </Typography>
                  <Typography
                    noWrap={true}
                    variant="caption"
                    component="p"
                    fontStyle="italic"
                  >
                    {cast.character}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MovieCastList;