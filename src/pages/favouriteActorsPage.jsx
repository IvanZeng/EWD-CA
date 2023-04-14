import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateActorListPage";
import { useAuth } from "../contexts/AuthProvider";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, { nameFilter, genderFilter, } from "../components/actorFilterUI";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import { getFavouriteActors  } from "../supabase/supabaseClient";

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
  const { user, setFavouriteActors  } = useAuth();
  const [actorIds, setActorIds] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering, genderFiltering]
  );

  useEffect(() => {
    const fetchFavouriteActors  = async () => {
      const { data, error } = await getFavouriteActors(user.id);
      if (error) {
        console.error("Error fetching favourite actors:", error);
      } else {
        setActorIds(data.map((entry) => entry.actor_id));
      }
    };

    if (user) {
      fetchFavouriteActors();
    }

  }, [user, setFavouriteActors, refreshKey]);

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", { id: actorId }],
        queryFn: getActor,
      };
    })
  );

  const isLoading = favouriteActorQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteActorQueries.map((q) => q.data);
  const displayActors =
    allFavourites && allFavourites.length > 0 ? filterFunction(allFavourites) : [];


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
              <RemoveFromFavouriteActors
                actor={actor}
                refreshKey={refreshKey}
                setRefreshKey={setRefreshKey}
              />
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