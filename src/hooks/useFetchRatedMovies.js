import axios from "axios";
import { useState, useEffect } from "react";

export function useFetchRatedMovies(idAuthorization) {
  const [hasRatedMovies, setHasRatedMovies] = useState(false);
  const [ratedMoviesData, setRatedMoviesData] = useState([]);
  const [totalPagesRatedMovies, setTotalPagesRatedMovies] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPageRatedMovies, setCurrentPageRatedMovies] = useState(1);

  useEffect(() => {
    let isMounted = true;
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

    axios
      .request(options)
      .then((res) => {
        if (isMounted) {
          setTotalPagesRatedMovies(res.data.total_pages);
          setIsLoaded(true);
          setHasRatedMovies(true);
          setRatedMoviesData(res.data.results);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setIsLoaded(true);
          if (err.response.status === 404) {
            setHasRatedMovies(false);
            setRatedMoviesData([]);
          }
          console.log(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentPageRatedMovies, idAuthorization]);

  return {
    hasRatedMovies,
    ratedMoviesData,
    totalPagesRatedMovies,
    currentPageRatedMovies,
    setCurrentPageRatedMovies,
    isLoaded,
  };
}
