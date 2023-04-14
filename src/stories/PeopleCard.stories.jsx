import React from "react";
import PeopleCard from "../components/peopleCard";
import SamplePeople from "./samplePeopleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Actors Page/PeopleCard",
  component: PeopleCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {

  return (
    <PeopleCard
      people={SamplePeople}

      taging={(people) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SamplePeople, profile_path: undefined };
  return (
    <PeopleCard
      people={sampleNoPoster}

      taging={(people) => null}
    />
  );
};
Exceptional.storyName = "exception";