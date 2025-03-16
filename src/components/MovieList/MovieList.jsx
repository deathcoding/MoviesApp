import "./MovieList.css";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import MoviePagination from "../Pagination/Pagination";
import LoadingSpin from "../LoadingSpin/LoadingSpin";
import AlertMessage from "../AlertMessage/AlertMessage";

export default function MovieList() {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: "The Lord of the Rings",
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNjNkYWVhZTRhM2MzN2MyNmE2ZjMxMWUyMzU0OCIsIm5iZiI6MTc0MTY4MzEyNy4yNDEsInN1YiI6IjY3Y2ZmOWI3NjY4OTJiYWQ2MjgxMWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH0NZFFAOhjJZgYFEc_OHQcPNK2es5ZJVGzsuc65poc",
    },
  };

  useEffect(() => {
    let ignore = false;
    setMoviesData([]);
    axios
      .request(options)
      .then((res) => {
        if (!ignore) {
          setIsLoaded(true);
          setMoviesData(res.data.results);
          console.log("Основные данные", res.data);
          console.log("Массив фильмов", res.data.results);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
        setError(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const movies = moviesData.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        name={movie.title}
        text={movie.overview}
        rate={movie.vote_average}
        date={movie.release_date}
        imgPath={movie.poster_path}
        className="moviecard"
      />
    );
  });

  if (error) return <AlertMessage text={"Oopss... something went wrong =("} />;
  else if (!isLoaded) return <LoadingSpin />;
  else {
    return (
      <>
        <section className="movie-list">{movies}</section>
        <MoviePagination />
      </>
    );
  }
}
