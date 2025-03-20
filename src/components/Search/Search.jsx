import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import "./Search.css";
import MovieList from "../MovieList/MovieList";

export default function Search({ inputSearchValue, setInputSearchValue }) {
  // const [inputSearchValue, setInputSearchValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  const debouncedSetInput = useMemo(() => {
    return debounce((value) => {
      setDebouncedInputValue(value);
    }, 1000);
  }, []);

  useEffect(() => {
    debouncedSetInput(inputSearchValue);
    return () => {
      debouncedSetInput.cancel();
    };
  }, [inputSearchValue, debouncedSetInput]);

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
      <MovieList inputText={debouncedInputValue} />
    </>
  );
}
