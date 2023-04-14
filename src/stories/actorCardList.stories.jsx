import React from "react";
import ActorList from "../components/actorList";
import SampleActor from "../sampleActorCardData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import Grid from "@material-ui/core/Grid";

export default {
  title: "Actors Page/ActorList",
  component: ActorList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => {
  const actor = [
    { ...SampleActor, id: 1 },
    { ...SampleActor, id: 2 },
    { ...SampleActor, id: 3 },
    { ...SampleActor, id: 4 },
  ];
  return (
    <Grid container spacing={5}>
      <ActorList
        actor={actor}
      />
    </Grid>
  );
};
Basic.storyName = "Default";