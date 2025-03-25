import FilterButton from "./components/FilterButton/FilterButton";
import RatedMoviesList from "./components/RatedMoviesList/RatedMoviesList";
import Search from "./components/Search/Search";
// import { Offline, Online } from "react-detect-offline";
import axios from "axios";
import { useState, useEffect } from "react";
import useMovies from "./hooks/useMovies";
import { GenresContext } from "./Contexts/GenresContext";
import "./App.css";

function App() {
  //We get isAuthorized from from api request
  const [isAuthorized, setIsAuthorized] = useState(false);

  //We get idAuthorization from from api request
  const [idAuthorization, setIdAuthorization] = useState("");

  //Еhe state that the current filter stores
  const [activeFilter, setActiveFilter] = useState("Search");

  //We get the ratings from addRating func, which processes the click
  const [ratings, setRatings] = useState([]);

  //We get genres from api request
  const [genres, setGenres] = useState([]);

  // Custom hook, which works with API
  const movies = useMovies();

  //Get genres, and add them to the state, the state will be passed to the GenresContext.Provider
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: { language: "en" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNjNkYWVhZTRhM2MzN2MyNmE2ZjMxMWUyMzU0OCIsIm5iZiI6MTc0MTY4MzEyNy4yNDEsInN1YiI6IjY3Y2ZmOWI3NjY4OTJiYWQ2MjgxMWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH0NZFFAOhjJZgYFEc_OHQcPNK2es5ZJVGzsuc65poc",
      },
    };
    axios
      .request(options)
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => console.error(err));
  }, []);

  //Guest authorization
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/authentication/guest_session/new",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNjNkYWVhZTRhM2MzN2MyNmE2ZjMxMWUyMzU0OCIsIm5iZiI6MTc0MTY4MzEyNy4yNDEsInN1YiI6IjY3Y2ZmOWI3NjY4OTJiYWQ2MjgxMWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH0NZFFAOhjJZgYFEc_OHQcPNK2es5ZJVGzsuc65poc",
      },
    };
    axios
      .request(options)
      .then((res) => {
        setIsAuthorized(true);
        setIdAuthorization(res.data.guest_session_id);
      })
      .catch((err) => console.error(err));
  }, []);

  //Add rate to global state in App.jsx(we are here)
  function addRating(movieId, rating) {
    setRatings((prevRatings) => {
      const updatedRating = prevRatings.filter(
        (item) => item.movieId !== movieId,
      );
      return [...updatedRating, { movieId, rating }];
    });
  }

  return (
    <>
      {/* <Online> */}
      <FilterButton
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <GenresContext.Provider value={genres}>
        {activeFilter === "Search" && (
          <Search
            {...movies}
            ratings={ratings}
            addRating={addRating}
            idAuthorization={idAuthorization}
          />
        )}
        {activeFilter === "Rate" && isAuthorized && idAuthorization && (
          <RatedMoviesList
            ratings={ratings}
            addRating={addRating}
            idAuthorization={idAuthorization}
          />
        )}
      </GenresContext.Provider>
      {/* </Online> */}
      {/* <Offline>
        <div className="offline">
          Похоже, у вас нет соединения c интернетом!
        </div>
      </Offline> */}
    </>
  );
}

export default App;
