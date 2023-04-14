import React from "react";
import PeopleDetails from "../components/peopleDetails";
import SampleActor from "../sampleActorCardData";
import { MemoryRouter } from "react-router";

export default {
  title: "Actors Page/ActorDetails",
  component: ActorDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,

  ],
};

export const Basic = () => <ActorDetails actor={SampleActor} />;

Basic.storyName = "Default";