import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import img from "../../images/film-poster-placeholder.png";

const styles = {
  card: { maxWidth: 345, borderRadius: 12 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
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

const getGenderIcon = (gender) => {
  switch (gender) {
    case 1:
      return <FemaleIcon />;
    case 2:
      return <MaleIcon />;
    default:
      return "Not Specified";
  }
};

export default function ActorCard({ actor, action }) {
  const { favouriteActors, addToFavouriteActors } = useContext(MoviesContext);

  if (favouriteActors.find((id) => id === actor.id)) {
    actor.favouriteActor = true;
  } else {
    actor.favouriteActor = false;
  }

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          actor.favouriteActor ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {actor.name}
          </Typography>
        }
      />
      <Link to={`/actors/${actor.id}`}>
        <CardMedia
          sx={styles.media}
          image={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : img
          }
        />
      </Link>
      <CardContent sx={styles.content}>
        <Typography variant="subtitle1" component="p">
          Department: {actor.known_for_department}
        </Typography>
        <Typography variant="subtitle1" component="p">
          Popularity: {parseInt(actor.popularity)}★
        </Typography>
        <Typography variant="subtitle1" component="p">
          Gender: {getGenderIcon(actor.gender)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={styles.actions}>
        {action(actor)}

        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Information
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
