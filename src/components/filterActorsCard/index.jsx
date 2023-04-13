import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

export default function FilterActorsCard(props) {
  const handleUserInput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleUserInput(e, "name", e.target.value);
  };

  const handleGenderChange = (e) => {
    handleUserInput(e, "gender", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the actors.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={props.nameFilter}
            variant="filled"
            onChange={handleTextChange}
          />

          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={props.genderFilter}
            label="Gender"
            onChange={handleGenderChange}
            sx={styles.formControl}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={1}>Female</MenuItem>
            <MenuItem value={2}>Male</MenuItem>
          </Select>

        </CardContent>
      </Card>
    </>
  );
}