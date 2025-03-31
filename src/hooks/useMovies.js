import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

export default function useMovies() {
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesData, setMoviesData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [isEmptyResults, setIsEmptyResults] = useState(false);

  const debouncedSetInput = useMemo(() => {
    return debounce(function (value) {
      setDebouncedInputValue(value);
    }, 1000);
  }, []);

  useEffect(() => {
    debouncedSetInput(inputSearchValue);
    return function () {
      debouncedSetInput.cancel();
    };
  }, [inputSearchValue, debouncedSetInput]);

  useEffect(() => {
    async function fetchMovies() {
      if (!debouncedInputValue || debouncedInputValue.trim().length < 3) {
        setMoviesData([]);
        setTotalPages(0);
        setIsEmptyResults(false);
        setIsLoaded(true);
        return;
      }

      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: debouncedInputValue,
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
      setError(null);

      try {
        const response = await axios.request(options);
        const results = response.data.results || [];

        setMoviesData(results);
        setTotalPages(response.data.total_pages || 0);
        setIsEmptyResults(results.length === 0);
        setIsLoaded(true);
      } catch (error) {
        setError(error.message || "Something went wrong");
        setMoviesData([]);
        setTotalPages(0);
        setIsEmptyResults(false);
        setIsLoaded(true);
      }
    }

    fetchMovies();
  }, [debouncedInputValue, currentPage]);

  return {
    inputSearchValue,
    setInputSearchValue,
    debouncedInputValue,
    currentPage,
    setCurrentPage,
    searchResults: {
      moviesData,
      totalPages,
      isLoaded,
      error,
      isEmptyResults,
    },
  };
}
