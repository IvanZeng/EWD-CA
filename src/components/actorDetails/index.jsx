import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 1.5,
  },
  container: {
    padding: "1rem",
  },
};

const ActorDetails = ({ actor }) => {
  return (
    <div style={styles.container}>
      <Typography variant="h4" component="h3" textAlign="center" gutterBottom>
        Biography
      </Typography>

      <Typography variant="h6" component="p" gutterBottom>
        {actor.biography}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          Birth: <Chip label={actor.birthday} />
        </li>
        <li>
          From: <Chip label={actor.place_of_birth} />
        </li>
        <li>
          Popularity: <Chip label={`★ ${parseInt(actor.popularity)}`} />
        </li>
      </Paper>
    </div>
  );
};

export default ActorDetails;