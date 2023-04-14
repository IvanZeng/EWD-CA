import React from "react";
import ActorHeader from "../components/headerActor";
import SampleActor from "../sampleActorCardData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";

export default {
  title: "Actors Page/ActorHeader",
  component: ActorHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <ActorHeader actor={SampleActor} />;

Basic.storyName = "Default";