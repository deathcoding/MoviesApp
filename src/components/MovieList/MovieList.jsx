import "./MovieList.css";
import { useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MoviePagination from "../Pagination/Pagination";
import LoadingSpin from "../LoadingSpin/LoadingSpin";
import AlertMessage from "../AlertMessage/AlertMessage";

export default function MovieList({
  idAuthorization,
  inputText,
  searchResults,
  currentPage,
  setCurrentPage,
  ratings,
  addRating,
}) {
  useEffect(() => {
    setCurrentPage(1); // Сброс на первую страницу при новом поиске
  }, [inputText]);

  const { moviesData, isLoaded, error, isEmptyResults, totalPages } =
    searchResults;

  const movies = moviesData.map((movie) => {
    return (
      <MovieCard
        movieGenres={movie.genre_ids}
        idAuthorization={idAuthorization}
        key={movie.id}
        movieId={movie.id}
        name={movie.title}
        text={movie.overview}
        rate={movie.vote_average}
        ratings={ratings}
        addRating={addRating}
        date={movie.release_date}
        imgPath={movie.poster_path}
        className="moviecard"
      />
    );
  });

  function handleClick(page) {
    setCurrentPage(page);
  }

  if (moviesData.length === 0 && !isEmptyResults)
    return (
      <div className="poster">
        <h1 className="poster_title">Movies App</h1>
      </div>
    );
  if (error) return <AlertMessage text={"Ой... Что то пошло не так =("} />;
  else if (!isLoaded) return <LoadingSpin />;
  else if (isEmptyResults)
    return (
      <span className="empty_results">
        {"Нет результатов для этого запроса =("}
      </span>
    );
  else {
    return (
      <>
        <section className="movie-list">{movies}</section>
        {moviesData.length > 0 && (
          <MoviePagination
            onChange={handleClick}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </>
    );
  }
}
