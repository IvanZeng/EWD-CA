import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getNowPlayingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  rateFilter,
} from "../components/movieFilterUI";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
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

const NowPlayingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover4", getNowPlayingMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering,rateFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

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

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Now Playing Movies"
        movies={displayedMovies}
        action={(movie) => {
          return <AddToFavouritesIcon movie={movie} />
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

export default NowPlayingMoviesPage;