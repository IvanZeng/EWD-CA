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

export { supabase }