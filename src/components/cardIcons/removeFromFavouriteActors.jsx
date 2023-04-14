import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthProvider";
import { removeActorFromFavourites  } from "../../supabase/supabaseClient";

  const RemoveFromFavouriteActorsIcon  = ({ actor, refreshKey, setRefreshKey }) => {
    const { user, favouriteActors, setFavouriteActors } = useAuth();

    const onUserRequest = async (e) => {
    e.preventDefault();
    const { data, error } = await removeActorFromFavourites(user.id, actor.id);

    if (error) {
    } else {
      setFavouriteActors(favouriteActors.filter((m) => m.id !== actor.id));
      setRefreshKey(refreshKey + 1);
    }
  };

  return (
    <IconButton
      aria-label="remove actor from favorites"
      onClick={onUserRequest}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouriteActorsIcon;