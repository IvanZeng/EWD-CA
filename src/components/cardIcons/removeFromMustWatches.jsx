import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthProvider";
import { removeMovieFromMustWatches } from "../../supabase/supabaseClient";

const RemoveFromMustWatchesIcon  = ({ movie, refreshKey, setRefreshKey }) => {
  const { user, mustWatchMovies, setMustWatchMovies } = useAuth();

  const onUserRequest = async (e) => {
    e.preventDefault();
    const { data, error } = await removeMovieFromMustWatches(user.id, movie.id);

    if (error) {
      console.error("Error", error);
    } else {
      setMustWatchMovies(mustWatchMovies.filter((m) => m.id !== movie.id));
      setRefreshKey(refreshKey + 1);
    }
  };

  return (
    <IconButton
      aria-label="remove from must watches"
      onClick={onUserRequest}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchesIcon;