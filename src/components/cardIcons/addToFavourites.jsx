import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { addMovieToFavourites } from "../../supabase/supabaseClient";

const AddToFavouritesIcon = ({ movie }) => {
  const { user, favouriteMovies, setFavouriteMovies } = useAuth();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onUserSelect = async (e) => {
    e.preventDefault();
    setFavouriteMovies([...favouriteMovies, movie]);

    try {
      const { data, error } = await addMovieToFavourites(user.id, movie.id);
      if (error) {
        throw error;
      }
      console.log("Movie added:", data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving favorite movie:", error);
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
          Movie added to favorites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToFavouritesIcon;
