# Enterprise Web Development - Assignment 1.

__Name:__ [Qi Zeng]

## Overview.

[A bullet-point list of the features developed for the React SPA app (new/modified ones only for the Movies app),]

+ Feature 1 - Top Rated Page, included list of movies.In the movie card shows publish date, rating and favorite, info buttom.
+ Feature 2 - Now Playing Page, included list of movies.In the movie card shows publish date, rating and favorite, info buttom.
+ Feature 3 - Popular Actors Page, included list of Actors.In the Actor card shows department, Popularity, gender and favorite, info buttom.
+ Feature 4 - Favorite Movies page, data connected to Supabase database (Add and remove related to current user).
+ Feature 5 - Favorite actors page, data connected to Supabase database (Add and remove related to current user).
+ Feature 6 - Must watch Movies page, data connected to Supabase database (Add and remove related to current user).
+ Feature 7 - Movie detail page, included movie detail, collapsible list of related actors, collapsible list of similar movies and read & write reviews.
+ Feature 8 - Actor detail page, included actor detail, collapsible list of related movies.
+ Feature 9 - Login & Register page, allow user login and sign up thourgh Supabase authentication.
+ Feature 10 - Logout function, will go back to login page after user logout.
+ Feature 11 - drop-down menu, included Home, Upcoming, Now playing, Top Rated, Must watches, Favourites movies, Actors, Favorite Actors and Logout.
+ Feature 12 - Pagination function, used for movie pages.
+ Feature 13 - Get more data to the actor page  from API, so that the actor page displays more actor data.
+ Feature 14 - Filters for movie ratings actor gender.


## Feature Design.

[ For each feature listed in the overview, show a screenshot(s) of its UI layout (use appropriate magnification for accessibility). Include captions with the images.]


#### The Login & Register feature.

> User login and register page, by using Supabase authentication, 

![][login]
![][register]

#### Home page.

> Lists all the movies data from TMDB.

![][homepage]

> Click the pagination buttoms to get different pages. 

![][homepage2]

#### Upcoming page.

> Lists upcoming movies data from TMDB.

![][upcoming]

#### Now playing page.

> Lists Now playing movies data from TMDB.

![][nowplaying]

#### Top rated page.

> Lists Top rated movies data from TMDB.

![][toprated]

#### Must watch movies page.

> Lists must watch movies data from Supabase database mustwatch_movies table.

![][mustwatch]

#### Favourite movies page.

> Lists favourite movies data from Supabase database favourite_movies table.

![][favouriteMovies]

#### Popular actor page.

> Lists popular actors data from TMDB.

![][actor]

#### Favourite actors page.

> Lists favourite movies data from Supabase database favourite_actors table.

![][f_actor]

#### Movie detail page.

> Show movie detail information.

![][m_detail]

> Includes two collapsible lists, related actors and similar movies

![][m_detail2]


#### Actor detail page.

> Show actor detail information.

![][a_detail]

> Includes a collapsible list, related movies

![][a_detail2]

#### Movie review page.

> Lists all movie reviews.

![][review]

> Click Full Review to get in full review page about this movie.

![][review2]


.... other features .......

## Storybook.

![][sb]

## Authentication.

+ /register (Unprotected) - User register with supabase
+ /login (Unprotected) - User login with supabase
+
+ /movies/nowplaying (protected) - Displays now playing movie list.
+ /movies/toprated (protected) - Displays top rated movie list.
+ /movies/mustWatches (protected) - List must watch moives for each distinct user.
+ /reviews/form (protected) - Adding review.
+ /movies/favourites (protected) - List favourite moives for each distinct user.
+ /movies/upcoming (protected) - Displays upcoming movies
+ /movies/:id (protected) - Detail of a movie by id.
+ /reviews/:id (protected) - Detail of a review by id.
+ /actors (protected) - Displays popular actors list.
+ /actors/:id (protected) - Detail of a actor by id.
+ /actors/favourites (protected) - List favourite actors for each distinct user.

#### Protected features (if relevant)

Except for login and registration, other functions are protected。

#### Supabase and Persistence(if relevant)
> Supabase project dashboard
![][sp1]
> Favourite Actors table
![][sp2]
> Favourite movie table
![][sp3]
> Must watch movie table
![][sp4]

## Additional Information.

[ Briefly explain any other aspects of your app's design or implementation that is non-standard and worthy of mention.]

[login]: ./images/login.png
[register]: ./images/register.png
[homepage]: ./images/homepage.png
[homepage2]: ./images/homepage2.png
[upcoming]: ./images/upcoming.png
[nowplaying]: ./images/nowplaying.png
[toprated]: ./images/toprated.png
[mustwatch]: ./images/mustwatch.png
[favouriteMovies]: ./images/favouriteMovies.png
[actor]: ./images/actor.png
[f_actor]: ./images/f_actor.png
[m_detail]: ./images/m_detail.png
[m_detail2]: ./images/m_detail2.png
[a_detail]: ./images/a_detail.png
[a_detail2]: ./images/a_detail2.png
[review]: ./images/review.png
[review2]: ./images/review2.png
[sb]: ./images/sb.png
[sp1]: ./images/sp1.png
[sp2]: ./images/sp2.png
[sp3]: ./images/sp3.png
[sp4]: ./images/sp4.png
