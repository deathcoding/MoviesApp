import { useState, useEffect } from "react";
import axios from "axios";

export default function useMovieSearch(inputText, currentPage) {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [isEmptyResults, setIsEmptyResults] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (inputText.trim() === "" || inputText.trim().length < 3) {
      setIsEmptyResults(false);
      setIsLoaded(true);
      setMoviesData([]);
      return;
    }

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: inputText,
        include_adult: "false",
        language: "en-US",
        page: currentPage,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNjNkYWVhZTRhM2MzN2MyNmE2ZjMxMWUyMzU0OCIsIm5iZiI6MTc0MTY4MzEyNy4yNDEsInN1YiI6IjY3Y2ZmOWI3NjY4OTJiYWQ2MjgxMWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH0NZFFAOhjJZgYFEc_OHQcPNK2es5ZJVGzsuc65poc",
      },
    };

    setIsLoaded(false);
    let ignore = false;
    axios
      .request(options)
      .then((res) => {
        if (!ignore) {
          setIsLoaded(true);
          setError(false);
          setMoviesData(res.data.results);
          setTotalPages(res.data.total_pages);

          if (res.data.results.length === 0) {
            setIsEmptyResults(true);
          }
        }
      })
      .catch(() => {
        setIsLoaded(true);
        setError(true);
        setIsEmptyResults(false);
      });

    return () => {
      ignore = true;
    };
  }, [inputText, currentPage]);

  return { moviesData, isLoaded, error, isEmptyResults, totalPages };
}
