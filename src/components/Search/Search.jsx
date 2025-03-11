import { useState } from "react";
import "./Search.css";

export default function Search() {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      placeholder="Type to search..."
      className="search"
    />
  );
}
