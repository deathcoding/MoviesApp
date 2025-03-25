import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MoviePagination from "../Pagination/Pagination";

export default function RatedMoviesList({
  idAuthorization,
  ratings,
  addRating,
}) {
  const [hasRatedMovies, setHasRatedMovies] = useState(false);
  const [ratedMoviesData, setRatedMoviesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPageRatedMovies, setCurrentPageRatedMovies] = useState(1);
  const [totalPagesRatedMovies, setTotalPagesRatedMovies] = useState(1);

  function handleClick(page) {
    setCurrentPageRatedMovies(page);
  }

  function fetchRatedMovies(options) {
    axios
      .request(options)
      .then((res) => {
        setTotalPagesRatedMovies(res.data.total_pages);
        setIsLoaded(true);
        setHasRatedMovies(true);
        setRatedMoviesData(res.data.results);
      })
      .catch((err) => {
        setIsLoaded(true);
        if (err.status === 404) {
          setHasRatedMovies(false);
        }
        console.log(err);
      });
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/guest_session/${idAuthorization}/rated/movies`,
      params: {
        api_key: "d0c363daeae4a3c37c26a6f311e23548",
        language: "en-US",
        page: currentPageRatedMovies,
        sort_by: "created_at.asc",
      },
      headers: {
        accept: "application/json",
      },
    };
    setIsLoaded(false);
    fetchRatedMovies(options);
  }, [currentPageRatedMovies]);

  const ratedMovies = ratedMoviesData.map((movie) => {
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
  } else if (hasRatedMovies) {
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
