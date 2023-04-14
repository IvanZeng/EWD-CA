import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteActors, setFavouriteActors] = useState([]);
  const [mustWatchMovies, setMustWatchMovies] = useState([]);

  useEffect(() => {
    const handleSession = async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: moviesData } = await supabase
          .from("favourite_movies")
          .select("*")
          .eq("user_id", currentUser.id);

        const { data: actorsData } = await supabase
          .from('favourite_actors')
          .select('*')
          .eq('user_id', currentUser.id);

        const { data: mustmoviesData } = await supabase
          .from('mustwatch_movies')
          .select('*')
          .eq('user_id', currentUser.id);

        setFavouriteMovies(moviesData ?? []);
        setFavouriteActors(actorsData ?? []);
        setMustWatchMovies(mustmoviesData ?? []);
      } else {
        setFavouriteMovies([]);
        setFavouriteActors([]);
        setMustWatchMovies([]);
      }
    };

    const fetchUser = async () => {
      const currentUser = supabase.auth.session?.user;
      if (currentUser) {
        setUser(currentUser);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    };

    fetchUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else {
        setUser(null);
      }
      handleSession(event, session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signOut,
        favouriteMovies,
        setFavouriteMovies,
        favouriteActors,
        setFavouriteActors,
        mustWatchMovies, 
        setMustWatchMovies,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
