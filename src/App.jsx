import FilterButton from "./components/FilterButton/FilterButton";
import MovieList from "./components/MovieList/MovieList";
import Search from "./components/Search/Search";
import MoviePagination from "./components/Pagination/Pagination";
import "./App.css";

function App() {
  return (
    <>
      <FilterButton />
      <Search />
      <MovieList />
      <MoviePagination />
    </>
  );
}

export default App;
