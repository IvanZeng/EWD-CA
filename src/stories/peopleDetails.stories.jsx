import React from "react";
import PeopleDetails from "../components/peopleDetails";
import SamplePeople from "./samplePeopleData";
import { MemoryRouter } from "react-router";

export default {
  title: "Actors Page/PeopleDetails",
  component: PeopleDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,

  ],
};

export const Basic = () => <PeopleDetails people={SamplePeople} />;

Basic.storyName = "Default";