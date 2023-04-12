import React, { useState } from "react";
import FilterCard from "../filterActorsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

export const nameFilter = function (actor, value) {
  return actor.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const departmentFilter = function (actor, value) {
  return (
    actor.known_for_department.toLowerCase().search(value.toLowerCase()) !== -1
  );
};

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

const ActorFilterUI = ({
  onFilterValuesChange,
  nameFilter,
  departmentFilter,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          nameFilter={nameFilter}
          departmentFilter={departmentFilter}
        />
      </Drawer>
    </>
  );
};

export default ActorFilterUI;