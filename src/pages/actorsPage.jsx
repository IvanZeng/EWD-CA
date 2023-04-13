import React from "react";
import PageTemplate from "../components/templateActorListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, {
  nameFilter,
  genderFilter,
} from "../components/actorFilterUI";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

const genderFiltering = {
  name: "gender",
  value: "",
  condition: genderFilter,
};

const sortByPopularity = (a, b) => {
  return b.popularity - a.popularity;
};

const ActorsPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("actors", getActors);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genderFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value: value } : filter
    );
    setFilterValues(updatedFilterSet);
  };

  const actors = data ? data.results : [];
  let displayedActors = filterFunction(actors);

  if (filterValues[1] && filterValues[1].name === "sort") {
    displayedActors = displayedActors.sort(sortByPopularity);
  }

  return (
    <>
      <PageTemplate
        title="Popular Actors"
        actors={displayedActors}
        action={(actor) => {
          return <AddToFavouriteActorsIcon actor={actor} />;
        }}
      />
      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues.find((filter) => filter.name === "name").value}
        genderFilter={filterValues.find((filter) => filter.name === "gender").value}
      />
    </>
  );
};

export default ActorsPage;
