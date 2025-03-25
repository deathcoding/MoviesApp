import "./Search.css";
import MovieList from "../MovieList/MovieList";

export default function Search({
  idAuthorization,
  inputSearchValue,
  setInputSearchValue,
  debouncedInputValue,
  searchResults,
  currentPage,
  setCurrentPage,
  ratings,
  addRating,
}) {
  function handleInputChange(event) {
    setInputSearchValue(event.target.value);
  }
  return (
    <>
      <input
        value={inputSearchValue}
        onChange={handleInputChange}
        placeholder="Введите название фильма..."
        className="search"
      />
      <MovieList
        ratings={ratings}
        addRating={addRating}
        idAuthorization={idAuthorization}
        inputText={debouncedInputValue}
        searchResults={searchResults}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
