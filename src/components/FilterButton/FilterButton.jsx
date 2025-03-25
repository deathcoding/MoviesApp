import { Anchor, ConfigProvider } from "antd";
import "./FilterButton.css";

export default function FilterButton({ activeFilter, setActiveFilter }) {
  function handleClick(e) {
    if (e.target.className === "rate_button") {
      setActiveFilter("Rate");
    }
    if (e.target.className === "search_button") {
      setActiveFilter("Search");
    }
  }

  return (
    <div className="filters">
      <button
        onClick={handleClick}
        className={
          activeFilter === "Search" ? "search_button active" : "search_button"
        }
      >
        Search
      </button>
      <button
        onClick={handleClick}
        className={
          activeFilter === "Rate" ? "rate_button active" : "rate_button"
        }
      >
        Rated
      </button>
    </div>
  );
}
