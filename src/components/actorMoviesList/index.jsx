import React from "react";
import { useQuery } from "react-query";
import MovieCard from "../movieCard";
import Spinner from "../spinner";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import { getActorMovies } from "../../api/tmdb-api";
import { Typography } from "@mui/material";

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))",
    gridGap: "20px",
  },
  card: {
    minWidth: "275px",
    maxWidth: "275px",
  },
};

const ActorMoviesList = ({ actor }) => {
  const { isLoading, isError, error, data } = useQuery(
    ["actor movies", actor],
    () => getActorMovies(actor.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={styles.container}>
      {data.length ? (
        data.slice(0, 12).map((m) => (
          <div key={m.id} style={styles.card}>
            <MovieCard
              movie={m}
              action={(movie) => {
                return <AddToFavouritesIcon movie={movie} />;
              }}
            />
          </div>
        ))
      ) : (
        <Typography variant="subtitle2" padding={2}>
          Sorry, no related movies for now!
        </Typography>
      )}
    </div>
  );
};

export default ActorMoviesList;