import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const addMovieToFavourites = async (userId, movieId) => {
    const { data, error } = await supabase
        .from('favourite_movies')
        .insert([{ user_id: userId, movie_id: movieId }]);
    return { data, error };
};

export const getFavouriteMovies = async (userId) => {
    const { data, error, status } = await supabase
        .from('favourite_movies')
        .select('movie_id')
        .eq('user_id', userId);

    if (error) {
        console.error('getFavouriteMovies error:', error, 'Status:', status);
    }

    return { data, error };
};

export const removeMovieFromFavourites = async (userId, movieId) => {
  const { data, error } = await supabase
    .from('favourite_movies')
    .delete()
    .match({ user_id: userId, movie_id: movieId });
  return { data, error };
};

export async function checkMovieInFavourites(id, movieId) {
    try {
      const { data, error } = await supabase
        .from("favourite_movies")
        .select("movie_id")
        .eq("user_id", id)
        .eq("movie_id", movieId);

      if (error) {
        throw error;
      }

      return data.length > 0;
    } catch (error) {
      console.error("Error checking movie in favourites:", error);
      return false;
    }
  };

  export const addActorToFavourites = async (userId, actorId) => {
    const { data, error } = await supabase
      .from('favourite_actors')
      .insert([{ user_id: userId, actor_id: actorId }]);
    return { data, error };
  };

  export const removeActorFromFavourites = async (userId, actorId) => {
    const { data, error } = await supabase
      .from('favourite_actors')
      .delete()
      .eq('user_id', userId)
      .eq('actor_id', actorId);
    return { data, error };
  };

  export const getFavouriteActors = async (userId) => {
    const { data, error, status } = await supabase
      .from('favourite_actors')
      .select('actor_id')
      .eq('user_id', userId);

    if (error) {
      console.error('getFavouriteActors error:', error, 'Status:', status);
    }

    return { data, error };
  };

  export async function checkActorInFavourites(id, actorId) {
    try {
      const { data, error } = await supabase
        .from("favourite_actors")
        .select("actor_id")
        .eq("user_id", id)
        .eq("actor_id", actorId);

      if (error) {
        throw error;
      }

      return data.length > 0;
    } catch (error) {
      console.error("Error checking actor in favourites:", error);
      return false;
    }
  }

  export const addMovieToMustWatches = async (userId, movieId) => {
    const { data, error } = await supabase
      .from('mustwatch_movies')
      .insert([{ user_id: userId, movie_id: movieId }]);
    return { data, error };
  };

  export const removeMovieFromMustWatches = async (userId, movieId) => {
    const { data, error } = await supabase
      .from('mustwatch_movies')
      .delete()
      .eq('user_id', userId)
      .eq('movie_id', movieId);
    return { data, error };
  };

  export const getMustWatchMovies = async (userId) => {
    const { data, error, status } = await supabase
      .from('mustwatch_movies')
      .select('movie_id')
      .eq('user_id', userId);

    if (error) {
      console.error('getMustWatchMovies error:', error, 'Status:', status);
    }

    return { data, error };
  };

  export async function checkMovieInMustWatches(id, movieId) {
    try {
      const { data, error } = await supabase
        .from("mustwatch_movies")
        .select("movie_id")
        .eq("user_id", id)
        .eq("movie_id", movieId);

      if (error) {
        throw error;
      }

      return data.length > 0;
    } catch (error) {
      console.error("Error checking movie in must watches:", error);
      return false;
    }
  }

export { supabase }