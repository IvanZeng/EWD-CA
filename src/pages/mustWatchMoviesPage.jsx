import React, { useContext } from "react";
import PageTemplate from "../components/templateUpcomingMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter } from "../components/movieFilterUI";
import RemoveFromMustWatches from "../components/cardIcons/removeFromMustWatches";
import WriteReview from "../components/cardIcons/writeReview";

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
    // Is user selected genre in this movies's genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const MustWatchMoviesPage = () => {
  const { toWatches: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering,rateFiltering]
  );

  // Create an array of queries and run them in parallel.
  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatches = mustWatchMovieQueries.map((q) => q.data);
  const displayMovies = allMustWatches
    ? filterFunction(allMustWatches)
    : [];

  // const toDo = () => true;

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    if (type === "title") {
      setFilterValues([changedFilter, filterValues[1], filterValues[2]]);
    } else if (type === "genre") {
      setFilterValues([filterValues[0], changedFilter, filterValues[2]]);
    } else if (type === "rating") {
      console.log([filterValues[0], filterValues[1], changedFilter])
      setFilterValues([filterValues[0], filterValues[1], changedFilter]);
    }
  };

  return (
    <>
            <PageTemplate
        title="Must Watch Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromMustWatches movie={movie} />
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

export default MustWatchMoviesPage;