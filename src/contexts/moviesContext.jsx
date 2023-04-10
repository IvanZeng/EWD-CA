import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) ; // NEW
  const [favourites, setFavourites] = useState([]);
  const [toWatches, setToWatches] = useState([]);

  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      updatedFavourites.push(movie.id);
    }
    setFavourites(updatedFavourites);
  };

  const addToWatches = (movie) => {
    let updatedToWatches = [...toWatches];
    if (!toWatches.includes(movie.id)) {
        updatedToWatches.push(movie.id);
    }
    setToWatches(updatedToWatches);
  };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites(favourites.filter((mId) => mId !== movie.id));
  };

  const removeFromMustWatches = (movie) => {
    setToWatches(toWatches.filter((mId) => mId !== movie.id));
  };


  const addReview = (movie, review) => {   // NEW
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        toWatches,
        addToFavourites,
        addToWatches,
        removeFromFavourites,
        removeFromMustWatches,
        addReview,    // NEW
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;