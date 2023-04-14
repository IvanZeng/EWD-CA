import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthProvider";
import { removeMovieFromFavourites } from "../../supabase/supabaseClient";

const RemoveFromFavouritesIcon = ({ movie, refreshKey, setRefreshKey }) => {
  const { user, favouriteMovies, setFavouriteMovies } = useAuth();

  const onUserRequest = async (e) => {
    e.preventDefault();
    const { data, error } = await removeMovieFromFavourites(user.id, movie.id);

    if (error) {
    } else {
      setFavouriteMovies(favouriteMovies.filter((m) => m.id !== movie.id));
      setRefreshKey(refreshKey + 1);
    }
  };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={onUserRequest}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesIcon;
