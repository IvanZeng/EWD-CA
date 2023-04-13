import React from "react";
import PageTemplate from "../components/templateUpcomingMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  rateFilter,
} from "../components/movieFilterUI";
import AddToPlaylistAddIcon from '../components/cardIcons/addToWatch'

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


const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery("discover2", getUpcomingMovies);
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
      title="Upcoming Movies"
      movies={displayedMovies}
      action={(movie) => {
        return <AddToPlaylistAddIcon movie={movie} />
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
export default UpcomingMoviesPage;