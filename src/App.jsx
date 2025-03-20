import FilterButton from "./components/FilterButton/FilterButton";
import RatedMoviesList from "./components/RatedMoviesList/RatedMoviesList";
import Search from "./components/Search/Search";
import { Offline, Online } from "react-detect-offline";
import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isAuthorized, setIsAuthorized] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [idAuthorization, setIdAuthorization] = useState("");
  const [activeFilter, setActiveFilter] = useState("Search");
  const [inputSearchValue, setInputSearchValue] = useState("");

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/authentication/guest_session/new",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNjNkYWVhZTRhM2MzN2MyNmE2ZjMxMWUyMzU0OCIsIm5iZiI6MTc0MTY4MzEyNy4yNDEsInN1YiI6IjY3Y2ZmOWI3NjY4OTJiYWQ2MjgxMWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lH0NZFFAOhjJZgYFEc_OHQcPNK2es5ZJVGzsuc65poc",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log("guest auth success: ", res.data);
        setIsAuthorized(true);
        setIdAuthorization(res.data.guest_session_id);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Online>
        <FilterButton
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        {activeFilter === "Search" && (
          <Search
            inputSearchValue={inputSearchValue}
            setInputSearchValue={setInputSearchValue}
          />
        )}
        {activeFilter === "Rated" && <RatedMoviesList />}
      </Online>
      <Offline>
        <div className="offline">
          Похоже, у вас плохое соединение с интернетом!
        </div>
      </Offline>
    </>
  );
}

export default App;
