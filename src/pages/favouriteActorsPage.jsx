import React, { useContext } from "react";
import PageTemplate from "../components/templateActorListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, { nameFilter, genderFilter, } from "../components/actorFilterUI";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";

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

const FavouriteActorsPage = () => {
  const { favouriteActors: actorIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genderFiltering]
  );

  // Create an array of queries and run them in parallel.
  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", { id: actorId }],
        queryFn: getActor,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteActorQueries.find((a) => a.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteActorQueries.map((q) => q.data);
  const displayActors = allFavourites
    ? filterFunction(allFavourites)
    : [];


  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = filterValues.map((filter) =>
      filter.name === type ? { ...filter, value: value } : filter
    );
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Actors"
        actors={displayActors}
        action={(actor) => {
          return (
            <>
              <RemoveFromFavouriteActors actor={actor} />
            </>
          );
        }}
      />

      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
      />

      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues.find((filter) => filter.name === "name").value}
        genderFilter={filterValues.find((filter) => filter.name === "gender").value}
      />;
    </>
  );
};

export default FavouriteActorsPage;