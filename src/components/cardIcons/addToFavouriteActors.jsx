import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { addActorToFavourites } from "../../supabase/supabaseClient";

const AddToFavouriteActorsIcon = ({ actor }) => {
  const { user, favouriteActors, setFavouriteActors } = useAuth();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onUserSelect = async  (e) => {
    e.preventDefault();
    setFavouriteActors([...favouriteActors, actor]);

    try {
      const { data, error } = await addActorToFavourites(user.id, actor.id);
      if (error) {
        throw error;
      }
      console.log("Actor  added:", data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving favorite actor:", error);
    }
  };

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          actor added to favorites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToFavouriteActorsIcon;