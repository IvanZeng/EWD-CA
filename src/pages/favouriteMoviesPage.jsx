import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useAuth } from "../contexts/AuthProvider";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { getFavouriteMovies } from "../supabase/supabaseClient";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const rateFiltering = {
  name: "ratings",
  value: 0,
  condition: (movie, value) => {
    if (value === 0) return true;
    if (value === 1) return movie.vote_average >= 1 && movie.vote_average <= 3.3;
    if (value === 2) return movie.vote_average > 3.3 && movie.vote_average <= 6.6;
    if (value === 3) return movie.vote_average > 6.6;
    return false;
  },
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie, value) {
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const FavouriteMoviesPage = () => {
  const { user, setFavouriteMovies } = useAuth();
  const [movieIds, setMovieIds] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, rateFiltering]
  );

  useEffect(() => {
    const fetchFavouriteMovies = async () => {
      const { data, error } = await getFavouriteMovies(user.id);
      if (error) {
        console.error("Error fetching favourite movies:", error);
      } else {
        setMovieIds(data.map((entry) => entry.movie_id));
      }
    };

    if (user) {
      fetchFavouriteMovies();
    }
  }, [user, setFavouriteMovies, refreshKey]);

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayMovies =
    allFavourites && allFavourites.length > 0 ? filterFunction(allFavourites) : [];

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    if (type === "title") {
      setFilterValues([changedFilter, filterValues[1], filterValues[2]]);
    } else if (type === "genre") {
      setFilterValues([filterValues[0], changedFilter, filterValues[2]]);
    } else if (type === "rating") {
      console.log([filterValues[0], filterValues[1], changedFilter]);
      setFilterValues([filterValues[0], filterValues[1], changedFilter]);
    }
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites
                movie={movie}
                refreshKey={refreshKey}
                setRefreshKey={setRefreshKey}
              />
              <WriteReview movie={movie} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        rateFilter={filterValues[2].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;