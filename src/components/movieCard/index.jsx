import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../contexts/AuthProvider";
import { checkMovieInFavourites } from "../../supabase/supabaseClient";

const styles = {
  card: { maxWidth: 345, borderRadius: 12 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgba(255, 0, 0, 1)",
  },
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 1,
  },
  actions: {
    paddingTop: 0,
  },
};

export default function MovieCard({ movie, action }) {
  const { addToFavourites } = useContext(MoviesContext);
  const { user } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  
  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      if (user) {
        const isFav = await checkMovieInFavourites(user.id, movie.id);
        setIsFavourite(isFav);
      }
    };

    fetchFavouriteStatus();
  }, [user, movie.id]);

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title.length > 20
              ? movie.title.substring(0, 20) + "..."
              : movie.title}
          </Typography>
        }
      />

      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={styles.content}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Information
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
