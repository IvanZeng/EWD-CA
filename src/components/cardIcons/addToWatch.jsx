import React, { useContext } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { addMovieToMustWatches } from "../../supabase/supabaseClient";

const AddToPlaylistAddIcon = ({ movie }) => {
  const { user, mustWatchMovies, setMustWatchMovies } = useAuth();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onUserSelect = async (e) => {
    e.preventDefault();
    setMustWatchMovies([...mustWatchMovies, movie]);

    try {
      const { data, error } = await addMovieToMustWatches(user.id, movie.id);
      if (error) {
        throw error;
      }
      console.log("Must watch Movie added:", data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving Must watch movie:", error);
    }
  };

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={onUserSelect}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Must watech movie added to playlist!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToPlaylistAddIcon;