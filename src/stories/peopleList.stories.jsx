import React from "react";
import PeopleList from "../components/peopleList";
import SamplePeople from "./samplePeopleData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import Grid from "@material-ui/core/Grid";

export default {
  title: "Actors Page/PeopleList",
  component: PeopleList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => {
  const people = [
    { ...SamplePeople, id: 1 },
    { ...SamplePeople, id: 2 },
    { ...SamplePeople, id: 3 },
    { ...SamplePeople, id: 4 },
  ];
  return (
    <Grid container spacing={5}>
      <PeopleList
        people={people}
      />
    </Grid>
  );
};
Basic.storyName = "Default";