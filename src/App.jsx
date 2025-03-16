import FilterButton from "./components/FilterButton/FilterButton";
import MovieList from "./components/MovieList/MovieList";
import Search from "./components/Search/Search";
import { Offline, Online } from "react-detect-offline";
import "./App.css";

function App() {
  return (
    <>
      <Online>
        <FilterButton />
        <Search />
        <MovieList />
      </Online>
      <Offline>
        <div className="offline">It seems you don't have internet</div>
      </Offline>
    </>
  );
}

export default App;
