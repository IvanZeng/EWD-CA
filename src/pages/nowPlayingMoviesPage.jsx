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
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import '../pages/style.css';

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
  const [page, setPage] = React.useState(1);
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['discover4', page],
    queryFn: () => getNowPlayingMovies(page),
    keepPreviousData: true,
  });

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, rateFiltering]
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

  const totalPages = data ? data.total_pages : 1;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <Chip
          key={i}
          label={i}
          color={i === page ? 'primary' : 'default'}
          onClick={() => setPage(i)}
          style={{ margin: '0 5px' }}
        />,
      );
    }

    return pageNumbers;
  };

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

      <div className="footerFill"></div>
      <div className="footer">
        <div className="footerCol">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '5px', fontSize: '0.9rem' }}
            onClick={() => setPage((old) => Math.max(old - 10, 1))}
            disabled={page <= 10}
          >
            Previous 10 Pages
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '5px', fontSize: '0.9rem' }}
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </Button>
        </div>
        <div className="footerCol">{renderPageNumbers()}</div>
        <div className="footerCol">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '5px', fontSize: '0.9rem' }}
            onClick={() => setPage((old) => (old < totalPages ? old + 1 : old))}
            disabled={page === totalPages}
          >
            Next Page
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '5px', fontSize: '0.9rem' }}
            onClick={() => setPage((old) => Math.min(old + 10, totalPages))}
            disabled={page > totalPages - 10}
          >
            Next 10 Pages
          </Button>
        </div>
      </div>
    </>
  );
};

export default NowPlayingMoviesPage;