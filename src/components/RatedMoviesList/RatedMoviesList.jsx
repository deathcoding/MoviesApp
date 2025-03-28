import { useFetchRatedMovies } from "../../hooks/useFetchRatedMovies";
import MovieCard from "../MovieCard/MovieCard";
import MoviePagination from "../Pagination/Pagination";

export default function RatedMoviesList({
  idAuthorization,
  ratings,
  addRating,
}) {
  const {
    hasRatedMovies,
    ratedMoviesData,
    totalPagesRatedMovies,
    currentPageRatedMovies,
    setCurrentPageRatedMovies,
    isLoaded,
  } = useFetchRatedMovies(idAuthorization);

  function handleClick(page) {
    setCurrentPageRatedMovies(page);
  }

  const ratedMovies = ratedMoviesData?.map((movie) => {
    return (
      <MovieCard
        movieGenres={movie.genre_ids}
        ratings={ratings}
        addRating={addRating}
        rateStars={movie.rating}
        idAuthorization={idAuthorization}
        key={movie.id}
        movieId={movie.id}
        name={movie.title}
        text={movie.overview}
        rate={movie.vote_average}
        date={movie.release_date}
        imgPath={movie.poster_path}
        className="moviecard"
      />
    );
  });

  if (!isLoaded) return <h2 style={{ color: "white" }}>Загрузка...</h2>;
  else if (!hasRatedMovies) {
    return (
      <h2 style={{ color: "white" }}>Нет оцененных фильмов, или ошибка 404</h2>
    );
  } else {
    return (
      <>
        <section className="movie-list">{ratedMovies}</section>
        <MoviePagination
          onChange={handleClick}
          currentPage={currentPageRatedMovies}
          totalPages={totalPagesRatedMovies}
        />
      </>
    );
  }
}
